import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/userContext";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database } from "../firebase";

const Assessment = ({ condition }) => {
  const { user } = useGlobalContext();
  const [questions, setQuestions] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [evaluation, setEvaluation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testTaken, setTestTaken] = useState(false); // State to track if test is already taken

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3001/conditions");
        const expertResponse = await axios.get("http://localhost:3001/experts");
        const conditionsData = response.data;
        const expertData = expertResponse.data;

        if (conditionsData && conditionsData[condition]) {
          setQuestions(conditionsData[condition]);
          setExperts(expertData[condition]);
          const initialAnswers = {};
          conditionsData[condition].forEach((q) => {
            initialAnswers[q.id] = "";
          });
          setAnswers(initialAnswers);
        } else {
          console.error(`Condition '${condition}' not found in data.`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    const checkTestTaken = async () => {
      try {
        const q = query(
          collection(database, "assessments"),
          where("userId", "==", user.uid),
          where("condition", "==", condition)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setTestTaken(true); // Set state to true if test is already taken
        }
      } catch (error) {
        console.error("Error checking if test is taken:", error);
      }
    };

    if (condition) {
      fetchQuestions();
      checkTestTaken();
    }
  }, [condition, user.uid]);

  const handleSelectAnswer = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answeredQuestions = Object.values(answers).filter(
      (answer) => answer !== ""
    );
    if (answeredQuestions.length !== questions.length) {
      toast.error("Please answer all questions.");
      return;
    }

    if (testTaken) {
      toast.error("Test already taken.");
      return;
    }

    setIsSubmitting(true);

    try {
      const calculatedEvaluation = calculateEvaluation();
      const assessmentData = {
        userId: user.uid,
        condition,
        answers,
        evaluation: calculatedEvaluation,
        score: calculateScore(), // Save the score as well
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(database, "assessments"), assessmentData);
      toast.success("Complete!");
      setTestTaken(true);
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to submit assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach((answer) => {
      switch (answer) {
        case "Not at all":
          score += 0;
          break;
        case "Several days":
          score += 1;
          break;
        case "More than half the days":
          score += 2;
          break;
        case "Nearly every day":
          score += 3;
          break;
        default:
          break;
      }
    });
    return score;
  };

  const calculateEvaluation = () => {
    let score = 0;
    Object.values(answers).forEach((answer) => {
      switch (answer) {
        case "Not at all":
          score += 0;
          break;
        case "Several days":
          score += 1;
          break;
        case "More than half the days":
          score += 2;
          break;
        case "Nearly every day":
          score += 3;
          break;
        default:
          break;
      }
    });

    let evaluationMessage = "";
    if (score <= 4) {
      evaluationMessage = "Your symptoms are minimal.";
    } else if (score <= 9) {
      evaluationMessage = "You may be experiencing mild symptoms.";
    } else if (score <= 14) {
      evaluationMessage = "You may be experiencing moderate symptoms.";
    } else {
      evaluationMessage = "You may be experiencing severe symptoms.";
    }
    setEvaluation(evaluationMessage);
    return evaluationMessage;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        {condition.charAt(0).toUpperCase() + condition.slice(1)} Assessment
      </h1>
      <form onSubmit={handleSubmit}>
        <ul className="divide-y divide-gray-300 transition-all duration-300">
          {questions.map((q, index) => (
            <li
              key={q.id}
              className={`py-4 transition-opacity duration-300 ${
                index !== currentQuestionIndex
                  ? "hidden opacity-0"
                  : "opacity-100"
              }`}
            >
              <p className="text-lg text-gray-800 mb-2">{q.question}</p>
              <select
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-4"
                value={answers[q.id]}
                onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
              >
                <option value="">Select an option</option>
                {q.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className={`bg-gray-300 px-4 py-2 rounded-md ${
              currentQuestionIndex === 0 ? "hidden" : ""
            }`}
            onClick={handlePrevQuestion}
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 && (
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 rounded-md ${
                isSubmitting || testTaken ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting || testTaken}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
      {!isSubmitting && evaluation && (
        <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
          <p className="font-bold">Evaluation Result:</p>
          <p>{evaluation}</p>
        </div>
      )}
    </div>
  );
};

export default Assessment;

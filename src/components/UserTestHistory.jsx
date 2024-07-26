import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { useGlobalContext } from "../context/userContext";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const UserTestHistory = () => {
  const [assessments, setAssessments] = useState([]);
  const [experts, setExperts] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        // Fetch assessments
        const q = query(
          collection(database, "assessments"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const assessmentsData = querySnapshot.docs.map((doc) => doc.data());
        assessmentsData.sort(
          (a, b) => a.timestamp.seconds - b.timestamp.seconds
        ); // Sort manually if needed

        // Fetch experts
        const response = await axios.get("http://localhost:3001/experts");
        const expertsData = response.data;

        // Map experts to conditions
        const expertsByCondition = {};
        for (const condition in expertsData) {
          expertsByCondition[condition] = expertsData[condition];
        }

        setAssessments(assessmentsData);
        setExperts(expertsByCondition);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [user.uid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Test History
        </h2>
        {assessments.length === 0 ? (
          <p className="text-center text-gray-700">
            No test history available.
          </p>
        ) : (
          <div className="space-y-6">
            {assessments.map((assessment, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-blue-500 text-white text-center">
                  <h2 className="text-xl font-bold">{assessment.condition}</h2>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-lg font-semibold text-gray-700">
                    Evaluation:{" "}
                    <span className="font-normal text-gray-600">
                      {assessment.evaluation} - This assessment indicates that
                      you may be experiencing symptoms of{" "}
                      <span className="font-bold">{assessment.condition}</span>.
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Timestamp:{" "}
                    <span className="font-normal text-gray-600">
                      {format(
                        new Date(assessment.timestamp.seconds * 1000),
                        "MMMM dd, yyyy 'at' h:mm a"
                      )}
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Recommended Experts:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experts[assessment.condition]?.map((expert, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <h4 className="text-xl font-semibold text-gray-700">
                          <Link
                            to={`/experts/field/${
                              assessment.condition
                            }?name=${encodeURIComponent(
                              expert.name
                            )}&contact=${encodeURIComponent(
                              expert.contact
                            )}&profile=${encodeURIComponent(expert.profile)}`}
                            className="text-blue-500 hover:underline"
                          >
                            {expert.name}
                          </Link>
                        </h4>
                        <p className="text-gray-600">{expert.profile}</p>
                        <p className="text-gray-500">
                          Contact:{" "}
                          <a
                            href={`mailto:${expert.contact}`}
                            className="text-blue-500 hover:underline"
                          >
                            {expert.contact}
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">
                    Tips for Addressing {assessment.condition}:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>
                      Engage in regular physical activity to boost your mood.
                    </li>
                    <li>Maintain a healthy diet and sleep schedule.</li>
                    <li>Stay connected with friends and family.</li>
                    <li>Consider mindfulness and relaxation techniques.</li>
                    <li>Seek professional help if symptoms persist.</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTestHistory;

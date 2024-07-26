// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const MentalHealthCheck = () => {
//   const [questions, setQuestions] = useState({});
//   const [responses, setResponses] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [evaluation, setEvaluation] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:3001/conditions").then((response) => {
//       const selectedQuestions = selectRandomQuestions(response.data, 10);
//       setQuestions(selectedQuestions);
//       setResponses(
//         Object.keys(selectedQuestions).reduce((acc, condition) => {
//           acc[condition] = selectedQuestions[condition].map(() => "");
//           return acc;
//         }, {})
//       );
//     });
//   }, []);

//   const selectRandomQuestions = (questions, num) => {
//     const selectedQuestions = {};
//     Object.keys(questions).forEach((condition) => {
//       selectedQuestions[condition] = questions[condition]
//         .sort(() => 0.5 - Math.random())
//         .slice(0, num);
//     });
//     return selectedQuestions;
//   };

//   const handleChange = (condition, index, value) => {
//     const newResponses = { ...responses };
//     newResponses[condition][index] = value;
//     setResponses(newResponses);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let evaluationText = [];

//     Object.keys(responses).forEach((condition) => {
//       const conditionResponses = responses[condition];
//       const highRiskCount = conditionResponses.filter(
//         (r) => r === "Nearly every day"
//       ).length;
//       const moderateRiskCount = conditionResponses.filter(
//         (r) => r === "More than half the days"
//       ).length;

//       if (highRiskCount >= 3) {
//         evaluationText.push(`High risk of ${condition.replace("_", " ")}.`);
//       } else if (moderateRiskCount >= 3) {
//         evaluationText.push(`Moderate risk of ${condition.replace("_", " ")}.`);
//       }
//     });

//     if (evaluationText.length === 0) {
//       evaluationText.push(
//         "Your responses indicate a low risk of the conditions surveyed. However, if you have any concerns, it is always good to talk to a professional."
//       );
//     }

//     setEvaluation(evaluationText.join(" "));
//     setSubmitted(true);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Mental Health Check
//       </h1>
//       {!submitted ? (
//         <form onSubmit={handleSubmit}>
//           {Object.keys(questions).map((condition) => (
//             <div key={condition} className="mb-6">
//               <h2 className="text-xl font-semibold mb-4">
//                 {condition.replace("_", " ")}
//               </h2>
//               {questions[condition].map((q, index) => (
//                 <div key={q.id} className="mb-4">
//                   <p className="mb-2">{q.question}</p>
//                   <select
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     onChange={(e) =>
//                       handleChange(condition, index, e.target.value)
//                     }
//                     required
//                   >
//                     <option value="">Select...</option>
//                     {q.options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </form>
//       ) : (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Evaluation</h2>
//           <p className="mb-4">{evaluation}</p>
//           <h3 className="text-lg font-semibold mb-2">Recommended Resources</h3>
//           <p className="mb-4">
//             If you are experiencing severe symptoms, consider reaching out to
//             one of the following resources:
//           </p>
//           <ul className="list-disc pl-5">
//             <li className="mb-2">
//               <a
//                 href="https://www.mentalhealth.gov/"
//                 className="text-blue-500 underline"
//               >
//                 MentalHealth.gov
//               </a>
//             </li>
//             <li className="mb-2">
//               <a
//                 href="https://www.nimh.nih.gov/health/find-help"
//                 className="text-blue-500 underline"
//               >
//                 National Institute of Mental Health
//               </a>
//             </li>
//             <li className="mb-2">
//               <a
//                 href="https://www.samhsa.gov/find-help/national-helpline"
//                 className="text-blue-500 underline"
//               >
//                 SAMHSA's National Helpline
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MentalHealthCheck;

// App.js

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";

import MentalHealthCheck from "./components/MentalHealthCheck"; // General assessment component
// import ConditionAssessment from "./components/ConditionAssessment"; // Component for specific condition assessments

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={UserDashboard} />
          <Route path="/assessment" exact component={MentalHealthCheck} />
          <Route
            path="/assessment/depression"
            component={() => <ConditionAssessment condition="depression" />}
          />
          <Route
            path="/assessment/anxiety_disorder"
            component={() => (
              <ConditionAssessment condition="anxiety_disorder" />
            )}
          />
          <Route
            path="/assessment/schizophrenia"
            component={() => <ConditionAssessment condition="schizophrenia" />}
          />
          <Route
            path="/assessment/substance_abuse"
            component={() => (
              <ConditionAssessment condition="substance_abuse" />
            )}
          />
          <Route
            path="/assessment/dementia"
            component={() => <ConditionAssessment condition="dementia" />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

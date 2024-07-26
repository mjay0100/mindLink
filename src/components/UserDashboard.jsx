import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/userContext";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  FaSadTear,
  FaBrain,
  FaUserNinja,
  FaPills,
  FaHeadSideVirus,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Health Score",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Health State",
      },
    },
  };

  const cardClasses =
    "rounded-lg shadow-lg p-4 h-40 flex items-center justify-center transform transition-transform hover:scale-105 text-center";

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl  rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`${cardClasses} bg-blue-600 text-white`}>
            <Link
              to="/assessment/depression"
              className="flex flex-col items-center text-xl font-semibold"
            >
              <FaSadTear className="mb-2" size={30} />
              Depression Assessment
            </Link>
          </div>
          <div className={`${cardClasses} bg-red-600 text-white`}>
            <Link
              to="/assessment/anxiety"
              className="flex flex-col items-center text-xl font-semibold"
            >
              <FaBrain className="mb-2" size={30} />
              Anxiety Disorder Assessment
            </Link>
          </div>
          <div className={`${cardClasses} bg-green-600 text-white`}>
            <Link
              to="/assessment/schizophrenia"
              className="flex flex-col items-center text-xl font-semibold"
            >
              <FaUserNinja className="mb-2" size={30} />
              Schizophrenia Assessment
            </Link>
          </div>
          <div className={`${cardClasses} bg-purple-600 text-white`}>
            <Link
              to="/assessment/substance_abuse"
              className="flex flex-col items-center text-xl font-semibold"
            >
              <FaPills className="mb-2" size={30} />
              Substance Abuse Assessment
            </Link>
          </div>
          <div className={`${cardClasses} bg-yellow-600 text-white`}>
            <Link
              to="/assessment/dementia"
              className="flex flex-col items-center text-xl font-semibold"
            >
              <FaHeadSideVirus className="mb-2" size={30} />
              Dementia Assessment
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

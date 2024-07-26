import { Link } from "react-router-dom";
import {
  FaBrain,
  FaHeart,
  FaRegSmile,
  FaCapsules,
  FaBrain as FaDementia,
} from "react-icons/fa";

const Experts = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Find an Expert
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex items-center">
            <FaRegSmile className="mr-3 text-blue-500" />
            <Link
              to="/experts/field/depression"
              className="block text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Experts in Depression
            </Link>
          </li>
          <li className="py-3 flex items-center">
            <FaHeart className="mr-3 text-blue-500" />
            <Link
              to="/experts/field/anxiety"
              className="block text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Experts in Anxiety Disorders
            </Link>
          </li>
          <li className="py-3 flex items-center">
            <FaBrain className="mr-3 text-blue-500" />
            <Link
              to="/experts/field/schizophrenia"
              className="block text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Experts in Schizophrenia
            </Link>
          </li>
          <li className="py-3 flex items-center">
            <FaCapsules className="mr-3 text-blue-500" />
            <Link
              to="/experts/field/substance_abuse"
              className="block text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Experts in Substance Abuse
            </Link>
          </li>
          <li className="py-3 flex items-center">
            <FaDementia className="mr-3 text-blue-500" />
            <Link
              to="/experts/field/dementia"
              className="block text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Experts in Dementia
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Experts;

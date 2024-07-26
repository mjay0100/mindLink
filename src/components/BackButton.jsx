import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <FaArrowLeft
      className="absolute right-3 top-2 lg:bottom-16  text-gray-800 hover:text-gray-600 transition duration-300 p-2 rounded-full bg-gray-200 lg:top-4  cursor-pointer"
      size={35}
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;

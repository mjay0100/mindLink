import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExpertDetail = () => {
  const { expertId } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/experts/${expertId}`
        );
        console.log("Fetch expert response:", response.data);
        setExpert(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expert:", error);
        setLoading(false);
      }
    };

    fetchExpert();
  }, [expertId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!expert) {
    return <div>Expert not found</div>;
  }

  const handleBookAppointment = () => {
    // Integrate Paystack payment here
    console.log("Book appointment with", expert.name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-24 rounded-full mb-4"
            src="https://cdn1.iconfinder.com/data/icons/users-solid-1/30/users-solid-profile-neutral-8-1024.png"
            alt={expert.name}
          />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{expert.name}</p>
            <p className="text-gray-600">{expert.specialization}</p>
            <p className="text-gray-600">{expert.contact}</p>
            <p className="text-gray-600">{expert.location}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800">About</h2>
          <p className="text-gray-600 mt-2">
            {expert.description ||
              "This expert is highly experienced in their field, offering top-notch services to clients. They have a proven track record of success and are dedicated to providing the best care possible."}
          </p>
        </div>
        <button
          onClick={handleBookAppointment}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ExpertDetail;

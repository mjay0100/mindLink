import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    borderRadius: "10px",
    padding: "0",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root"); // This is to avoid accessibility warnings

const ExpertsList = () => {
  const { field } = useParams();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(15000); // Set default payment amount to 5000 kobo

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/experts");
        if (response.data && response.data[field]) {
          setExperts(response.data[field]);
        } else {
          console.error(`Field '${field}' not found in data.`);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experts:", error);
        setLoading(false);
      }
    };

    if (field) {
      fetchExperts();
    }
  }, [field]);

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
    setPaymentAmount(5000); // Ensure the appointment fee is set to 5000 kobo
  };

  const handlePaymentSuccess = (reference) => {
    console.log("Payment successful. Reference:", reference);
    toast.success("Appointment booked successfully!");
    setSelectedExpert(null); // Close the modal on successful payment
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error("Payment failed. Please try again.");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <ToastContainer />
      <div className="w-full max-w-4xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Experts in {field.charAt(0).toUpperCase() + field.slice(1)}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 cursor-pointer"
              onClick={() => handleSelectExpert(expert)}
            >
              <div className="flex flex-col items-center">
                <img
                  className="h-24 w-24 rounded-full mb-4"
                  src="https://cdn1.iconfinder.com/data/icons/users-solid-1/30/users-solid-profile-neutral-8-1024.png"
                  alt={expert.name}
                />
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">
                    {expert.name}
                  </p>
                  <p className="text-gray-600">{expert.specialization}</p>
                  <p className="text-gray-600">{expert.contact}</p>
                  <p className="text-gray-600">{expert.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedExpert && (
        <Modal
          isOpen={!!selectedExpert}
          onRequestClose={() => setSelectedExpert(null)}
          style={customStyles}
          contentLabel="Expert Details"
        >
          <div className="p-6 bg-blue-50 rounded-t-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Book Appointment with {selectedExpert.name}
              </h2>
              <img
                className="h-24 w-24 rounded-full mb-4 mx-auto"
                src="https://cdn1.iconfinder.com/data/icons/users-solid-1/30/users-solid-profile-neutral-8-1024.png"
                alt={selectedExpert.name}
              />
              <p className="text-gray-600 mb-2">
                Specialization: {selectedExpert.specialization}
              </p>
              <p className="text-gray-600 mb-2">
                Contact: {selectedExpert.contact}
              </p>
              <p className="text-gray-600 mb-2">
                Location: {selectedExpert.location}
              </p>
              <p className="text-gray-600 mb-4">
                Expertise:{" "}
                {selectedExpert.expertise ||
                  "Expertise in handling various mental health issues and providing personalized treatment plans to ensure the best outcomes for patients."}
              </p>
              <p className="text-gray-600 mb-4">
                Appointment Fee: NGN {paymentAmount}
              </p>
              {paymentAmount >= 5000 && (
                <PaystackButton
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  text="Book Now"
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentError}
                  disabled={paymentAmount === 0}
                  embed={false}
                  reference={`expert_${selectedExpert.id}_${Date.now()}`}
                  email="mustaphajay2@gmail.com" // Replace with actual user email
                  amount={paymentAmount}
                  publicKey="pk_test_ceea1eb331413482d3eaccf5bbb784d6339b1847"
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExpertsList;

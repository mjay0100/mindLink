import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useGlobalContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "./Loading";

const Profile = () => {
  const { user } = useGlobalContext();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(database, "users", user.uid));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (!userInfo) {
    return <div>No user information available.</div>;
  }

  const { displayName, email, photoURL } = user;
  const {
    firstName,
    lastName,
    age,
    disabilities,
    pastHealthIssues,
    phoneNumber,
  } = userInfo;

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-4">
            <div className="flex justify-center">
              <img
                className="h-32 w-32 rounded-full border-2 border-indigo-500"
                src={
                  photoURL ||
                  "https://th.bing.com/th/id/OIP.nvnybF6_LdMvxdvSWGJXfAHaHa?rs=1&pid=ImgDetMain"
                }
                alt="User Avatar"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {displayName || `${firstName} ${lastName}`}
              </h2>
              <p className="text-gray-600">{email}</p>
            </div>
            <div className="mt-4">
              <ul className="text-gray-700">
                <li className="py-2 ">
                  <span className="font-semibold">Age: </span>
                  {age}
                </li>
                <li className="py-2 ">
                  <span className="font-semibold">Email: </span>
                  {email}
                </li>
                <li className="py-2 ">
                  <span className="font-semibold">Disabilities: </span>
                  {disabilities}
                </li>
                <li className="py-2 ">
                  <span className="font-semibold">Past Health Issues: </span>
                  {pastHealthIssues}
                </li>
                <li className="py-2 ">
                  <span className="font-semibold">Phone Number: </span>
                  {phoneNumber}
                </li>
                <li className="py-2 ">
                  <span className="font-semibold">Id: </span>
                  {user.uid}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

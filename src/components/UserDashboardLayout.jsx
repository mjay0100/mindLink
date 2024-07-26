import { signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBrain,
  FaSmile,
  FaSadTear,
  FaPills,
  FaHeadSideVirus,
  FaUserMd,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import BackButton from "./BackButton"; // Adjust the import path as necessary

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/");
      closeSidebar();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative h-full">
        <div
          className={`fixed inset-y-0 ${
            isSidebarOpen ? "w-64" : "w-0"
          } left-0 z-50 lg:w-64 transition-all duration-300`}
        >
          <div
            ref={sidebarRef}
            className={`h-full overflow-y-auto no-scrollbar ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 lg:translate-x-0 lg:w-64`}
          >
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button onClick={toggleSidebar} className="text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={closeSidebar}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center w-full text-left hover:bg-gray-700 rounded-md p-2 transition duration-300"
                  >
                    Take Test
                    {isDropdownOpen ? (
                      <FaCaretUp className="ml-2" />
                    ) : (
                      <FaCaretDown className="ml-2" />
                    )}
                  </button>
                  {isDropdownOpen && (
                    <ul className="pl-4 mt-2 space-y-2 transition duration-300 ease-in-out transform">
                      <li>
                        <Link
                          to="/assessment/depression"
                          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                          onClick={closeSidebar}
                        >
                          <FaSadTear className="mr-2" /> Depression Assessment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/assessment/anxiety"
                          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                          onClick={closeSidebar}
                        >
                          <FaSmile className="mr-2" /> Anxiety Disorder
                          Assessment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/assessment/schizophrenia"
                          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                          onClick={closeSidebar}
                        >
                          <FaBrain className="mr-2" /> Schizophrenia Assessment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/assessment/substance_abuse"
                          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                          onClick={closeSidebar}
                        >
                          <FaPills className="mr-2" /> Substance Abuse
                          Assessment
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/assessment/dementia"
                          className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                          onClick={closeSidebar}
                        >
                          <FaHeadSideVirus className="mr-2" /> Dementia
                          Assessment
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link
                    to="/experts"
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={closeSidebar}
                  >
                    <FaUserMd className="mr-2" /> View Our Experts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/test-history"
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={closeSidebar}
                  >
                    <FaUserMd className="mr-2" /> Health History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={closeSidebar}
                  >
                    <FaUserMd className="mr-2" /> Profile
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              onClick={handleSignOut}
              className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center transition duration-300"
            >
              <FaSignOutAlt className="mr-2" /> Sign Out
            </button>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 text-gray-800 z-50 lg:hidden ${
            isSidebarOpen ? "hidden" : "block"
          }`}
        >
          <FaBars size={24} />
        </button>
      </div>
      <main className="flex-grow ml-0 lg:ml-64 transition-margin duration-300 mt-10 lg:mt-0 px-6 py-2">
        <Outlet />
      </main>
      <BackButton />
    </>
  );
};

export default Navbar;

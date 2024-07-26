import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import UserDashboard from "./components/UserDashboard";
import AssessmentWrapper from "./components/AssessmentWrapper";
import SignUp from "./components/Sign-Up";
import SignIn from "./components/Sign-in";
import { AppProvider } from "./context/userContext";
import Home from "./pages/home";
import ExpertsList from "./components/ExpertsList";
import Experts from "./components/Experts";
import UserTestHistory from "./components/UserTestHistory";
import Profile from "./components/Profile";
import UserDashboardLayout from "./components/UserDashboardLayout";
import ExpertDetail from "./components/ExpertDetail";
// import Profile from "./components/profile";
// Profile

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/sign-up", element: <SignUp /> },
      { path: "/sign-in", element: <SignIn /> },
    ],
  },
  {
    element: <UserDashboardLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/assessment/:condition", element: <AssessmentWrapper /> },
      { path: "/experts", element: <Experts /> }, // New route for experts
      { path: "/experts/detail/:expertId", element: <ExpertDetail /> }, // New route for experts
      { path: "/experts/field/:field", element: <ExpertsList /> }, // New route for experts
      { path: "/test-history", element: <UserTestHistory /> }, // New route for experts
      { path: "/profile", element: <Profile /> }, // New route for experts
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

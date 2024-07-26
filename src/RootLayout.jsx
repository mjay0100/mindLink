import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default RootLayout;

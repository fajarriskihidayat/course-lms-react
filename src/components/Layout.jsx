import React from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({ isAdmin = true }) => {
  const { pathname } = useLocation();
  const isPreviewPage = useMatch(
    pathname.includes("/manager")
      ? "/manager/courses/:id/preview"
      : "/student/detail-course/:id"
  );

  console.log({ isPreviewPage });

  return (
    <>
      {isPreviewPage !== null ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default LayoutDashboard;

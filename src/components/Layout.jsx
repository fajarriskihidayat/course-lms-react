import React from "react";
import { Outlet, useLoaderData, useLocation, useMatch } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({ isAdmin = true }) => {
  const session = useLoaderData();

  const { pathname } = useLocation();
  const isPreviewPage = useMatch(
    pathname.includes("/manager")
      ? "/manager/courses/:id/preview"
      : "/student/detail-course/:id"
  );

  return (
    <>
      {isPreviewPage !== null ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header type={session?.role} />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default LayoutDashboard;

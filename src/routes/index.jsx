import { createBrowserRouter } from "react-router-dom";
import ManagerHomePage from "../pages/manager/home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/Layout";
import ManagerCoursePage from "../pages/manager/courses";
import ManageCreateCoursePage from "../pages/manager/create-course";
import ManageDetailPage from "../pages/manager/course-detail";
import ManageCreateContentPage from "../pages/manager/create-content-course";
import ManageCoursePreviewPage from "../pages/manager/course-preview";
import ManageStudentsPage from "../pages/manager/students";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/manager",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        element: <ManagerCoursePage />,
      },
      {
        path: "/manager/courses/create",
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        element: <ManageDetailPage />,
      },
      {
        path: `/manager/courses/:id/create`,
        element: <ManageCreateContentPage />,
      },
      {
        path: "/manager/courses/:id/preview",
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        element: <ManageStudentsPage />,
      },
    ],
  },
]);

export default router;

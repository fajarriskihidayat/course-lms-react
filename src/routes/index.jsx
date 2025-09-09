import { jwtDecode } from "jwt-decode";
import { createBrowserRouter, redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import LayoutDashboard from "../components/Layout";
import ManageCourseDetailPage from "../pages/manager/course-detail";
import ManageCoursePreviewPage from "../pages/manager/course-preview";
import ManagerCoursePage from "../pages/manager/courses";
import ManageCreateContentPage from "../pages/manager/create-content-course";
import ManageCreateCoursePage from "../pages/manager/create-course";
import ManagerHomePage from "../pages/manager/home";
import ManageStudentsPage from "../pages/manager/students";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import StudentPage from "../pages/student/student-overview";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import { getCategories } from "../services/categoryService";
import { getCourseDetail, getCourses } from "../services/courseService";
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const";

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
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      const isTokenExpired = (token) => {
        const decode = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000); // detik sekarang

        if (decode.exp < now) {
          return true;
        } else {
          return false;
        }
      };

      if (
        !session ||
        session.role !== "manager" ||
        isTokenExpired(session.token)
      ) {
        throw redirect("/manager/sign-in");
      }

      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const courses = await getCourses();

          return courses;
        },
        element: <ManagerCoursePage />,
      },
      {
        path: "/manager/courses/create",
        loader: async () => {
          const categories = await getCategories();

          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: `/manager/courses/edit/:id`,
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        element: <ManageCourseDetailPage />,
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
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        element: <ManageCoursePreviewPage />,
      },
    ],
  },
]);

export default router;

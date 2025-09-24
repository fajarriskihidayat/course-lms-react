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
import {
  getCourseDetail,
  getCourses,
  getStudentsByCourse,
} from "../services/courseService";
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const";
import { getContentDetail } from "../services/contentService";
import { getDetailStudent, getStudents } from "../services/studentService";
import ManageStudentCreatePage from "../pages/manager/student-create";
import StudentCoursePage from "../pages/manager/student-course";
import AddStudentForm from "../pages/manager/student-course/components/AddStudentForm";
import { getOverviews } from "../services/overviewService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }

      return true;
    },
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (session && session.role === "manager") {
        throw redirect("/manager");
      }

      return true;
    },
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

      // const isTokenExpired = (token) => {
      //   const decode = jwtDecode(token);
      //   const now = Math.floor(Date.now() / 1000); // detik sekarang

      //   if (decode.exp < now) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // };

      if (
        !session ||
        session.role !== "manager"
        // || isTokenExpired(session.token)
      ) {
        throw redirect("/manager/sign-in");
      }

      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          const overviews = await getOverviews();

          return overviews?.data;
        },
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
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: `/manager/courses/:id/create`,
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return {
            imageUrl: course?.data.thumbnail_url,
            content: null,
          };
        },
        element: <ManageCreateContentPage />,
      },
      {
        path: `/manager/courses/:id/edit/:contentId`,
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);
          const content = await getContentDetail(params.contentId);

          return {
            imageUrl: course?.data.thumbnail_url,
            content: content?.data,
          };
        },
        element: <ManageCreateContentPage />,
      },
      {
        path: "/manager/courses/:id/preview",

        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);

          return course?.data;
        },
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        loader: async () => {
          const students = await getStudents();

          return students?.data;
        },
        element: <ManageStudentsPage />,
      },
      {
        path: "/manager/students/create",
        loader: () => {
          return null;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/students/:id/edit",
        loader: async ({ params }) => {
          const student = await getDetailStudent(params.id);

          return student?.data;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/courses/students/:id",
        loader: async ({ params }) => {
          const course = await getStudentsByCourse(params.id);

          return course?.data;
        },
        element: <StudentCoursePage />,
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async () => {
          const students = await getStudents();

          return students?.data;
        },
        element: <AddStudentForm />,
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

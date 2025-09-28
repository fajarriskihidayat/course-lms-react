import { Link, useLoaderData } from "react-router-dom";
import CardCourse from "./components/CardCourse";

const StudentPage = () => {
  const courses = useLoaderData();

  return (
    <section
      id="LatestCourse"
      className="flex flex-col rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
    >
      <h2 className="font-extrabold text-[22px] leading-[33px]">
        Latest Courses
      </h2>
      {courses.map((item) => (
        <CardCourse
          key={item._id}
          id={item._id}
          category={item.category.name}
          imageUrl={item.thumbnail_url}
          title={item.name}
        />
      ))}
    </section>
  );
};

export default StudentPage;

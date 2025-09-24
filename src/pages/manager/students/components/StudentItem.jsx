import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useLocation, useParams, useRevalidator } from "react-router-dom";
import { deleteStudent } from "../../../../services/studentService";
import { deleteStudentsByCourse } from "../../../../services/courseService";

const StudentItem = ({ id, imageUrl, name, totalCourse = 0 }) => {
  const params = useParams();
  const { revalidate } = useRevalidator();
  const { pathname } = useLocation();
  const studentPath = pathname === "/manager/students";

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () =>
      studentPath
        ? deleteStudent(id)
        : deleteStudentsByCourse(params.id, { studentId: id }),
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();

      revalidate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card flex items-center gap-5">
      <div className="relative flex shrink-0 w-20 h-20">
        <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="photo"
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
          {name}
        </h3>
        {studentPath && (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img
                src="/assets/images/icons/note-favorite-purple.svg"
                className="w-5 h-5"
                alt="icon"
              />
              <p className="text-[#838C9D]">{totalCourse} Course Joined</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center gap-3">
        {studentPath && (
          <Link
            to={`/manager/students/${id}/edit`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Edit Profile
          </Link>
        )}
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap cursor-pointer"
        >
          {isPending ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default StudentItem;

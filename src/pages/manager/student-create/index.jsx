import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../../../utils/schema";
import { useMutation } from "@tanstack/react-query";
import { createStudent, updateStudent } from "../../../services/studentService";

const ManageStudentCreatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(data ? updateStudentSchema : createStudentSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
    },
  });

  const [file, setFile] = useState(data ? data.avatar_url : null);
  const inputFileRef = useRef(null);

  const createMutate = useMutation({
    mutationFn: (data) => createStudent(data),
  });

  const updateMutate = useMutation({
    mutationFn: (data) => updateStudent(id, data),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", typeof file !== "string" ? file : "");

      data
        ? await updateMutate.mutateAsync(formData)
        : await createMutate.mutateAsync(formData);

      navigate("/manager/students");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <header className="flex items-center justify-between gap-[30px]">
          <div>
            <h1 className="font-extrabold text-[28px] leading-[42px]">
              {data ? "Edit" : "Add"} Student
            </h1>
            <p className="text-[#838C9D] mt-[1]">
              {data ? "Update" : "Create new"} future for company
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
              Import from BWA
            </Link>
          </div>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
        >
          <div className="relative flex flex-col gap-[10px]">
            <label htmlFor="thumbnail" className="font-semibold">
              Add a Avatar
            </label>
            <div className="flex items-center gap-[14px]">
              <div
                id="thumbnail-preview-container"
                className="relative flex shrink-0 w-20 h-20 rounded-[20px] border border-[#CFDBEF] overflow-hidden"
              >
                <button
                  type="button"
                  id="trigger-input"
                  className={`absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0 cursor-pointer  ${
                    !file ? "block" : "hidden"
                  }`}
                  onClick={() => inputFileRef?.current?.click()}
                >
                  <img
                    src="/assets/images/icons/gallery-add-black.svg"
                    className="w-6 h-6"
                    alt="icon"
                  />
                </button>
                <img
                  id="thumbnail-preview"
                  src={
                    file
                      ? typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                      : ""
                  }
                  className={`w-full h-full object-cover ${
                    file ? "block" : "hidden"
                  }`}
                  alt="thumbnail"
                />
              </div>
              <button
                type="button"
                id="delete-preview"
                className={`w-12 h-12 rounded-full z-10 cursor-pointer  ${
                  file ? "block" : "hidden"
                }`}
                onClick={() => {
                  setFile(null);
                  setValue("photo", null);
                }}
              >
                <img src="/assets/images/icons/delete.svg" alt="delete" />
              </button>
            </div>
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="absolute bottom-0 left-1/4 -z-10"
              {...register("photo")}
              ref={inputFileRef}
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  setValue("photo", e.target.files[0]);
                }
              }}
            />
            <span className="error-message text-[#FF435A]">
              {errors?.photo?.message}
            </span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
              <img
                src="/assets/images/icons/note-favorite-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <input
                type="text"
                id="name"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Write your name"
                {...register("name")}
              />
            </div>
            <span className="error-message text-[#FF435A]">
              {errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="email" className="font-semibold">
              Email Address
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
              <img
                src="/assets/images/icons/sms-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <input
                type="text"
                id="email"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Write your email address"
                {...register("email")}
              />
            </div>
            <span className="error-message text-[#FF435A]">
              {errors?.email?.message}
            </span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
              <img
                src="/assets/images/icons/lock-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <input
                type="password"
                id="password"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Type password"
                {...register("password")}
              />
            </div>
            <span className="error-message text-[#FF435A]">
              {errors?.password?.message}
            </span>
          </div>
          <div className="flex items-center gap-[14px]">
            <button
              type="button"
              className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={createMutate.isPending || updateMutate.isPending}
              className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap cursor-pointer"
            >
              {createMutate.isPending || updateMutate.isPending
                ? "Loading..."
                : data
                ? "Edit Now"
                : "Add Now"}
            </button>
          </div>
        </form>
      </>
    </>
  );
};

export default ManageStudentCreatePage;

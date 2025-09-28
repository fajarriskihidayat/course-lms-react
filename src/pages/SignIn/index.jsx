import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { postSignIn } from "../../services/authService";
import { signInSchema } from "../../utils/schema";
import { useState } from "react";
import { AxiosError } from "axios";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/const";

const SignInPage = ({ type = "manager" }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data) => postSignIn(data),
  });

  const onSubmit = async (data) => {
    setErrorMsg("");

    try {
      if (!data) {
        return;
      }

      const response = await mutateAsync(data);

      if (pathname === "/manager/sign-in" && response.data.role === "student") {
        return setErrorMsg(
          "Anda bukan manager course. Silahkan ke halaman student"
        );
      } else if (
        pathname === "/student/sign-in" &&
        response.data.role === "manager"
      ) {
        return setErrorMsg("Anda bukan student. Silahkan ke halaman manager");
      }

      secureLocalStorage.setItem(STORAGE_KEY, response.data);

      if (localStorage.getItem("isLastPath")) {
        navigate(-1);
      }

      if (response.data.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/student");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setErrorMsg(error.response.data.message);
        }
      }

      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col flex-1 ">
      <div className="absolute w-full h-screen bg-[#060A23] -z-10">
        <img
          src="/assets/images/backgrounds/background-glow.png"
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
      <Navbar type={type} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A] m-auto"
      >
        <div>
          <h1 className="font-bold text-[26px] leading-[39px] text-white">
            Welcome Back!
          </h1>
          <p className="text-[#6B6C7F]">Manage your employees easily</p>
        </div>
        {errorMsg && (
          <div className="w-full bg-red-500 p-4 rounded-sm">
            <p className="text-white text-xs">{errorMsg}</p>
          </div>
        )}
        <hr className="border-[#262A56]" />
        <div>
          <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
            <img
              src="/assets/images/icons/sms-white.svg"
              className="w-6 h-6 flex shrink-0"
              alt="icon"
            />
            <input
              type="email"
              name="email"
              id="email"
              className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
              placeholder="Write your email address"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div>
            <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
              <img
                src="/assets/images/icons/key-white.svg"
                className="w-6 h-6 flex shrink-0"
                alt="icon"
              />
              <input
                type="password"
                name="password"
                id="password"
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
                placeholder="Type your secure password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-[10px]">
            <Link
              to="#"
              className="text-sm leading-[21px] text-[#662FFF] hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <hr className="border-[#262A56]" />
        <button
          type="submit"
          disabled={isPending}
          className="w-full disabled:opacity-30 cursor-pointer rounded-full border p-[14px_20px] text-center font-semibold  text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
        >
          {isPending
            ? "Loading..."
            : `Sign In ${type === "manager" ? "to Manage" : ""}`}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

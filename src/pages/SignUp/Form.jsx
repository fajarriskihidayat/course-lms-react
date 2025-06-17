import React from "react";

const Form = () => {
  return (
    <div className="flex items-center justify-center gap-[109px] my-auto">
      <form
        action="signin.html"
        className="flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] mb-1 gap-[30px] bg-[#080A2A]"
      >
        <div>
          <h2 className="font-bold text-[26px] leading-[39px] text-white">
            Sign Up
          </h2>
          <p className="text-[#6B6C7F]">Manage your employees easily</p>
        </div>
        <hr className="border-[#262A56]" />
        <div className="flex items-center gap-3 w-full rounded-full border p-[14px_20px] transition-all duration-300 focus-within:border-[#8661EE] focus-within:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
          <img
            src="/assets/images/icons/user-octagon-white.svg"
            className="w-6 h-6 flex shrink-0"
            alt="icon"
          />
          <input
            type="text"
            name="name"
            id="name"
            className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]"
            placeholder="Write your complete name"
          />
        </div>
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
          />
        </div>
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
          />
        </div>
        <hr className="border-[#262A56]" />
        <button
          type="submit"
          className="w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]"
        >
          Sign Up Now
        </button>
      </form>
      <div className="flex flex-col gap-[30px]">
        <h1 className="font-extrabold text-[46px] leading-[69px] text-white">
          Sign Up &amp; Enhance <br />
          Employees Skills
        </h1>
        <p className="text-lg leading-[32px] text-white">
          We delivery robust features to anyone <br />
          unconditionally so they can grow bigger.
        </p>
      </div>
    </div>
  );
};

export default Form;

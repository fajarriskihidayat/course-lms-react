import React from "react";
import Navbar from "../../components/Navbar";
import Form from "./Form";
import Pricing from "./Pricing";

const SignUpPage = () => {
  return (
    <div className="relative flex flex-col flex-1">
      <div className="absolute w-full h-full bg-[#060A23] -z-10">
        <img
          src="/assets/images/backgrounds/background-glow.png"
          className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
          alt=""
        />
      </div>
      <Navbar />
      {/* <Form /> */}
      <Pricing />
    </div>
  );
};

export default SignUpPage;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-[30px]">
      <div className="flex items-center gap-[60px]">
        <img
          src="/assets/images/logos/logo.svg"
          className="flex shrink-0"
          alt="logo"
        />
        <ul className="flex items-center gap-10">
          <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
            <Link to="#">Home</Link>
          </li>
          <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
            <Link to="#">Pricing</Link>
          </li>
          <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
            <Link to="#">Features</Link>
          </li>
          <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
            <Link to="#">Testimonials</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <Link to="#">
          <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#070B24] border-[#24283E] shadow-[-10px_-6px_10px_0_#181A35_inset]">
            <span className="font-semibold text-white">My Dashboard</span>
          </div>
        </Link>
        <Link to="/manager/sign-up">
          <div className="flex items-center gap-3 w-fit rounded-full border p-[14px_20px] transition-all duration-300 hover:bg-[#662FFF] hover:border-[#8661EE] hover:shadow-[-10px_-6px_10px_0_#7F33FF_inset] bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]">
            <span className="font-semibold text-white">Sign Up</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

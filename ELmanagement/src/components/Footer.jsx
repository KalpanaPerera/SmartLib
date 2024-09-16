import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#000000] text-white text-center py-5 bottom-0 w-full">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Footer Text */}
        <p className="m-0 text-sm md:text-base">
          © 2024 SmartLib E-Library Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

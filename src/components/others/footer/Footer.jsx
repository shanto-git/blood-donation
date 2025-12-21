import React from "react";
import { FaFacebookSquare, FaPlus, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer items-center sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <h2 className="text-3xl font-bold flex text-red-600">
          Blood
          <span className="text-white flex">
            Plus
            <FaPlus className="mt-1" size={12} />
          </span>
        </h2>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaYoutube className="h-6 w-6" />
          </a>
          <a>
            <FaFacebookSquare className="h-6 w-6" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

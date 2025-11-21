import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const activeLink = "text-blue-400 font-semibold";
  const inactiveLink = "hover:text-gray-50";
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <nav
      className="bg-gray-800 border-b border-gray-700
        shadow-md sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold"
          onClick={() => setOpenMobileMenu(false)}
        >
          <img src="/SElogo.png" alt="Satsang Logo" className="h-8 w-8" />
          <span>Satsang Europe</span>
        </Link>
        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300 font-semibold ">
          <Link
            to="/aboutus"
            activeProps={{ className: activeLink }}
            inactiveProps={{ className: inactiveLink }}
            className="transition"
          >
            About Us
          </Link>
          <Link
            to="/events"
            activeProps={{ className: activeLink }}
            inactiveProps={{ className: inactiveLink }}
            className="transition"
          >
            Events
          </Link>
          <Link
            to="/blogs"
            activeProps={{ className: activeLink }}
            inactiveProps={{ className: inactiveLink }}
            className="transition"
          >
            Blogs
          </Link>
          <Link
            to="/publications"
            activeProps={{ className: activeLink }}
            inactiveProps={{ className: inactiveLink }}
            className="transition"
          >
            Publications
          </Link>
          <Link
            to="/contactus"
            activeProps={{ className: activeLink }}
            inactiveProps={{ className: inactiveLink }}
            className="transition"
          >
            Contact Us
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            className="text-blue-400 text-xl cursor-pointer"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            {openMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/** Mobile View */}
      {openMobileMenu && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-2 py-2 ">
          <div className="space-x-6 space-y-2 text-center mb-2">
            <Link
              to="/aboutus"
              activeProps={{ className: activeLink }}
              inactiveProps={{ className: inactiveLink }}
              className="transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              About Us
            </Link>
            <Link
              to="/events"
              activeProps={{ className: activeLink }}
              inactiveProps={{ className: inactiveLink }}
              className="transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Events
            </Link>
            <Link
              to="/blogs"
              activeProps={{ className: activeLink }}
              inactiveProps={{ className: inactiveLink }}
              className="transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Blogs
            </Link>
            <Link
              to="/publications"
              activeProps={{ className: activeLink }}
              inactiveProps={{ className: inactiveLink }}
              className="transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Publications
            </Link>
          </div>
          <div className="space-x-4 space-y-2 text-center">
            <Link
              to="/contactus"
              activeProps={{ className: activeLink }}
              inactiveProps={{ className: inactiveLink }}
              className="transition"
              onClick={() => setOpenMobileMenu(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

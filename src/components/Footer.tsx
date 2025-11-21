import { Link } from "@tanstack/react-router";
import {
  FaFacebook,
  FaHouseUser,
  FaInstagram,
  FaLink,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 shadow-md bottom-0">
      <div className="max-w-6xl mx-auto px-6 py-2 flex flex-col md:flex-row justify-between mb-4 text-gray-300 gap-5 md:gap-0">
        <div className="space-y-2">
          <Link to="/" className="flex items-center gap-2 text-md">
            {/* <img src="/SElogo.png" alt="Satsang Logo" className="h-4 w-4" /> */}
            <span className="font-bold">Satsang Europe</span>
          </Link>
          <p className="text-sm text-gray-300">RSIN: 865211905</p>
          <div className="flex items-center gap-2">
            <FaHouseUser />
            <p>Tuinderserf 26, Arnhem Netherlands</p>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail />
            <p>info@satsangeurope.org</p>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <p>+31 617628855</p>
          </div>
        </div>
        <div className="space-y-2">
          <Link
            to="/legaldocs"
            className="flex items-center gap-2 text-md text-blue-400"
          >
            {/* <img src="/SElogo.png" alt="Satsang Logo" className="h-4 w-4" /> */}
            <span className="font-bold">Legal Documents</span> <FaLink />
          </Link>
          <div className="my-3">
            <p className="pb-2">Follow us on:</p>
            <p className="text-lg md:text-xl flex gap-3 md:gap-6 items-center text-white">
              <a href="https://www.facebook.com/satsang.europe">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/SatsangEurope">
                <FaXTwitter />
              </a>
              <a href="https://twitter.com/SatsangEurope">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/SatsangEurope">
                <FaYoutube />
              </a>
            </p>
          </div>
          <p className="md:text-lg">
            © All rights reserved to ©satsangeurope
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

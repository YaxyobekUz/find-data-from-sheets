import React from "react";
import { Link } from "react-router-dom";

// Components
import Icon from "./Icon";

// Images
import logoIcon from "../assets/images/icons/logo.svg";
import recentIcon from "../assets/images/icons/recent.svg";
import searchIcon from "../assets/images/icons/search.svg";

const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 bg-white py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5">
            {/* logo icon */}
            <img
              width={40}
              height={40}
              src={logoIcon}
              className="size-9 sm:size-10"
              alt="Mene Market logo svg icon"
            />

            {/* logo text */}
            <span className="hidden font-medium leading-[18px] sm:inline">
              Ma'lumtolarni <br /> qidirish
            </span>
          </Link>

          {/* Nav */}
          <nav>
            <ul className="flex items-center gap-3.5 sm:gap-5">
              {/* history */}
              <li>
                <Link to="/history" className="btn-stroke h-10 px-3.5 sm:px-5">
                  <Icon src={recentIcon} alt="Recent icon" />
                  <span className="text-primary-default">Tarix</span>
                </Link>
              </li>

              {/* search */}
              <li>
                <Link to="/" className="btn-stroke h-10 px-3.5 sm:px-5">
                  <Icon src={searchIcon} alt="Search icon" />
                  <span>Qidirish</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

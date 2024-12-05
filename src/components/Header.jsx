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
    <header className="bg-white py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            {/* logo icon */}
            <img
              width={181}
              height={48}
              src={logoIcon}
              className="w-auto h-12"
              alt="Mene Market logo svg icon"
            />
          </Link>

          {/* Nav */}
          <nav>
            <ul className="flex items-center gap-5">
              {/* history */}
              <li>
                <Link to="/history" className="btn-stroke h-10 px-5">
                  <Icon src={recentIcon} alt="Recent icon" />
                  <span className="text-primary-default">Tarix</span>
                </Link>
              </li>

              {/* search */}
              <li>
                <Link to="/" className="btn-stroke h-10 px-5">
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

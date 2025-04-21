import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./AppTopBar.css";
import { userDetails } from "../../../utils/Generic";
import { RiLogoutBoxRLine } from "react-icons/ri";

function AppTopBar() {
  return (
    <div className="navbar-container bg-primary">
      <Link to="#" className="nav-icons">
        {/* <FaIcons.FaBars onClick={setDisplaySideBar} /> */}
      </Link>
      <Link to="#" className="nav-icons title-company-name">
        {userDetails("company")}
      </Link>
      <Link to="/ccadmin" className="nav-icons flex-right" title="Logout">
        <RiLogoutBoxRLine />
      </Link>
    </div>
  );
}

export default AppTopBar;

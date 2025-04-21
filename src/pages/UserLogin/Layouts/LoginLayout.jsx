import React from "react";
import { Outlet } from "react-router-dom";
import "./LoginLayout.css";
import banner from "../../../assets/images/banner-1.svg";
import userimage from "./avatar-1.svg";

function LoginLayout() {
  return (
    <div className="layout-container shadow-lg p-3 mb-5 rounded bg-primary">
      <div className="body-group-container bg-white">
        <div className="image-container">
          <img className="banner-image" alt="bannerImage" src={banner} />
        </div>
        <div className="form-group-container">
          <div className="logo-container mb-2">
            <img
              className="profile-avatar mb-2"
              alt="profile-avatar"
              // src="http://posweb.bizdevinfotech.com/Assets/LoginImg/avatar-1.svg"
              src={userimage}
            />
          </div>
          <div className="form-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;

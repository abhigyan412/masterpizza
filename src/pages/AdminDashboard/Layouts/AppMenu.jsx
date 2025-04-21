import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBarMenuItems from "../../../components/sidebar/SideBarMenuItems";
import { AppMenuData } from "../../../routes/AppMenuData";
import { userDetails } from "../../../utils/Generic";
import "./AppMenu.css";
import userimage from "./avatar-1.svg";
import { Sidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
function AppMenu({ collapsed, setDisplaySideBar }) {
  // const displayMenuStyle = showSideBar
  //   ? "side-nav-bar bg-primary"
  //   : "side-nav-bar bg-primary side-nav-bar-minimize";

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(userDetails());
  }, []);

  return (
    <nav className={"side-nav-bar bg-primary"}>
      <Sidebar collapsed={collapsed}  >
        <header className={`sidebar-header ${collapsed && "d-flex justify-content-center align-items-center"}`} >
          {/* Profile Section */}
          {!collapsed && <div className="profile">
            <img src={userimage}
              alt="Profile Pics" className="profile-pic" />
            <div className="username">
              <div>{userDetails("name")}</div>
              <span className="email" title={userInfo?.emalid}>{userInfo?.emalid}</span>
            </div>
            {<div className="sb-button" onClick={() => setDisplaySideBar()} style={{ cursor: "pointer" }} >
              {collapsed ? <FaAngleDoubleRight fontSize={25} color="#ffffff" /> : <FaAngleDoubleLeft fontSize={25} color="#ffffff" />}
            </div>}
          </div>}
          {collapsed && <div onClick={() => setDisplaySideBar()} style={{ cursor: "pointer" }} >
            {collapsed ? <FaAngleDoubleRight fontSize={25} color="#ffffff" /> : <FaAngleDoubleLeft fontSize={25} color="#ffffff" />}
          </div>}
        </header>
        <Menu closeOnClick={true} className="">
          {AppMenuData.map((item, index) =>
            item.subMenus ? (
              <SubMenu key={index} icon={item.icon} label={item.title}>
                <div className="submenu-scroll">
                  {item.subMenus.map((subItem, subIndex) => (
                    <MenuItem key={subIndex} icon={subItem.icon} component={<Link to={subItem.path} />}>
                      {subItem.title}
                    </MenuItem>
                  ))}
                </div>
              </SubMenu>
            ) : (
              <MenuItem key={index} icon={item.icon} component={<Link to={item.path} />}>
                {item.title}
              </MenuItem>
            )
          )}
        </Menu>
        <footer className={`sidebar-footer d-flex justify-content-center align-items-center`} >
          <Menu>
            <MenuItem icon={<AiIcons.AiOutlineLogout />} component={<Link to="/ccadmin" />}>
              Logout
            </MenuItem>
          </Menu>
        </footer>
      </Sidebar>
    </nav>
  );
}

export default AppMenu;

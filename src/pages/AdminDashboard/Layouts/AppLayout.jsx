import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.css";
import AppMenu from "./AppMenu";
import AppTopBar from "./AppTopBar";

function AppLayout() {
  // const [showSideBar, setShowSideBar] = useState(false);
  // const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(true);
  const setDisplaySideBar = () => setCollapsed(!collapsed);
  useEffect(() => {
    navigate("Orderlist");
    <Outlet />;
  }, []);

  return (
    <>
      <div className="AppBoard">
        <AppMenu
          collapsed={collapsed}
          setDisplaySideBar={setDisplaySideBar}
        />
        <div className={`content-wrapper ${collapsed ? "opened-wrapper-sidebar-collapse" : "opened-wrapper"}`}>
          <AppTopBar />
          <div className="container-fluid p-4 bg-white h-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;

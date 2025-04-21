import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBarMenuItems.css";

const SideBarMenuItems = ({ item }) => {
  const [subMenu, setSubMenu] = useState(false);
  const setSubMenuValue = () => setSubMenu(!subMenu);

  return (
    <>
      <Link
        className="nav-item-link"
        to={item.path ? item.path : "#"}
        onClick={item.subMenus && setSubMenuValue}
      >
        <div>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>{item.subMenus && (subMenu ? item.iconOpen : item.iconClose)}</div>
      </Link>
      <div
        id="style-5"
        style={{
          overflow: "auto",
          maxHeight: "25vh",
        }}
      >
        {subMenu &&
          item.subMenus.map((subItems, index) => {
            return (
              <Link
                className="nav-item-link"
                style={{ marginLeft: "1rem" }}
                key={index}
                to={subItems.path}
              >
                <div>
                  {subItems.icon}
                  <span>{subItems.title}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default SideBarMenuItems;

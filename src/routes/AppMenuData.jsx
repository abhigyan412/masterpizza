import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import * as BiIcons from "react-icons/bi";

export const AppMenuData = [
  {
    title: "Dashboard",
    path: "Orderlist",
    icon: <AiIcons.AiFillDashboard />,
    iconClose: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Master",
    icon: <FaIcons.FaUsers />,
    iconClose: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subMenus: [
      {
        title: "Item Type",
        path: "ItemType",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Item Size",
        path: "ItemSize",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Item Base",
        path: "ItemBase",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Topping",
        path: "Topping",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Spicy",
        path: "Spicy",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Item Master",
        path: "Item",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Item Price",
        path: "ItemPrice",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Item Package",
        path: "ItemPackage",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Offers",
        path: "Offers",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "Modifiers",
        path: "Modifiers",
        icon: <AiIcons.AiFillPropertySafety />,
      },
      {
        title: "ModifierGroup",
        path: "ModifierGroup",
        icon: <AiIcons.AiFillPropertySafety />,
      },
    ],
  },
  {
    title: "Out Of Stock",
    path: "Outofstock",
    icon: <MdIcons.MdNoFood />,
    iconClose: <MdIcons.MdNoFood />,
    iconOpen: <MdIcons.MdNoFood />,
  },
  {
    title: "Item Management",
    icon: <MdIcons.MdManageAccounts />,
    iconClose: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    subMenus: [
      {
        title: "Item Of The Day",
        path: "Itemoftheday",
        icon: <RiIcons.RiMenuAddFill />,
      },
      {
        title: "Add Promotion",
        path: "Addpromotion",
        icon: <BiIcons.BiCalendarPlus />,
      },
      {
        title: "Item Delay",
        path: "Itemdelay",
        icon: <IoIcons.IoTimer />,
      },
    ],
  },
  {
    title: "Block List",
    path: "Blocklist",
    icon: <MdIcons.MdBlock />,
  },
  {
    title: "Store Close",
    path: "Storeclose",
    icon: <RiIcons.RiTimerLine />,
  },
];

import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "SNo",
    className: "center",
  },
  {
    displayName: "Code",
    propName: "Custoemritemcode",
    className: "left",
  },
  {
    displayName: "Topping Name",
    propName: "Topingname",
    className: "left",
  },
  {
    displayName: "Whole Price",
    propName: "Fullprice",
    className: "right",
  },
  {
    displayName: "Half Price",
    propName: "Halfprice",
    className: "right",
  },
  {
    displayName: "Created By",
    propName: "Createdby",
    className: "left",
  },
  {
    displayName: "Created On",
    propName: "Createdon",
    className: "center",
  },
];

export const searchFieldSet = {
  title: "Search Form",
  fields: [
    {
      name: "toppingname",
      displayText: "Topping Name",
      type: "text",
      otherProps: { placeholder: "Search..." },
    },
  ],
};

export const searchInitValue = () => {
  return {
    customerid: userDetails("companyid"),
    itemtype: "",
    fromdate: "",
    todate: "",
    pageno: -1,
    pagesize: -1,
  };
};

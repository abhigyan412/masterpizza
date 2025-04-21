import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "SNo",
    className: "center",
  },
  {
    displayName: "Spicy Name",
    propName: "Spicyname",
    className: "left",
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

export const searchInitValue = () => {
  return {
    customerid: userDetails("companyid"),
    pageno: 1,
    pagesize: process.env.REACT_APP_DEFAULT_PAGE_SIZE,
  };
};

export const searchFieldSet = {
  title: "Search Form",
  fields: [
    {
      name: "Spicyname",
      displayText: "Spicy Name",
      type: "text",
      otherProps: { placeholder: "Search..." },
    },
  ],
};

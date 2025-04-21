import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "SNo",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Menu Name",
    propName: "menuname",
    className: "left",
  },
  {
    displayName: "Time Zone",
    propName: "timezone",
    className: "left",
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
      name: "fromdate",
      displayText: "From Date",
      type: "date",
      otherProps: { placeholder: "dd-mm-yyyy" },
    },
    {
      name: "todate",
      displayText: "To Date",
      type: "date",
      otherProps: { placeholder: "dd-mm-yyyy" },
    },
    {
      name: "consumername",
      displayText: "Item Size",
      type: "text",
    },
  ],
};

import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Item Size",
    propName: "itemsize",
    className: "left",
  },
  {
    displayName: "Created By",
    propName: "createdby",
    className: "left",
  },
  {
    displayName: "Created On",
    propName: "createdon",
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
      name: "itemsize",
      displayText: "Item Size",
      type: "text",
    },
  ],
};

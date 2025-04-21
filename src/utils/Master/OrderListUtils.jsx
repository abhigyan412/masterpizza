import { userDetails } from "../Generic";

export const columnList = [
  // {
  //   displayName: "SNo",
  //   propName: "sno",
  //   className: "center",
  // },
  {
    displayName: "Name",
    propName: "consumername",
    className: "left",
  },
  {
    displayName: "Mobile",
    propName: "contactno",
    className: "left",
  },

  {
    displayName: "Orderid",
    propName: "orderid",
    className: "right",
  },
  {
    displayName: "No of Items",
    propName: "noofitems",
    className: "right",
  },
  {
    displayName: "Amount",
    propName: "totalamount",
    className: "right",
  },
  {
    displayName: "Date",
    propName: "orderdate",
    className: "left",
  },
  {
    displayName: "Time",
    propName: "ordertime",
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

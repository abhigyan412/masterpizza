import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Item Name",
    propName: "itemcode",
    className: "left",
  },
  {
    displayName: "Item Size",
    propName: "itemsizename",
    className: "left",
  },
  {
    displayName: "Unit Price",
    propName: "unitprice",
    className: "Center",
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
      name: "itemcode",
      displayText: "Search",
      type: "text",
    },
  ],
};

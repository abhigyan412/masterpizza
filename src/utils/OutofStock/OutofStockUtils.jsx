import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
  },
  {
    displayName: "Item Name",
    propName: "itemname",
  },
  {
    displayName: "Size Name",
    propName: "sizename",
  },
  {
    displayName: "Stock Date",
    propName: "stockdate",
  },
  {
    displayName: "Created By",
    propName: "username",
  },
  {
    displayName: "Created On",
    propName: "createdon",
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
      name: "itemname",
      displayText: "Item Name",
      type: "text",
    },
  ],
};

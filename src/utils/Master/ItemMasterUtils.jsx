import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Item Code",
    propName: "customeritemcode",
    className: "left",
  },
  {
    displayName: "Item Name",
    propName: "itemname",
    className: "left",
  },
  {
    displayName: "Item Description",
    propName: "itemdescription",
    className: "left tdbreak",
  },
  {
    displayName: "Item Type",
    propName: "type",
    className: "left",
  },
  {
    displayName: "Item Category",
    propName: "category",
    className: "left",
  },
  {
    displayName: "Item Size",
    propName: "sizeNameList",
    className: "left tdbreak",
  },
  // {
  //   displayName: "Extra Addon Limit",
  //   propName: "extraaddonlimit",
  //   className: "right",
  // },
  // {
  //   displayName: "Addon Remove Limit",
  //   propName: "addonremovelimit",
  //   className: "right",
  // },
  // {
  //   displayName: "Is Own",
  //   propName: "isown",
  //   className: "right",
  // },
  // {
  //   displayName: "Addon Limit",
  //   propName: "addonlimit",
  //   className: "right",
  // },
  // {
  //   displayName: "Is Addon Item",
  //   propName: "isaddonitem",
  //   className: "center",
  // },
  // {
  //   displayName: "Is Modifier",
  //   propName: "ismodifier",
  //   className: "center",
  // },
  // {
  //   displayName: "Apply Modifer",
  //   propName: "applaymodifer",
  //   className: "center",
  // },
  {
    displayName: "Created By",
    propName: "username",
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
      name: "search",
      displayText: "Search",
      type: "text",
    },
  ],
};

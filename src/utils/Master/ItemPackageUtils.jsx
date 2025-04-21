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
    displayName: "No of Packages",
    propName: "packageCount",
    className: "center",
  },
  {
    displayName: "Created By",
    propName: "createdby",
    className: "left",
  },
  {
    displayName: "Created On",
    propName: "createdon",
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
      name: "itemname",
      displayText: "Search",
      type: "text",
    },
  ],
};

export const initPackageValue = {
  itemtype: 0,
  itemtypename: "",
  itemcode: 0,
  itemsizeid: 0,
  itemname: "",
  itemsize: "",
  itemprice: 0,
  discount: "",
  description: "",
  discounttype: "",
  discountamount: "",
  unitprice: "",
};

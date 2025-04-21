import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Item Code",
    propName: "itemcode",
    className: "left",
  },
  {
    displayName: "Item Name",
    propName: "itemname",
    className: "left",
  },
  {
    displayName: "Start Time",
    propName: "starttime",
    className: "center",
  },
  {
    displayName: "End Time",
    propName: "endtime",
    className: "center",
  },
  {
    displayName: "Delay Minutes",
    propName: "delayminutes",
    className: "center",
  },
];

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
      name: "itemtype",
      displayText: "Item Type Name",
      type: "text",
    },
  ],
};

export const searchInitValue = () => {
  return {
    customerid: userDetails("companyid"),
    pageno: 1,
    pagesize: 1000, //process.env.REACT_APP_DEFAULT_PAGE_SIZE,
  };
};

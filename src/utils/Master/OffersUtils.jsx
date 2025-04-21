import { userDetails } from "../Generic";

export const columnList = [
  {
    displayName: "Serial No",
    propName: "sno",
    className: "center",
  },
  {
    displayName: "Item name",
    propName: "itemname",
    className: "left",
  },
  {
    displayName: "Item size",
    propName: "itemsizename",
    className: "left",
  },
  {
    displayName: "Item price",
    propName: "itemprice",
    className: "left",
  },
  {
    displayName: "Disc.Amt",
    propName: "discountamount",
    className: "left",
  },
  {
    displayName: "Unit price",
    propName: "unitprice",
    className: "left",
  },
  {
    displayName: "From Day",
    propName: "fromday",
    className: "left",
  },
  {
    displayName: "To Day",
    propName: "today",
    className: "left",
  },
  {
    displayName: "From Hour",
    propName: "fromhours",
    className: "left",
  },
  {
    displayName: "To Hour",
    propName: "tohours",
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
      name: "itemname",
      displayText: "Item Name",
      type: "text",
      otherProps: { placeholder: "Search..." },
    },
  ],
};

export const initPackageValue = {
  itemcode: 0,
  itemname: "",
  itemprice: 0,
  discount: "",
  discounttype: "",
  discountamount: "",
  unitprice: "",
};

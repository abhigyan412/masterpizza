import { userDetails } from "../Generic";
export const columnList = [
  {
    displayName: "Serial No",
    propName: "SNo",
    className: "center",
  },
  {
    displayName: "Base Name",
    propName: "Basename",
    className: "left",
  },
  {
    displayName: "Base Code",
    propName: "Basecode",
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
      name: "basename",
      displayText: "Base Name/Code",
      type: "text",
      otherProps: { placeholder: "Search..." },
    },
    // {
    //   name: "basecode",
    //   displayText: "Base Code",
    //   type: "text",
    //   otherProps: { placeholder: "Base Code" },
    // },
    // {
    //   name: "itemcode",
    //   displayText: "Search",
    //   type: "text",
    // },
  ],
};

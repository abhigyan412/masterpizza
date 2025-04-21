import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/ModifierGroupUtils";

const ViewModifierGroup = ({
  setViewState,
  columns,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
  setData,
}) => {
  const changeViewState = () => setViewState(false);
  const [isViewSearch, setViewSearch] = useState(false);
  const changeViewSearch = () => {
    setViewSearch(true);
  };
  const [filtereddata, setfiltereddata] = useState("");

  const manageOptions = [
    // {
    //   title: <FaIcons.FaPlus />,
    //   props: {
    //     className: "btn btn-primary btn-rounded btn-icon",
    //     title: "Create",
    //     onClick: changeViewState,
    //   },
    // },
    {
      title: <FaIcons.FaSearch />,
      props: {
        className: "btn btn-warning btn-rounded btn-icon",
        title: "Search",
        onClick: changeViewSearch,
      },
    },
    // {
    //   title: <FaIcons.FaDownload />,
    //   props: {
    //     className: "btn btn-secondary btn-rounded btn-icon",
    //     title: "Export",
    //   },
    // },
  ];

  // const searchParams = (values) => {
  //   console.log(values);
  //   values = {
  //     ...values,
  //     pageno: 1,
  //     pagesize: pageDetails.pagesize,
  //   };
  //   changeRecordList({ type: "search", value: values });
  // };

  // CLIENTSIDE FILTERATION
  const chgfiltereddata = (event) => {
    setfiltereddata(event.target.value);
    setData(event.target.value);
    var result = [];
    result = recordList.filter((stu) => {
      return stu.modifiername
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    // setfilterData(result);
  };

  return (
    <div className="">
      <LayoutControls title="Modifier Group" options={manageOptions} />
      <hr />
      {isViewSearch && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <input
            type="text"
            placeholder="Search items"
            className="form-control mb-3"
            style={{ width: "450px" }}
            onChange={chgfiltereddata}
            value={filtereddata}
          />
          <button
            type="button"
            className="btn btn-danger mb-3"
            onClick={() => {
              setViewSearch(false);
              setfiltereddata("");
              setData("");
            }}
          >
            Close
          </button>
        </div>
      )}
      {/* <ViewDataTable
        columns={columns}
        data={recordList}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={pageDetails}
        modifier={modifier}
      /> */}
    </div>
  );
};

export default ViewModifierGroup;

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/OffersUtils";

const ViewOffer = ({
  setViewState,
  columns,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
}) => {
  const changeViewState = () => setViewState(false);

  const [isViewSearch, setViewSearch] = useState(false);
  const [filtereddata, setfiltereddata] = useState("");
  const [filterData, setfilterData] = useState([]);
  const changeViewSearch = () => {
    setViewSearch(true);
  };

  const manageOptions = [
    {
      title: <FaIcons.FaPlus />,
      props: {
        className: "btn btn-primary btn-rounded btn-icon",
        title: "Create",
        onClick: changeViewState,
      },
    },
    {
      title: <FaIcons.FaSearch />,
      props: {
        className: "btn btn-warning btn-rounded btn-icon",
        title: "Search",
        onClick: changeViewSearch,
      },
    },
  ];

  // const searchParams = (values) => {
  //   console.log(values);

  //   values = { ...values, pageno: 1, pagesize: pageDetails.pagesize };
  //   changeRecordList({ type: "search", value: values });
  // };

  // CLIENTSIDE FILTERATION
  const chgfiltereddata = (event) => {
    setfiltereddata(event.target.value);
    var result = [];
    result = recordList.filter((stu) => {
      return stu.itemname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setfilterData(result);
  };
  return (
    <div className="content-shrink">
      <LayoutControls title="Offer Item List" options={manageOptions} />
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
            onClick={() => setViewSearch(false)}
          >
            Close
          </button>
        </div>
      )}

      <ViewDataTable
        columns={columns}
        data={filtereddata ? filterData : recordList}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={pageDetails}
      />
    </div>
  );
};

export default ViewOffer;

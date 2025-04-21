import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import ViewDataTable from "../../../components/tables/ViewDataTable";

const ViewItemdelay = ({
  setViewState,
  columns,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
  pagination,
  itemdelayDate,
  setDDldate,
}) => {
  const [vpage, setVpage] = useState({ pageno: 1, pagesize: -1 });
  const changeViewState = () => setViewState(false);
  const changeRefreshState = () => setfiltereddata("");
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
        title: "Add item",
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
    <div>
      <LayoutControls
        title="Item Delay List"
        options={manageOptions}
        itemdelayDate={itemdelayDate}
        setDDldate={setDDldate}
      />
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
        pageDetails={vpage}
        pagination={pagination}
      />
    </div>
  );
};

export default ViewItemdelay;

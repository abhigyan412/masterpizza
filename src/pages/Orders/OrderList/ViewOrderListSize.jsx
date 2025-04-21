import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/OrderListUtils";
import DatePicker, { DateObject } from "react-multi-date-picker";
const ViewOrderListSize = ({
  setViewState,
  columns,
  orderStatus,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
  setautoRefresh,
  refreshPage,
  onLoadrefresh,
  setOrderddl,
  setSSDate,
  onSubmit,
}) => {
  // const changeViewState = () => setViewState(false);
  const [vpage, setVpage] = useState({ pageno: 1, pagesize: -1 });
  const [isViewSearch, setViewSearch] = useState(false);
  const [ddlval, setDdlval] = useState("");
  const [searchval, setSearchval] = useState("");
  const [dateval, setOrderDate] = useState({});
  const [ddldate, setDdldate] = useState(new Date());
  const [sDate, setSDate] = useState("");
  const [clearAll, setclearAll] = useState({});

  const refreshOrders = (record) => {
    setSearchval("");
    setDdlval("");
    setclearAll({});
    onLoadrefresh();
  };
  const autoRefresh = (intervalid) => {
    setclearAll({});
    setautoRefresh(intervalid);
  };

  const manageOptions = [
    {
      title: <FaIcons.FaSyncAlt />,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "Refresh",
        onClick: refreshOrders,
      },
    },
  ];

  const searchParams = (values) => {
    console.log(values);

    values = { ...values, pageno: 1, pagesize: pageDetails.pagesize };
    changeRecordList({ type: "search", value: values });
  };
  const changeDDLval = (ddlval) => {
    setDdlval(ddlval);
    setOrderddl(ddlval);
  };
  const changeSearchval = (searchval) => {
    setSearchval(searchval);
  };

  const changeOrderDate = (dateval) => {
    if (sDate === "") {
      var result =
        ddldate.getFullYear() +
        "-" +
        ddldate.getMonth() +
        "-" +
        ddldate.getDate();
      setSDate(result);
      setSSDate(result);
    } else {
      setSDate(dateval.toString());
      setSSDate(dateval.toString());
    }
    setDdldate(dateval);
  };

  useEffect(() => {
    setOrderDate({});
    var result = "";
    if (sDate === "") {
      const yyyy = ddldate.getFullYear();
      let mm = ddldate.getMonth() + 1;
      let dd = ddldate.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      result = yyyy + "-" + mm + "-" + dd;
      setSDate(result);
      setSSDate(result);
    }
  }, [sDate]);

  return (
    <div className="container">
      <LayoutControls
        title="Orders List"
        orderStatus={orderStatus}
        options={manageOptions}
        changeDDLval={changeDDLval}
        changeSearchval={changeSearchval}
        orderDate={dateval}
        setDDldate={changeOrderDate}
        clearAll={clearAll}
        onSubmit={onSubmit}
      />
      <hr />
      {isViewSearch && (
        <SearchForm
          setViewSearch={setViewSearch}
          searchParams={searchParams}
          searchFieldSet={searchFieldSet}
        />
      )}
      <ViewDataTable
        columns={columns}
        data={recordList}
        orderStatus={orderStatus}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={vpage}
        ddlval={ddlval}
        searchval={searchval}
        //dateval={sDate}
        autoRefresh={autoRefresh}
        refreshPage={refreshPage}
      />
    </div>
  );
};

export default ViewOrderListSize;

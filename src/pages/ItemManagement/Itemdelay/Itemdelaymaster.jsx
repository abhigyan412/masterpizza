import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import ViewItemdelay from "./ViewItemdelay";
import { ITEM_DELAY } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import ItemdelayDetails from "./ItemdelayDetails";
import {
  columnList,
  searchInitValue,
} from "../../../utils/ItemManagement/ItemdelayUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";

const ItemdelayMaster = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    CustomerId: userDetails("companyid"),
  });
  const [itemdelayDate, setItemdelayDate] = useState({});
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});
  const [ddldate, setDdldate] = useState(new Date());
  const [sDate, setSDate] = useState("");

  const removeRecords = (record) => {
    let data = {
      customerid: userDetails("companyid"),
      userid: userDetails("userid"),
      transId: record.transid,
    };
    api
      .post(ITEM_DELAY.DELETE, data)
      .then((response) => {
        let { status, message } = response.data.data;
        setAlert({ isDisplay: true, status, message });
        status === 1 && setViewState({});
      })
      .catch((error) => console.log(error));
  };
  const displayDelete = (record) => {
    setDeleteRecord(record);
  };
  const onDelete = (isCanceled, values) => {
    if (isCanceled) setDeleteRecord({});
    else {
      let { CustomerId, idtype, reason } = values;
      let data = {
        CustomerId,
        reason,
        itemsizeid: idtype,
        userid: userDetails("userid"),
      };
      api
        .post(ITEM_DELAY.LIST, data)
        .then((response) => {
          let { status, message } = response.data.data.data[0];
          setAlert({ isDisplay: true, status, message });
          status === 1 && setDeleteRecord({});
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };
  const actionItems = [
    {
      name: <FaIcons.FaTimes />,
      clickEvent: removeRecords,
      props: {
        className: "btn btn-danger btn-rounded btn-icon",
        title: "Remove",
      },
    },
  ];

  const changeViewState = (value) => {
    setSelectedRecord({ CustomerId: userDetails("companyid") });
    setViewState(value);
  };
  const changeAlertState = (obj) => {
    setAlert(obj);
  };
  const setDDldate = (ddlval) => {
    if (sDate === "") {
      var result =
        ddldate.getMonth() +
        1 +
        "/" +
        ddldate.getDate() +
        "/" +
        ddldate.getFullYear();
      setSDate(result);
    } else {
      setSDate(ddlval.toString());
    }
    setDdldate(ddlval);
  };
  useEffect(() => {
    setItemdelayDate({});
    var result = "";
    if (sDate === "") {
      result =
        ddldate.getMonth() +
        1 +
        "/" +
        ddldate.getDate() +
        "/" +
        ddldate.getFullYear();
      setSDate(result);
    }
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      let data = {
        customerid: userDetails("companyid"),
        userid: userDetails("userid"),
        starttime: sDate == "" ? result : sDate,
      };
      api
        .post(ITEM_DELAY.LOAD, data)
        .then((response) => {
          let { resultset, totalrows } = response.data.data;
          setRecordList(resultset);
          setTotalRecordCount(parseInt(totalrows));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord, sDate]);

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewItemdelay
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
            itemdelayDate={itemdelayDate}
            setDDldate={setDDldate}
          />
        ) : (
          <ItemdelayDetails
            setViewState={setViewState}
            selectedRecord={selectedRecord}
            setAlert={changeAlertState}
          />
        )
      ) : (
        <DeleteForm
          selectedRecord={deleteRecord}
          columns={columnList}
          onDelete={onDelete}
        />
      )}
      <AlertMessage {...alert} setAlert={setAlert} />
    </>
  );
};

export default ItemdelayMaster;

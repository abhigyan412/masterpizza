import React from "react";
import * as FaIcons from "react-icons/fa";
import { useEffect, useReducer, useState } from "react";
import api from "../../../services/api";
import { userDetails } from "../../../utils/Generic";
import { reducer } from "../../../utils/Generic";
import ViewItemBase from "./ViewItemBase";
import ItemBaseDetails from "./ItemBaseDetails";
import DeleteForm from "../../../components/search/DeleteForm";
import AlertMessage from "../../../components/toast/AlertMessage";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/ItemBaseUtils";
import { ITEM_BASE } from "../../../utils/ApiMethods";

const Itembase = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    customerid: userDetails("companyid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});

  const displayRecords = (record) => {
    setSelectedRecord(record);
    setViewState(false);
  };

  const displayDelete = (record) => {
    setDeleteRecord(record);
  };

  const onDelete = (isCanceled, values) => {
    if (isCanceled) setDeleteRecord({});
    else {
      // let { customerid, idprice, reason } = values;
      // let data = { customerid, reason, idprice, userid: userDetails("userid") };
      let data = {
        restaurantid: userDetails("companyid"),
        baseid: deleteRecord.Baseid,
        createdby: userDetails("userid"),
      };

      api
        .delete(
          ITEM_BASE.DELETE +
          "?restraurantid=" +
          userDetails("companyid") +
          "&userid=" +
          userDetails("userid") +
          "&baseid=" +
          deleteRecord.Baseid
        )
        .then((response) => {
          let status = response.data.data.Resultset.Status;
          let message = response.data.data.Resultset.Message;
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
      name: <FaIcons.FaEdit />,
      clickEvent: displayRecords,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "Edit",
      },
    },
    {
      name: <FaIcons.FaTrash />,
      clickEvent: displayDelete,
      props: {
        className: "btn btn-danger btn-rounded btn-icon",
        title: "Delete",
      },
    },
  ];

  const changeViewState = (value) => {
    setSelectedRecord({ customerid: userDetails("companyid") });
    setViewState(value);
  };

  const changeAlertState = (obj) => {
    setAlert(obj);
  };

  useEffect(() => {
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      api
        .get(ITEM_BASE.LIST + "?restraurantid=" + userDetails("companyid"))
        .then((response) => {
          let { Resultset, Status } = response.data.data;
          setRecordList(Resultset);
          setTotalRecordCount(parseInt(Status));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewItemBase
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <ItemBaseDetails
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
export default Itembase;

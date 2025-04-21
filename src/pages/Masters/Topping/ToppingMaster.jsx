import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import DeleteForm from "../../../components/search/DeleteForm";
import AlertMessage from "../../../components/toast/AlertMessage";
import api from "../../../services/api";
import { TOPPING } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/ToppingUtils";
import ToppingDetails from "./ToppingDetails";
import ViewTopping from "./ViewTopping";
const ToppingMaster = ({ }) => {
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
    //debugger;
    if (isCanceled) setDeleteRecord({});
    else {
      let { customerid, idsize, reason } = values;
      let data = {
        customerid,
        reason,
        itemsizeid: idsize,
        userid: userDetails("userid"),
      };
      api
        .delete(
          TOPPING.DELETE +
          "?restraurantid=" +
          userDetails("companyid") +
          "&userid=" +
          userDetails("userid") +
          "&topingid=" +
          values.Topingid
        )
        .then((response) => {
          let { Status, Error } = response.data.data;
          let status = Status;
          if (response.data.data.Status === -2) {
            let message = Error.ErrorMessage;
            setAlert({ isDisplay: true, status, message });
          } else {
            if (Status === 1 || Status == 0) {
              if (response.data.data.Resultset !== undefined) {
                let message = response.data.data.Resultset.Message;
                setAlert({ isDisplay: true, status, message });
              } else {
                let message = response.data.data.Restultset.Message;
                setAlert({ isDisplay: true, status, message });
              }
            }
          }

          Status === 1 && setDeleteRecord({});
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
      //debugger;
      api
        .get(
          TOPPING.LOAD +
          "?restraurantid=" +
          userDetails("companyid") +
          "&userid=" +
          userDetails("userid")
        )
        .then((response) => {
          //let { data, totalrow } = response.data.data.Resultset;
          setRecordList(response.data.data.Resultset);
          setTotalRecordCount(parseInt(response.data.data.Resultset.length));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewTopping
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <ToppingDetails
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
export default ToppingMaster;

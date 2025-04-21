import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import ViewSpicy from "./ViewSpicy";
import { ITEM_SPICY } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import SpicyDetails from "./SpicyDetails";
import { columnList, searchInitValue } from "../../../utils/Master/SpicyUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";

const SpicyMaster = () => {
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
      api
        .delete(
          ITEM_SPICY.DELETE +
          "?restaurantid=" +
          userDetails("companyid") +
          "&spicyid=" +
          deleteRecord.Spicyid +
          "&createdby=" +
          userDetails("userid")
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
        .get(ITEM_SPICY.LIST + "?restaurantid=" + userDetails("companyid"))
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
          <ViewSpicy
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <SpicyDetails
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

export default SpicyMaster;

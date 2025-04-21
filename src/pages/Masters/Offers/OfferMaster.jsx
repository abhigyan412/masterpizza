import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import ViewOffer from "./ViewOffer";
import { OFFERS } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import OfferDetails from "./OfferDetails";
import { columnList, searchInitValue } from "../../../utils/Master/OffersUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";

const OfferMaster = () => {
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

  const removeRecords = (record) => {
    let data = { customerid: record.customerid, itemcode: record.itemcode };
    api
      .delete(`${OFFERS.DELETE}/${record.customerid}/${record.itemcode}`)
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
    //debugger;
    if (isCanceled) setDeleteRecord({});
    else {
      let { customerid, idsize, reason } = values;
      let data = {
        customerid,
        itemcode: 0,
      };
      api
        .delete(`${OFFERS.DELETE}/${data.customerid}/${data.itemcode}`)
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
    setSelectedRecord({ customerid: userDetails("companyid") });
    setViewState(value);
  };

  const changeAlertState = (obj) => {
    setAlert(obj);
  };

  useEffect(() => {
    //debugger;
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      let data = {
        customerid: userDetails("companyid"),
      };
      api
        .get(OFFERS.LOAD, { params: data })
        .then((response) => {
          setRecordList(response.data.data.resultset);
          setTotalRecordCount(parseInt(response.data.data.resultset.length));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);
  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewOffer
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <OfferDetails
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

export default OfferMaster;

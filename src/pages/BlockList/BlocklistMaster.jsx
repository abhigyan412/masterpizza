import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../services/api";
import ViewBlocklist from "./ViewBlocklist";
import { BLOCK_LIST } from "../../utils/ApiMethods";
import { reducer, userDetails } from "../../utils/Generic";
import BlocklistDetails from "./BlocklistDetails";
import {
  columnList,
  searchInitValue,
} from "../../utils/BlockList/BlocklistUtils";
import AlertMessage from "../../components/toast/AlertMessage";
import DeleteForm from "../../components/search/DeleteForm";

const BlocklistMaster = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    CustomerId: userDetails("companyid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});

  const removeRecords = (record) => {
    let data = {
      customerid: userDetails("companyid"),
      userid: userDetails("userid"),
      transId: record.idblock,
      block: 1,
    };
    api
      .post(BLOCK_LIST.DELETE, data)
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
        .post(BLOCK_LIST.LIST, data)
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

  useEffect(() => {
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      let data = {
        customerid: userDetails("companyid"),
        pageno: 1,
        pagesize: 1000,
      };
      api
        .post(BLOCK_LIST.LOAD, data)
        .then((response) => {
          let { resultset, totalrows } = response.data.data;
          setRecordList(resultset);
          setTotalRecordCount(parseInt(totalrows));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewBlocklist
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <BlocklistDetails
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

export default BlocklistMaster;

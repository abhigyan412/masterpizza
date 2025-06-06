import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import ViewItemSize from "./ViewItemSize";
import { ITEM_SIZE } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import ItemSizeDetails from "./ItemSizeDetails";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/ItemSizeUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";

const ItemSizeMaster = () => {
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
      let { customerid, idsize, reason } = values;
      let data = {
        customerid,
        reason,
        itemsizeid: idsize,
        userid: userDetails("userid"),
      };
      api
        .delete(ITEM_SIZE.DELETE, { data })
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
        .get(ITEM_SIZE.LOAD, { params: search })
        .then((response) => {
          let { data, totalrow } = response.data.data;
          setRecordList(data);
          setTotalRecordCount(parseInt(totalrow));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);
  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewItemSize
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <ItemSizeDetails
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

export default ItemSizeMaster;

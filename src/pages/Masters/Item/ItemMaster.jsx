import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import { ITEM_MASTER } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/ItemMasterUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import ViewItemMaster from "./ViewItemMaster";
import ItemDetails from "./ItemDetails";
import DeleteForm from "../../../components/search/DeleteForm";

const ItemMaster = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    customerid: userDetails("companyid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});
  const [weekList, setWeekList] = useState([]);

  const displayRecords = (record) => {
    setWeekList([]);
    setSelectedRecord(record);
    setViewState(false);
    api
      .get(ITEM_MASTER.LOADWEEK)
      .then((response) => {
        setWeekList(response.data.data.resultset);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayDelete = (record) => {
    setDeleteRecord(record);
  };

  const onDelete = (isCanceled, values) => {
    if (isCanceled) setDeleteRecord({});
    else {
      let { customerid, itemcode, reason } = values;
      let data = {
        customerid,
        reason,
        itemcode: itemcode,
        userid: userDetails("userid"),
      };
      api
        .delete(
          ITEM_MASTER.DELETE +
          "?customerid=" +
          customerid +
          "&reason=" +
          reason +
          "&itemcode=" +
          itemcode +
          "&userid=" +
          userDetails("userid")
        )
        .then((response) => {
          let { status, message } = response.data.data;
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
    setWeekList([]);
    setSelectedRecord({ customerid: userDetails("companyid") });
    setViewState(value);
    api
      .get(ITEM_MASTER.LOADWEEK)
      .then((response) => {
        setWeekList(response.data.data.resultset);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeAlertState = (obj) => {
    setAlert(obj);
  };
  const refreshPage = () => { };

  useEffect(() => {
    //debugger;
    // setWeekList([]);
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      api
        .post(ITEM_MASTER.LOAD, search)
        .then((response) => {
          let { data, totalrow } = response.data.data;
          let customData = data.map((items) => {
            return {
              ...items,
              sizeNameList: JSON.parse(items.size)
                .map((s) => s.sizename)
                .toString(),
            };
          });
          setRecordList(customData);
          setTotalRecordCount(parseInt(totalrow));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewItemMaster
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
            refreshPage={refreshPage}
          />
        ) : (
          <ItemDetails
            setViewState={setViewState}
            selectedRecord={selectedRecord}
            setAlert={changeAlertState}
            dayofweek={weekList}
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

export default ItemMaster;

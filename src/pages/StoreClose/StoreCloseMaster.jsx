import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../services/api";
import ViewStoreClose from "./ViewStoreClose";
import { STORE_CLOSE } from "../../utils/ApiMethods";
import { reducer, userDetails } from "../../utils/Generic";
import StoreCloseDetails from "./StoreCloseDetails";
import {
  columnList,
  searchInitValue,
} from "../../utils/StoreClose/StorecloseUtils";
import AlertMessage from "../../components/toast/AlertMessage";
import DeleteForm from "../../components/search/DeleteForm";
import Modal from "react-bootstrap/Modal";

const StoreCloseMaster = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    customerid: userDetails("companyid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});
  const [show, setShow] = useState(false);
  const [storemenuList, setStoremenuList] = useState([]);

  const displayRecords = (record) => {
    setSelectedRecord(record);
    setViewState(false);
  };

  const removeRecords = (record) => {
    let data = { customerid: record.customerid, transid: record.transid };
    api
      .post(STORE_CLOSE.DELETE, data)
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
        .post(STORE_CLOSE.DELETE, data)
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

  const viewMenudetails = (record) => {
    let params = {
      customerid: userDetails("companyid"),
      menuid: record.menuid,
    };
    api
      .post(STORE_CLOSE.GETSTORE_DETAILS, params)
      .then((response) => {
        setStoremenuList(response.data.data.resultset);
        setShow(true);
      })
      .catch((error) => console.log(error));
  };

  const actionItems = [
    {
      name: <FaIcons.FaRegEye />,
      clickEvent: viewMenudetails,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "View",
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
        .post(STORE_CLOSE.LOAD, search)
        .then((response) => {
          let { data } = response.data.data;
          setRecordList(response.data.data.resultset);
          setTotalRecordCount(parseInt(response.data.data.resultset.length));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  const handleClose = () => {
    setShow(false);
    setStoremenuList([]);
  };

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewStoreClose
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
          />
        ) : (
          <StoreCloseDetails
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

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            View Menu Details
          </h1>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-wrap modal-body"
          style={{ maxHeight: "70vh", overflow: "scroll" }}
        >
          <table className="table table-bordered table-hover">
            <thead>
              <th>SNo.</th>
              <th>Day Name</th>
              <th>Time Duration</th>
            </thead>
            <tbody>
              {storemenuList.map((data, i) => (
                <tr key={i}>
                  <td align="center">{data.sno}</td>
                  <td align="center">{data.dayname}</td>
                  <td align="center">{data.timeduration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <AlertMessage {...alert} setAlert={setAlert} />
    </>
  );
};

export default StoreCloseMaster;

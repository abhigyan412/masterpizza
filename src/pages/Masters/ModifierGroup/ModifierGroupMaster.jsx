import React, { useEffect, useReducer, useState } from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import { MODIFIER_GROUP } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import ModifierGroupDetails from "../ModifierGroup/ModifierGroupDetails";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/ModifierGroupUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";
import ViewModifierGroup from "./ViewModifierGroup";
import Modal from "react-bootstrap/Modal";

const ModifierGroupMaster = () => {
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    customerid: userDetails("companyid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});
  const [showContains, setShowContains] = useState(false);
  const [showModifier, setShowModifier] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [modifierList, setModifierList] = useState([]);

  const [filtereddata, setfiltereddata] = useState("");

  const displayRecords = (record) => {
    setSelectedRecord(record);
    setViewState(false);
  };

  const displayDelete = (record) => {
    setDeleteRecord(record);
  };

  const displayContains = (record) => {
    //debugger;
    let params = {
      customerid: userDetails("companyid"),
      groupid: record.groupid,
    };
    api
      .post(MODIFIER_GROUP.VIEWGROUP, params)
      .then((response) => {
        setGroupList(response.data.data.data);
        setShowContains(true);
      })
      .catch((error) => console.log(error));
  };
  const viewModifier = (record) => {
    //debugger;
    let params = {
      customerid: userDetails("companyid"),
      groupid: record.groupid,
    };
    api
      .post(MODIFIER_GROUP.VIEW, params)
      .then((response) => {
        setModifierList(response.data.data.data);
        setShowModifier(true);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = (isCanceled, values) => {
    if (isCanceled) setDeleteRecord({});
    else {
      let { customerid, idprice, reason } = values;
      let data = { customerid, reason, idprice, userid: userDetails("userid") };
      api
        .post(MODIFIER_GROUP.DELETE, data)
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
      name: <FaIcons.FaRegEye />,
      clickEvent: displayRecords,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "View Modifier",
      },
    },
    // {
    //   name: <FaIcons.FaTrash />,
    //   clickEvent: displayDelete,
    //   props: {
    //     className: "btn btn-danger btn-rounded btn-icon",
    //     title: "Delete",
    //   },
    // },
  ];

  const changeViewState = (value) => {
    setSelectedRecord({ customerid: userDetails("companyid") });
    setViewState(value);
  };

  const changeAlertState = (obj) => {
    setAlert(obj);
  };

  const handleClose = () => {
    setShowContains(false);
    setShowModifier(false);
    setGroupList([]);
    setModifierList([]);
  };

  useEffect(() => {
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      let params = {
        customerid: userDetails("companyid"),
      };
      api
        .get(MODIFIER_GROUP.LOAD, { params })
        .then((response) => {
          let { data, totalrow } = response.data.data;
          setRecordList(data);
          setTotalRecordCount(parseInt(totalrow));
        })
        .catch((error) => console.log(error));
    }
  }, [search, isViewState, deleteRecord]);

  const filterData = (item) => {
    setfiltereddata(item);
  };

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewModifierGroup
            setViewState={changeViewState}
            columns={columnList}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
            setData={filterData}
          />
        ) : (
          <ModifierGroupDetails
            setViewState={setViewState}
            selectedRecord={selectedRecord}
            setAlert={changeAlertState}
          />
        )
      ) : (
        // <DeleteForm
        //   selectedRecord={deleteRecord}
        //   columns={columnList}
        //   onDelete={onDelete}
        // />
        ""
      )}
      <div
        className="table-responsive"
        style={{ overflow: "auto", height: "370px" }}
        id="style-5"
      >
        <table className="table table-bordered">
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#fff",
              boxShadow: "0px -1px #dee2e6",
            }}
          >
            <tr>
              <th>SNo</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>Contains</th>
              <th>View Modifier</th>
            </tr>
          </thead>
          <tbody>
            {recordList.length > 0 ? (
              recordList
                .filter((stu) =>
                  stu.modifiername
                    .toLowerCase()
                    .includes(filtereddata.toLowerCase())
                )
                .map((items, index) => {
                  return (
                    <tr key={index}>
                      <td align="center">{index + 1}</td>
                      <td align="Left">{items.modifiername}</td>
                      <td align="center">
                        <div
                          style={{
                            backgroundColor: "#efefef",
                            width: "100px",
                          }}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              displayContains(items, index);
                            }}
                          >
                            {items.noofitems}&nbsp;
                            <span
                              style={{
                                fontSize: "13px",
                                cursor: "pointer",
                              }}
                            >
                              menu items
                            </span>
                          </span>
                        </div>
                      </td>
                      <td align="center">
                        {
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              viewModifier(items);
                            }}
                          >
                            View
                          </button>
                        }
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={4}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showContains}
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            View Contains
          </h1>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-wrap modal-body"
          style={{ maxHeight: "70vh", overflow: "scroll" }}
        >
          <table className="table table-bordered table-hover">
            <thead>
              <th>SNo.</th>
              <th>Item Name</th>
            </thead>
            <tbody>
              {groupList.map((data, i) => (
                <tr key={i}>
                  <td align="center">{data.sno}</td>
                  <td align="center">{data.itemname}</td>
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

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModifier}
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            View Modifier
          </h1>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-wrap modal-body"
          style={{ maxHeight: "70vh", overflow: "scroll" }}
        >
          <table className="table table-bordered table-hover">
            <thead>
              <th>SNo.</th>
              <th>Item Name</th>
            </thead>
            <tbody>
              {modifierList.map((data, i) => (
                <tr key={i}>
                  <td align="center">{data.sno}</td>
                  <td align="center">{data.itemname}</td>
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

export default ModifierGroupMaster;

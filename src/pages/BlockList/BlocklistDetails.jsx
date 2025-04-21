import React from "react";
import { useEffect, useReducer, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../components/generic/LayoutControls";
import api from "../../services/api";
import { BLOCK_LIST } from "../../utils/ApiMethods";
import { userDetails } from "../../utils/Generic";
import { reducer } from "../../utils/Generic";
import { searchInitValue } from "../../utils/BlockList/BlocklistUtils";
import DatePicker from "react-multi-date-picker";
import Modal from "react-bootstrap/Modal";

const BlocklistDetails = ({ setViewState, selectedRecord, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsizename: selectedRecord?.itemsize,
    },
  });
  const input = useRef(null);
  const [recordList, setRecordList] = useState([]);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [filtereddata, setfiltereddata] = useState("");
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  const [ddldate, setDdldate] = useState(new Date());
  const [sDate, setSDate] = useState("");
  const [blocklistItem, setBlocklistItem] = useState("");
  const [show, setShow] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  const handleadditems = () => {
    if (blockReason !== "") {
      let data = {
        customerid: userDetails("companyid"),
        userid: userDetails("userid"),
        contactnumber: blocklistItem.contactno,
        consumername: blocklistItem.consumername,
        isblock: 1,
        reason: blockReason,
      };
      api
        .post(BLOCK_LIST.ADD, data)
        .then((response) => {
          let { status, message } = response.data.data;
          setAlert({ isDisplay: true, status, message });
          setBlockReason("");
          setShow(false);
          // status === 1 && setViewState(true);
        })
        .catch((error) => console.log(error));
    } else {
      input.current.focus();
    }
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
    handleList();
  }, [search, sDate]);

  const handleList = () => {
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
    let data = {
      customerid: userDetails("companyid"),
      pageno: 1,
      pagesize: 1000,
      date: sDate == "" ? result : sDate,
      searchtext: filtereddata,
    };
    api
      .post(BLOCK_LIST.LIST, data)
      .then((response) => {
        let { resultset, totalrows } = response.data.data;
        setRecordList(resultset);
        setTotalRecordCount(parseInt(totalrows));
      })
      .catch((error) => console.log(error));
  };
  const handleShowPopup = (param) => {
    setBlocklistItem(param);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <LayoutControls
          // title={`${
          //   selectedRecord && selectedRecord.idsize ? "Update" : "Create"
          // } Item Size Details`}
          title="Add Block"
        />
        <DatePicker
          placeholder="Select Date"
          format="MM-DD-YYYY"
          zIndex={10000}
          calendarPosition="bottom"
          style={{
            paddingLeft: "0.8rem",
            width: "12rem",
            height: "40px",
          }}
          value={ddldate}
          onChange={setDDldate}
        />
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          style={{ width: "250px" }}
          onChange={(event) => {
            setfiltereddata(event.target.value);
          }}
          value={filtereddata}
        />
        <button
          type="submit"
          className="btn btn-outline-primary"
          onClick={handleList}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={() => setViewState(true)}
        >
          Close
        </button>
      </div>
      <hr />
      <div className="page-layout row">
        <fieldset>
          <div
            id="style-5"
            className="table-responsive"
            style={{ overflow: "auto", height: "370px" }}
          >
            <table className="table table-bordered table-hover">
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  height: "40px",
                  background: "#fff",
                  boxShadow: "0px -1px #dee2e6",
                }}
              >
                <th>SNo</th>
                <th>Consumer Name</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Status</th>
                <th>No of Items</th>
                <th>Amount</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
                <th>Delivery Time</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {totalRecordCount > 0 ? (
                  recordList.map((data, i) => (
                    <tr key={i}>
                      <td align="center">{data.sno}</td>
                      <td align="center">{data.consumername}</td>
                      <td align="center">{data.contactno}</td>
                      <td align="center">{data.orderdate}</td>
                      <td align="center">{data.orderstatus}</td>
                      <td align="center">{data.noofitems}</td>
                      <td align="center">{data.amount}</td>
                      <td align="center">{data.taxamount}</td>
                      <td align="center">{data.totalamount}</td>
                      <td align="center">{data.deliverytime}</td>
                      <td align="center">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleShowPopup(data)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} align="center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
      <Modal show={show}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Enter Reason To Block
          </h1>
        </div>

        <div className="modal-body">
          <textarea
            className="form-control overflow-auto"
            placeholder="Text here..."
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(event) => setBlockReason(event.target.value)}
            value={blockReason}
            ref={input}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => {
              handleClose();
              setBlockReason("");
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleadditems}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlocklistDetails;

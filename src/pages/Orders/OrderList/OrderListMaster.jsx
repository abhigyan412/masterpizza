import React, {
  useEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
} from "react";
import * as FaIcons from "react-icons/fa";
import api from "../../../services/api";
import ViewOrderListSize from "./ViewOrderListSize";
import { ORDERS_LIST } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import OrderListDetails from "./OrderListDetails";
import {
  columnList,
  searchInitValue,
} from "../../../utils/Master/OrderListUtils";
import AlertMessage from "../../../components/toast/AlertMessage";
import DeleteForm from "../../../components/search/DeleteForm";
import Notifyaudio from "./notification.mp3";
import DatePicker, { DateObject } from "react-multi-date-picker";

const OrderListMaster = () => {
  const printableAreaRef = useRef();
  const [isViewState, setViewState] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({
    CustomerId: userDetails("customerid"),
  });
  const [totalRecordCount, setTotalRecordCount] = useState(1);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [alert, setAlert] = useState({ isDisplay: false });
  const [deleteRecord, setDeleteRecord] = useState({});
  const [orderId, setOrderId] = useState(0);
  const [OAmount, setOAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [contactno, setContactno] = useState("");
  const [orderdate, setOrderdate] = useState("");
  const [ordertime, setOrdertime] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [rowcount, setRowcount] = useState(0);

  const [ddldate, setDdldate] = useState(new Date());
  const [orderstatus, setOrderstatus] = useState("");
  const [sDate, setSDate] = useState("");
  const [reload, setReload] = useState(0);

  const displayRecords = (record) => {
    //debugger;
    setOrderId(record.orderid);
    setCustomerName(record.consumername);
    setSelectedRecord(record);
    setOAmount(record.totalamount);
    setViewState(false);
  };
  const printOrder = (record) => {
    setOrderId(record.orderid);
    setCustomerName(record.consumername);
    setContactno(record.contactno);
    setOrderdate(record.orderdate);
    setOAmount(record.totalamount);
    setOrdertime(record.ordertime);
    api
      .get(ORDERS_LIST.VIEW + search.customerid + "&OrderNo=" + record.orderid)
      .then((response) => {
        setOrderList(response.data.data.resultset);
        setTimeout(() => {
          const printinfo = window.open();
          if (printableAreaRef.current?.innerHTML) {
            printinfo?.document.write(printableAreaRef.current.innerHTML);
            printinfo?.print();
          }
          printinfo?.close();
        }, 100);
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
        .post(ORDERS_LIST.LIST, data)
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
  const orderStatus = [
    { value: "1", name: "New" },
    { value: "2", name: "Processing" },
    { value: "3", name: "Completed" },
  ];
  const actionItems = [
    {
      name: <FaIcons.FaRegEye />,
      clickEvent: displayRecords,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "View",
      },
    },
    {
      name: <FaIcons.FaPrint style={{ color: "#fff" }} />,
      clickEvent: printOrder,
      props: {
        className: "btn btn-success btn-rounded btn-icon",
        title: "Print",
      },
    },
  ];

  const changeViewState = (value) => {
    setSelectedRecord({ CustomerId: userDetails("customerid") });
    setViewState(value);
  };

  const changeAlertState = (obj) => {
    setAlert(obj);
  };

  useEffect(() => {
    if (isViewState && Object.keys(deleteRecord).length === 0) {
      loadgrid();
    }
  }, [search, isViewState, deleteRecord, sDate, orderstatus, reload]);

  const loadgrid = () => {
    let params = {
      customerid: search.customerid,
      orderdate: sDate,
      orderstatus: orderstatus,
    };
    api
      .post(ORDERS_LIST.LIST, params)
      .then((response) => {
        let { data, totalrow } = response.data.data;
        setRecordList(response.data.data.resultset);
        // if (rowcount !== 0 && rowcount < response.data.data.resultset.length) {
        //   var audplay = new Audio(Notifyaudio);
        //   audplay.play();
        // }
        setTotalRecordCount(parseInt(totalrow));
        setRowcount(response.data.data.resultset.length);
      })
      .catch((error) => console.log(error));
  };

  const Orderstatusval = (ddlval) => {
    setOrderstatus(ddlval);
  };

  const setSSDate = (dateval) => {
    setSDate(dateval);
  };

  const clearvalue = useCallback(() => {
    loadgrid();
  }, [sDate, orderstatus]);

  const autoRefresh = (intervalid) => {
    clearInterval(intervalid);
    setOrderstatus("");
    setSDate(new Date().toISOString().substring(0, 10));
    setReload();
  };

  return (
    <>
      {Object.keys(deleteRecord).length === 0 ? (
        isViewState ? (
          <ViewOrderListSize
            setViewState={changeViewState}
            columns={columnList}
            orderStatus={orderStatus}
            actionItems={actionItems}
            recordList={recordList}
            pageDetails={search}
            totalRecordCount={totalRecordCount}
            changeRecordList={dispatch}
            setautoRefresh={autoRefresh}
            refreshPage={loadgrid}
            onLoadrefresh={autoRefresh}
            setOrderddl={Orderstatusval}
            setSSDate={setSSDate}
            onSubmit={clearvalue}
          />
        ) : (
          <OrderListDetails
            setViewState={setViewState}
            selectedRecord={selectedRecord}
            orderId={orderId}
            customerName={customerName}
            Amount={OAmount}
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

      <div
        className="table-responsive b-0"
        data-pattern="priority-columns"
        ref={printableAreaRef}
        style={{ display: "none" }}
      >
        <div style={{ width: "100%", maxWidth: "15rem" }}>
          <h2
            style={{
              letterSpacing: "4px",
              lineHeight: "10px",
              wordWrap: "break-word",
            }}
          >
            ***************
          </h2>
          {/* <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            fontWeight: "500",
            fontFamily: "sans-serif",
            letterSpacing: "2px",
          }}
        >
          CASH RECEIPT
        </h2> */}
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "500",
              fontSize: "14px",
              fontFamily: "sans-serif",
              letterSpacing: "2px",
            }}
          >
            OrderID : {orderId}
          </h2>
          <h2
            style={{
              letterSpacing: "4px",
              lineHeight: "10px",
              wordWrap: "break-word",
            }}
          >
            ***************
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "14px",
              fontFamily: "sans-serif",
            }}
          >
            <span>{customerName}</span>
            <span>{contactno}</span>
            <span>
              {orderdate}&nbsp;&nbsp;&nbsp;&nbsp;{ordertime}
            </span>
          </div>
          <h2
            style={{
              letterSpacing: "4px",
              lineHeight: "10px",
              wordWrap: "break-word",
            }}
          >
            --------------------
          </h2>

          <table
            style={{
              fontSize: "22px",
              fontFamily: "sans-serif",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  ITEM NAME
                </th>
                <th
                  style={{
                    textAlign: "right",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  QUANTITY
                </th>
                {/* <th
                  style={{
                    textAlign: "right",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  RATE
                </th> */}
                {/* <th
                  style={{
                    textAlign: "right",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  AMOUNT
                </th> */}
              </tr>
            </thead>
            <tbody>
              {orderList.map((info, key) => (
                <tr key={key}>
                  <td
                    style={{
                      wordWrap: "break-word",
                      minWidth: "9rem",
                      fontSize: "12px",
                      paddingLeft: "8px",
                      paddingTop: "2px",
                    }}
                  >
                    {info.itemname}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    {info.qty}
                  </td>
                  {/* <td
                    style={{
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    {info.amount}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    ${info.totalamount}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          <h2
            style={{
              letterSpacing: "4px",
              lineHeight: "10px",
              wordWrap: "break-word",
            }}
          >
            --------------------
          </h2>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                fontWeight: "lighter",
                fontFamily: "sans-serif",
              }}
            >
              TOTAL AMOUNT
            </h2>
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "sans-serif",
                paddingRight: "37px",
              }}
            >
              ${OAmount}
            </h2>
          </div> */}
        </div>
      </div>
      <AlertMessage {...alert} setAlert={setAlert} />
    </>
  );
};

export default OrderListMaster;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as TiIcons from "react-icons/ti";
import TablePagination from "./TablePagination";
import api from "../../services/api";
import { userDetails } from "../../utils/Generic";
import { ORDERS_LIST } from "../../utils/ApiMethods";
import AlertMessage from "../../components/toast/AlertMessage";

const ViewDataTable = ({
  columns,
  data,
  orderStatus,
  actionItems,
  noofRecords,
  pageDetails,
  changeRecordList,
  ddlval,
  searchval,
  dateval,
  autoRefresh,
  refreshPage,
}) => {
  const [colSpanValue, setColSpanValue] = useState(1);
  const [alert, setAlert] = useState({ isDisplay: false });
  const [updatetime, setUpdatetime] = useState(0);
  const [selectedindex, setSelectedIndex] = useState(-1);
  const [temporderid, setTemporderid] = useState(0);
  const [isFirst, setIsfirst] = useState(false);
  const buttonStyle = {
    cursor: "pointer",
    height: "25px",
    width: "25px",
    color: "green",
  };
  const updateStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "130px",
  };
  // FILTERATION
  if (orderStatus) {
    // if (ddlval != 0)
    //   data = data.filter((stu) =>
    //     stu.orderstatus.toLowerCase().includes(ddlval.toLowerCase())
    //   );
    data = data.filter(
      (namesearch) =>
        namesearch.consumername
          .toLowerCase()
          .includes(searchval.toLowerCase()) ||
        namesearch.contactno.toLowerCase().includes(searchval.toLowerCase())
    );
    // if (dateval != "")
    //   data = data.filter((date) => date.orderdate.includes(dateval));
  }

  useEffect(() => {
    if (orderStatus) {
      if (isFirst) refresh();
      else setIsfirst(true);
    }
    setColSpanValue(columns.length + (actionItems ? 1 : 0));
  }, [columns, actionItems, orderStatus]);

  const refresh = () => {
    var intervalid = setInterval(() => {
      autoRefresh(intervalid);
    }, 60000);
  };

  // UPDATE ORDERSTATUS
  const handleUpdateorder = (event, params) => {
    let orderlist = {
      customerid: userDetails("companyid"),
      orderid: params.orderid,
      userid: userDetails("userid"),
      status: event.target.value,
    };
    let methodName = ORDERS_LIST.STATUS;
    api
      .post(methodName, orderlist)
      .then((response) => {
        console.log("response: ", response);
        let { status, message } = response.data.data;
        console.log("response.data.data: ", response.data.data);
        setAlert({ isDisplay: true, status, message });
        refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleIncrement = (params) => {
    if (temporderid != params.orderid) {
      setUpdatetime(params.deliverytime);
    } else {
      if (updatetime >= 0) {
        setUpdatetime(updatetime + 5);
      }
    }
  };
  const handleDecrement = (params) => {
    if (temporderid != params.orderid) {
      setUpdatetime(params.deliverytime);
    } else {
      if (updatetime > 0) {
        setUpdatetime(updatetime - 5);
      }
    }
  };
  // UPDATE ORDERTIME
  const handleUpdatetime = (params) => {
    let ordertime = {
      customerid: userDetails("companyid"),
      orderid: params.orderid,
      userid: userDetails("userid"),
      status: updatetime.toString(),
    };
    let methodName = ORDERS_LIST.TIME;
    api
      .post(methodName, ordertime)
      .then((response) => {
        console.log("response: ", response);
        let { status, message } = response.data.data;
        console.log("response.data.data: ", response.data.data);
        setAlert({ isDisplay: true, status, message });
      })
      .catch((error) => {
        console.log(error);
      });
    setSelectedIndex(-1);
  };

  return (
    <div
      className="table-responsive"
      style={{ overflow: "auto", height: "calc(100vh - 250px)" }}
      id="style-5"
    >
      <input
        type="text"
        readOnly
        value={temporderid}
        style={{ display: "none" }}
      />
      <table className="table table-bordered table-hover">
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#fff",
            boxShadow: "0px -1px #dee2e6",
          }}
        >
          <tr>
            {orderStatus && <th>SNo</th>}
            {columns.map((names, index) => {
              return (
                <th
                  key={index}
                  className={names.className}
                  style={{
                    minWidth:
                      names.displayName === "Date"
                        ? "98px"
                        : names.displayName === "Time"
                        ? "108px"
                        : "",
                  }}
                >
                  {names.displayName}
                </th>
              );
            })}
            {orderStatus && <th>Status</th>}
            {orderStatus && <th>Delivery time</th>}
            {actionItems && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((items, index) => {
              return (
                <tr key={index}>
                  {orderStatus && <td>{index + 1}</td>}
                  {columns.map((dataProp, i) => {
                    return (
                      <td key={i} className={dataProp.className}>
                        {items[dataProp.propName]}
                      </td>
                    );
                  })}

                  {orderStatus &&
                    (ddlval != 0 ? (
                      <td>
                        <select
                          style={{
                            minWidth: "105px",
                            color:
                              items.orderstatus === "3"
                                ? "rgb(242 44 64)"
                                : items.orderstatus === "2"
                                ? "blue"
                                : items.orderstatus === "1"
                                ? "green"
                                : "",
                          }}
                          className="form-control"
                          onChange={(event) => {
                            handleUpdateorder(event, items);
                          }}
                          defaultValue={items.orderstatus}
                          value={items.orderstatus}
                        >
                          {orderStatus.map((e, index) => {
                            return (
                              <option key={index} value={e.value}>
                                {e.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    ) : (
                      <td>
                        <select
                          style={{
                            minWidth: "105px",
                            color:
                              items.orderstatus === "3"
                                ? "rgb(242 44 64)"
                                : items.orderstatus === "2"
                                ? "blue"
                                : items.orderstatus === "1"
                                ? "green"
                                : "",
                          }}
                          className="form-control"
                          onChange={(event) => {
                            handleUpdateorder(event, items);
                          }}
                          defaultValue={items.orderstatus}
                          value={items.orderstatus}
                        >
                          {orderStatus.map((e, index) => {
                            return (
                              <option key={index} value={e.value}>
                                {e.name}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    ))}
                  {orderStatus && (
                    <td>
                      <div style={updateStyle}>
                        <FaIcons.FaMinus
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setTemporderid(items.orderid);
                            setSelectedIndex(index);
                            handleDecrement(items);
                          }}
                        />
                        &nbsp;&nbsp;
                        {selectedindex == index ? (
                          <input
                            style={{ maxWidth: "50px", textAlign: "center" }}
                            type="text"
                            disabled
                            className="form-control"
                            value={updatetime}
                          />
                        ) : (
                          <input
                            style={{ maxWidth: "50px", textAlign: "center" }}
                            disabled
                            type="text"
                            className="form-control"
                            defaultValue={items.deliverytime}
                          />
                        )}
                        &nbsp;&nbsp;
                        <FaIcons.FaPlus
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setTemporderid(items.orderid);
                            setSelectedIndex(index);
                            handleIncrement(items);
                          }}
                        />
                        &nbsp;&nbsp;
                        {selectedindex == index && (
                          <TiIcons.TiTickOutline
                            title="set time"
                            style={buttonStyle}
                            onClick={() => {
                              handleUpdatetime(items);
                            }}
                          />
                        )}
                      </div>
                    </td>
                  )}
                  {actionItems && (
                    <td className="d-flex justify-content-center">
                      {actionItems.map((action, index) => {
                        return (
                          <Link
                            to="#"
                            key={index}
                            {...action.props}
                            onClick={() => action.clickEvent(items)}
                          >
                            {action.name}
                          </Link>
                        );
                      })}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={orderStatus ? 10 : colSpanValue}>
                No records found
              </td>
            </tr>
          )}
        </tbody>

        {data && (
          <tfoot>
            <tr>
              {orderStatus ? (
                <td colSpan={11}>
                  <TablePagination
                    totalRecords={noofRecords}
                    pageDetails={pageDetails}
                    changeRecordList={changeRecordList}
                  />
                </td>
              ) : (
                <td colSpan={colSpanValue}>
                  <TablePagination
                    totalRecords={noofRecords}
                    pageDetails={pageDetails}
                    changeRecordList={changeRecordList}
                  />
                </td>
              )}
            </tr>
          </tfoot>
        )}
      </table>
      <AlertMessage {...alert} setAlert={setAlert} />
    </div>
  );
};

export default ViewDataTable;

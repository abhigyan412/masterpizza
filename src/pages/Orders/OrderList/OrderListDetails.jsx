import React from "react";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ORDERS_LIST } from "../../../utils/ApiMethods";
import { reducer } from "../../../utils/Generic";
import { searchInitValue } from "../../../utils/Master/OrderListUtils";

const OrderListDetails = ({
  setViewState,
  selectedRecord,
  setAlert,
  orderId,
  customerName,
  Amount,
}) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsizename: selectedRecord?.itemsize,
    },
  });

  // const onSave = (values) => {
  //   let { idsize, customerid } = selectedRecord;
  //   let data = {
  //     customerid,
  //     itemsize: values.itemsizename,
  //     userid: userDetails("userid"),
  //   };
  //   let methodName = ITEM_SIZE.ADD;
  //   if (selectedRecord && selectedRecord.idsize) {
  //     data = {
  //       customerid,
  //       itemsizeid: idsize,
  //       sizename: values.itemsizename,
  //       userid: userDetails("userid"),
  //     };
  //     methodName = ITEM_SIZE.EDIT;
  //   }

  //   api
  //     .post(methodName, data)
  //     .then((response) => {
  //       let { status, message } = response.data.data.data[0];
  //       setAlert({ isDisplay: true, status, message });
  //       status === 1 && setViewState(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const [recordList, setRecordList] = useState([]);
  const [search, dispatch] = useReducer(reducer, searchInitValue());

  useEffect(() => {
    api
      .get(ORDERS_LIST.VIEW + search.customerid + "&OrderNo=" + orderId)
      .then((response) => {
        let { data, totalrow } = response.data.data;
        setRecordList(response.data.data.resultset);
        // setTotalRecordCount(parseInt(totalrow));
      })
      .catch((error) => console.log(error));
  }, [search]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        style={{ float: "right" }}
        onClick={() => setViewState(true)}
      >
        Cancel
      </button>
      <LayoutControls
        // title={`${
        //   selectedRecord && selectedRecord.idsize ? "Update" : "Create"
        // } Item Size Details`}
        title="View order details"
      />
      <hr />
      <div className="page-layout row">
        <fieldset>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="ItemSizeName" className="form-label mt-2">
              <b> Customer Name : </b> {customerName}
            </label>

            <label htmlFor="ItemSizeName" className="form-label mt-2">
              <b> Order No : </b>
              {orderId}
            </label>

            <label htmlFor="ItemSizeName" className="form-label mt-2">
              <b> Total Amount : </b>
              {Amount}
            </label>
          </div>
          <div
            className="table-responsive"
            style={{ overflow: "auto", height: "330px" }}
            id="style-5"
          >
            <table className="table table-bordered table-hover">
              <thead>
                <th>SNo.</th>
                {/* <th>Orderid</th> */}
                <th>Item Name</th>
                {/* <th>SerialNo.</th> */}
                <th>Size</th>
                <th>Remarks</th>
                <th>Quantity</th>
                <th>Unit Rate</th>
                <th>Item Amount</th>
              </thead>
              <tbody>
                {recordList.map((data, i) => (
                  <tr key={i}>
                    <td align="center">{data.sno}</td>
                    {/* <td align="center">{orderId}</td> */}
                    <td align="center">{data.itemname}</td>
                    {/* <td align="center">{data.serialno}</td> */}
                    <td align="center">{data.sizename}</td>
                    <td align="center">{data.remarks}</td>
                    {/* <td align="center">
                      {data.remarks.includes("~ spicy level 0")
                        ? data.remarks.replace("~ spicy level 0", "")
                        : data.remarks.includes("spicy level 0")
                        ? data.remarks.replace("spicy level 0", "")
                        : data.remarks.includes("spicy level 1")
                        ? data.remarks.replace("spicy level 1", "")
                        : data.remarks.includes("spicy level 2")
                        ? data.remarks.replace("spicy level 2", "")
                        : data.remarks.includes("spicy level 3")
                        ? data.remarks.replace("spicy level 3", "")
                        : data.remarks}
                    </td> */}
                    <td align="center">{data.qty}</td>
                    <td align="center">{data.amount}</td>
                    <td align="center">{data.totalamount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="form-group mt-3">
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: "right" }}
              onClick={() => setViewState(true)}
            >
              Close
            </button>
          </div> */}
        </fieldset>
      </div>
    </div>
  );
};

export default OrderListDetails;

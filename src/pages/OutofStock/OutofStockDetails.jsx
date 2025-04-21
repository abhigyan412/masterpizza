import React from "react";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../components/generic/LayoutControls";
import api from "../../services/api";
import { OUT_OF_STOCK } from "../../utils/ApiMethods";
import { userDetails } from "../../utils/Generic";
import { reducer } from "../../utils/Generic";
import { searchInitValue } from "../../utils/OutofStock/OutofStockUtils";

const OutofStockDetails = ({ setViewState, selectedRecord, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsizename: selectedRecord?.itemsize,
    },
  });
  const [recordList, setRecordList] = useState([]);
  const [search, dispatch] = useReducer(reducer, searchInitValue());
  const [filtereddata, setfiltereddata] = useState("");
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  useEffect(() => {
    let data = { customerid: userDetails("companyid") };
    api
      .post(OUT_OF_STOCK.LIST, data)
      .then((response) => {
        setRecordList(response.data.data.data);
        setTotalRecordCount(response.data.data.data.length);
      })
      .catch((error) => console.log(error));
  }, [search]);

  const refreshPage = () => {
    let data = { customerid: userDetails("companyid") };
    api
      .post(OUT_OF_STOCK.LIST, data)
      .then((response) => {
        setRecordList(response.data.data.data);
        setTotalRecordCount(response.data.data.data.length);
      })
      .catch((error) => console.log(error));
  };

  const handleadditems = (params) => {
    let data = {
      customerid: userDetails("companyid"),
      itemcode: params.itemcode,
      itemsize: params.itemsize,
      stockdate: "15/10/2022",
      userid: userDetails("userid"),
    };
    api
      .post(OUT_OF_STOCK.ADD, data)
      .then((response) => {
        let { status, message } = response.data.data;
        setAlert({ isDisplay: true, status, message });
        refreshPage();
        // status === 1 && setViewState(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <LayoutControls
          // title={`${
          //   selectedRecord && selectedRecord.idsize ? "Update" : "Create"
          // } Item Size Details`}
          title="Add Items"
        />
        <input
          type="text"
          placeholder="Search items"
          className="form-control"
          style={{ width: "250px", marginLeft: "30rem" }}
          onChange={(event) => {
            setfiltereddata(event.target.value);
          }}
          value={filtereddata}
        />
        <button
          type="button"
          className="btn btn-danger"
          style={{ float: "right" }}
          onClick={() => {
            setViewState(true);
          }}
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
            style={{ overflow: "auto", height: "370px", overflowX: "hidden" }}
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
                <th>Item Name</th>
                <th>Item Desc</th>
                <th>Size Name</th>
                <th>Item Type</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {totalRecordCount > 0 ? (
                  recordList
                    .filter((stu) =>
                      stu.itemname
                        .toLowerCase()
                        .includes(filtereddata.toLowerCase())
                    )
                    .map((data, i) => (
                      <tr key={i}>
                        <td align="center">{data.sno}</td>
                        <td align="center">{data.itemname}</td>
                        <td
                          align="center"
                          style={{
                            wordWrap: "break-word",
                            maxWidth: "250px",
                          }}
                        >
                          {data.itemdescription}
                        </td>
                        <td
                          align="center"
                          style={{
                            wordWrap: "break-word",
                            maxWidth: "160px",
                          }}
                        >
                          {data.sizename}
                        </td>
                        <td
                          align="center"
                          style={{
                            wordWrap: "break-word",
                            maxWidth: "160px",
                          }}
                        >
                          {data.itemtype}
                        </td>
                        <td align="center">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleadditems(data)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6} align="center">
                      No records found
                    </td>
                  </tr>
                )}
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

export default OutofStockDetails;

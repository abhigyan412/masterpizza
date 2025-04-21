import React from "react";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_OF_THE_DAY } from "../../../utils/ApiMethods";
import { ITEM_MASTER } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import { reducer } from "../../../utils/Generic";
import { searchInitValue } from "../../../utils/ItemManagement/ItemofthedayUtils";

const IODDetails = ({ setViewState, selectedRecord, setAlert }) => {
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

  const handleadditems = (params) => {
    let data = {
      customerid: userDetails("companyid"),
      userid: userDetails("userid"),
      itemcode: params.itemcode,
      starttime: "",
    };
    api
      .post(ITEM_OF_THE_DAY.ADD, data)
      .then((response) => {
        let { status, message } = response.data.data;
        setAlert({ isDisplay: true, status, message });
        // status === 1 && setViewState(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
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
  }, [search]);
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
          title="Add Item Of The Day"
        />
        <input
          type="text"
          placeholder="Search items"
          className="form-control"
          style={{ width: "250px", marginLeft: "26rem" }}
          onChange={(event) => {
            setfiltereddata(event.target.value);
          }}
          value={filtereddata}
        />
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
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Desc</th>
                <th>Item Type</th>
                <th>Category</th>
                <th>Item Size</th>
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
                        <td align="center">{data.itemcode}</td>
                        <td align="center">{data.itemname}</td>
                        <td align="center">{data.itemdescription}</td>
                        <td
                          align="center"
                          style={{
                            wordWrap: "break-word",
                            minWidth: "160px",
                            maxWidth: "160px",
                          }}
                        >
                          {data.type}
                        </td>
                        <td align="center">{data.category}</td>
                        <td
                          align="center"
                          style={{
                            wordWrap: "break-word",
                            minWidth: "160px",
                            maxWidth: "160px",
                          }}
                        >
                          {data.sizeNameList}
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
                    <td colSpan={9} align="center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default IODDetails;

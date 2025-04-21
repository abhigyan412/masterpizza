import React from "react";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { MODIFIER_GROUP } from "../../../utils/ApiMethods";
import { reducer, userDetails } from "../../../utils/Generic";
import { searchInitValue } from "../../../utils/Master/ModifierGroupUtils";

const ModifierGroupDetails = ({ setViewState, selectedRecord }) => {
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

  useEffect(() => {
    // let params = {
    //   customerid: userDetails("companyid"),
    //   groupid: setGroupid,
    // };
    // api
    //   .post(MODIFIER_GROUP.VIEW, params)
    //   .then((response) => {
    //     setRecordList(response.data.data.data);
    //     // setTotalRecordCount(parseInt(totalrow));
    //   })
    //   .catch((error) => console.log(error));
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
        title="View Modifier Group"
      />
      <hr />
      <div className="page-layout row">
        <fieldset>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          ></div>
          <div
            className="table-responsive"
            style={{ overflow: "auto", height: "330px" }}
            id="style-5"
          >
            <table className="table table-bordered table-hover">
              <thead>
                <th>SNo.</th>
                <th>Item Name</th>
                <th>Item price</th>
                {/* <th>Action</th> */}
              </thead>
              <tbody>
                {recordList.map((data, i) => (
                  <tr key={i}>
                    <td align="center">{data.sno}</td>
                    <td align="center">{data.itemname}</td>
                    <td align="center">{data.itemprice}</td>
                    {/* <td align="center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onViewGroup(data)}
                      >
                        View
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default ModifierGroupDetails;

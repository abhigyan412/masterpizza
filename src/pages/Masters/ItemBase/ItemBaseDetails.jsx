import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_BASE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import { searchInitValue as masterParams } from "../../../utils/Master/ItemMasterUtils";
import { searchInitValue as sizeParams } from "../../../utils/Master/ItemSizeUtils";

const ItemBaseDetails = ({ setViewState, selectedRecord, setAlert }) => {
  const [items, setItems] = useState([]);
  const [itemSizeList, setItemSizeList] = useState([]);
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      basename: selectedRecord?.Basename,
      basecode: selectedRecord.Basecode,
    },
  });

  useEffect(() => { }, []);

  useEffect(() => {
    // setValue("itemcode", selectedRecord?.itemid);
    // setValue("itemsizeid", selectedRecord?.itemsizeid);
  }, [selectedRecord, setValue, items, itemSizeList]);

  const onSave = (values) => {
    let { idprice, customerid } = selectedRecord;

    let data = {
      restaurantid: selectedRecord.customerid,
      baseid: 0,
      basename: values.basename,
      basecode: values.basecode,
      createdby: userDetails("userid"),
      operationtype: 1,
    };
    let methodName = ITEM_BASE.ADD;

    if (selectedRecord && selectedRecord.Baseid > 0) {
      data = {
        restaurantid: userDetails("companyid"),
        baseid: selectedRecord.Baseid,
        basename: values.basename,
        basecode: values.basecode,
        createdby: userDetails("userid"),
        operationtype: 2,
      };
      methodName = ITEM_BASE.UPDATE;
      api
        .put(methodName, data)
        .then((response) => {
          console.log("Response", response);
          let status = response.data.data.Resultset.Status;
          let message = response.data.data.Resultset.Message;
          setAlert({ isDisplay: true, status, message });
          status === 1 && setViewState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .post(methodName, data)
        .then((response) => {
          console.log("Response", response);
          let status = response.data.data.Resultset.Status;
          let message = response.data.data.Resultset.Message;
          setAlert({ isDisplay: true, status, message });
          status === 1 && setViewState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.Baseid ? "Update" : "Create"
          } Item Base`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="BaseName" className="form-label mt-4">
                Base Name
              </label>
              <input
                type="text"
                className="form-control"
                id="BaseName"
                autoComplete="off"
                {...register("basename", {
                  required: "Please enter the base name.",
                  //   pattern: {
                  //     value: /^[\d]*\.?[\d]{0,2}$/,
                  //     message: "Please Enter only numbers",
                  //   },
                })}
              />
              {errors["basename"] && (
                <span className="text-danger">
                  {errors["basename"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="BaseCode" className="form-label mt-4">
                Base Code
              </label>
              <input
                type="text"
                className="form-control"
                id="BaseCode"
                autoComplete="off"
                {...register("basecode", {
                  required: "Please enter the base code.",
                  //   pattern: {
                  //     value: /^[\d]*\.?[\d]{0,2}$/,
                  //     message: "Please Enter only numbers",
                  //   },
                })}
              />
              {errors["basecode"] && (
                <span className="text-danger">
                  {errors["basecode"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.idprice ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setViewState(true)}
              >
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ItemBaseDetails;

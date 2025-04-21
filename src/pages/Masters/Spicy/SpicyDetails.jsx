import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_SPICY } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";

const SpicyDetails = ({ setViewState, selectedRecord, setAlert }) => {
  const [items, setItems] = useState([]);
  const [itemSizeList, setItemSizeList] = useState([]);
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      spicyname: selectedRecord?.Spicyname,
    },
  });

  useEffect(() => { }, [selectedRecord, setValue, items, itemSizeList]);

  const onSave = (values) => {
    let data = {
      restaurantid: selectedRecord.customerid,
      spicyid: 0,
      spicyname: values.spicyname,
      createdby: userDetails("userid"),
      type: 1,
    };
    let methodName = ITEM_SPICY.ADD;

    if (selectedRecord && selectedRecord.Spicyid > 0) {
      data = {
        restaurantid: userDetails("companyid"),
        spicyid: selectedRecord.Spicyid,
        spicyname: values.spicyname,
        createdby: userDetails("userid"),
        type: 2,
      };
      methodName = ITEM_SPICY.UPDATE;
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
        title={`${selectedRecord && selectedRecord.Spicyid ? "Update" : "Create"
          } Spicy`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="SpicyName" className="form-label mt-4">
                Spicy Name
              </label>
              <input
                type="text"
                className="form-control"
                id="SpicyName"
                autoComplete="off"
                {...register("spicyname", {
                  required: "Please enter the spicy name.",
                })}
              />
              {errors["spicyname"] && (
                <span className="text-danger">
                  {errors["spicyname"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.Spicyid ? "Update" : "Save"}
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

export default SpicyDetails;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_SIZE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";

const ItemSizeDetails = ({ setViewState, selectedRecord, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemsizename: selectedRecord?.itemsize,
    },
  });

  const [hideagent, setHideAgent] = useState(
    selectedRecord?.hideagent === 1 ? 1 : 0
  );

  const onSave = (values) => {
    let { idsize, customerid } = selectedRecord;
    let data = {
      customerid,
      itemsize: values.itemsizename,
      hideagent: hideagent,
      userid: userDetails("userid"),
    };
    let methodName = ITEM_SIZE.ADD;
    if (selectedRecord && selectedRecord.idsize) {
      data = {
        customerid,
        itemsizeid: idsize,
        sizename: values.itemsizename,
        hideagent: hideagent,
        userid: userDetails("userid"),
      };
      methodName = ITEM_SIZE.EDIT;
    }

    api
      .post(methodName, data)
      .then((response) => {
        let { status, message } = response.data.data.data[0];
        setAlert({ isDisplay: true, status, message });
        status === 1 && setViewState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LayoutControls
        title={`${
          selectedRecord && selectedRecord.idsize ? "Update" : "Create"
        } Item Size Details`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="ItemSizeName" className="form-label mt-4">
                Item Size Name
              </label>
              <input
                type="text"
                className="form-control"
                id="ItemSizeName"
                autoComplete="off"
                {...register("itemsizename", {
                  required: "Please enter the item size name.",
                })}
              />
              {errors["itemsizename"] && (
                <span className="text-danger">
                  {errors["itemsizename"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="HideAgentScreen" className="form-label mt-4">
                Hide Agent Screen
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="HideAgentScreen"
                  onChange={(e) => {
                    setHideAgent(e.target.checked ? 1 : 0);
                  }}
                  checked={hideagent}
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.idsize ? "Update" : "Save"}
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

export default ItemSizeDetails;

import React from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_TPYE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";

const ItemTypeDetails = ({ setViewState, selectedRecord, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemtype: selectedRecord?.itemtype,
    },
  });

  const onSave = (values) => {
    let { idtype, customerid } = selectedRecord;
    let data = {
      customerid,
      itemtype: values.itemtype,
      userid: userDetails("userid"),
    };
    let methodName = ITEM_TPYE.ADD;
    if (selectedRecord && selectedRecord.idtype) {
      data = {
        customerid,
        itemtypeid: idtype,
        itemtype: values.itemtype,
        userid: userDetails("userid"),
      };
      methodName = ITEM_TPYE.EDIT;
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
          selectedRecord && selectedRecord.idtype ? "Update" : "Create"
        } Item Type Details`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset>
            <div className="form-group col-md-6">
              <label htmlFor="ItemTypeName" className="form-label mt-4">
                Item Type Name
              </label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="ItemTypeName"
                {...register("itemtype", {
                  required: "Please enter the item type.",
                })}
              />
              {errors["itemtype"] && (
                <span className="text-danger">
                  {errors["itemtype"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.idtype ? "Update" : "Save"}
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

export default ItemTypeDetails;

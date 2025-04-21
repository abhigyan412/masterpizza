import React from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../generic/LayoutControls";

const DeleteForm = ({ selectedRecord, columns, onDelete }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const deleteInit = (values) => {
    let record = { ...selectedRecord, reason: values.reason };
    onDelete(false, record);
  };

  return (
    <div className="content-shrink">
      <LayoutControls title="Delete Confirmation" />
      <hr />
      <div
        className="page-layout row"
        style={{ overflow: "scroll", maxHeight: "370px", overflowX: "hidden" }}
      >
        <form onSubmit={handleSubmit(deleteInit)}>
          <fieldset>
            {columns.map((column, index) => {
              return (
                <div className="form-group row mb-3" key={index}>
                  <label
                    htmlFor={column.propName}
                    className="col-sm-3 col-form-label"
                  >
                    {column.displayName}
                  </label>
                  <div className="col-sm-9">
                    <span
                      className="form-control-plaintext"
                      id={column.propName}
                    >
                      {selectedRecord[column.propName]}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="form-group row mb-3">
              <label htmlFor="reason" className="col-sm-3 col-form-label">
                Reason for delete record:
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  id="reason"
                  rows={3}
                  cols={2}
                  {...register("reason", {
                    required: "Please enter the reason for delete",
                  })}
                ></textarea>

                {errors["reason"] && (
                  <span className="text-danger">
                    {errors["reason"]["message"]}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row mb-3">
              <button type="sumbit" className="btn btn-success">
                Delete
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(true, {})}
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

export default DeleteForm;

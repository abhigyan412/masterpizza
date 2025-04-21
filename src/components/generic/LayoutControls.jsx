import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";

const LayoutControls = ({
  title,
  options,
  changeDDLval,
  orderStatus,
  selectedDate,
  itemdelayDate,
  orderDate,
  setDDldate,
  changeSearchval,
  clearAll,
  onSubmit,
}) => {
  const [updatestatus, setUpdatestatus] = useState("");
  const [searchData, setSearchData] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setSearchData("");
    setUpdatestatus("");
    setValue(new Date());
  }, [clearAll]);

  const handleUpdatestatus = (event) => {
    changeDDLval(event.target.value);
    setUpdatestatus(event.target.value);
  };

  return (
    <>
      <h4 className="layout-title">{title}</h4>
      <div className="row mt-4 g-3">
        {orderStatus && (
          <div className="col-12 col-md-3">
            <input
              type="search"
              className="form-control"
              autoComplete="off"
              placeholder="Search orders"
              onChange={(event) => {
                setSearchData(event.target.value);
                changeSearchval(event.target.value);
              }}
              value={searchData}
            />
          </div>
        )}
        {orderStatus && (
          <div className="col-12 col-md-3">
            <select
              className="form-select"
              onChange={handleUpdatestatus}
              value={updatestatus}
            >
              <option value="">All</option>
              <option value="1">New</option>
              <option value="2">Processing</option>
              <option value="3">Completed</option>
            </select>
          </div>
        )}

        {orderDate && (
          <div className="col-12 col-md-3">
            <DatePicker
              placeholder="Select Date"
              format="YYYY-MM-DD"
              zIndex={10000}
              calendarPosition="bottom"
              className="form-control"
              style={{
                paddingLeft: "0.8rem",
                width: "100%",
                height: "40px",
              }}
              value={value}
              onChange={setDDldate}
            />
          </div>
        )}

        {orderStatus && (
          <div className="col-12 col-md-3">
            <button
              type="submit"
              className="btn btn-outline-primary w-100"
              onClick={() => {
                onSubmit();
              }}
            >
              Search
            </button>
          </div>
        )}

        {selectedDate && (
          <div className="col-12 col-md-3">
            <DatePicker
              placeholder="Select Date"
              format="MM-DD-YYYY"
              zIndex={10000}
              calendarPosition="bottom"
              className="form-control"
              style={{
                paddingLeft: "0.8rem",
                width: "100%",
                height: "40px",
              }}
              value={value}
              onChange={setDDldate}
            />
          </div>
        )}

        {itemdelayDate && (
          <div className="col-12 col-md-3">
            <DatePicker
              placeholder="Select Date"
              format="MM-DD-YYYY"
              zIndex={10000}
              calendarPosition="bottom"
              className="form-control"
              style={{
                paddingLeft: "0.8rem",
                width: "100%",
                height: "40px",
              }}
              value={value}
              onChange={setDDldate}
            />
          </div>
        )}
        <div className="col-12 d-flex justify-content-end  layout-controls">
          {options &&
            options.map((control, index) => {
              return (
                <button type="button" key={index} {...control.props} className="btn btn-primary me-2 mb-2">
                  {control.title}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LayoutControls;
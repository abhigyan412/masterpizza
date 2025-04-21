import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../components/generic/LayoutControls";
import api from "../../services/api";
import { STORE_CLOSE } from "../../utils/ApiMethods";
import { userDetails } from "../../utils/Generic";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const StoreCloseDetails = ({ setViewState, selectedRecord, setAlert }) => {
  const [fromday, setFromday] = useState("");
  const [today, setToday] = useState("");
  const [fromhours, setFromhours] = useState("");
  const [tohours, setTohours] = useState("");
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => { }, []);

  const onSave = (values) => {
    //debugger;
    if (
      fromday.toString() !== "" &&
      today.toString() !== "" &&
      fromhours.toString() !== "" &&
      tohours.toString() !== ""
    ) {
      let data = {
        customerid: userDetails("companyid"),
        fromday: fromday.toString(),
        today: today.toString(),
        fromhours: fromhours.toString(),
        tohours: tohours.toString(),
        userid: userDetails("userid"),
      };
      api
        .post(STORE_CLOSE.ADD, data)
        .then((response) => {
          console.log("Response", response);
          let status = response.data.data.status;
          let message = response.data.data.message;
          setAlert({ isDisplay: true, status, message });
          status === 1 && setViewState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlert({ isDisplay: true, message: "All fields are required!" });
    }
  };
  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.Spicyid ? "Update" : "Create"
          } Store Close Time`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-3 mt-4">
              <DatePicker
                placeholder="From day"
                format="MM-DD-YYYY"
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "14rem",
                  height: "40px",
                }}
                value={fromday}
                onChange={setFromday}
              />
            </div>

            <div className="form-group col-md-3 mt-4">
              <DatePicker
                placeholder="To day"
                format="MM-DD-YYYY"
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "14rem",
                  height: "40px",
                }}
                value={today}
                onChange={setToday}
              />
            </div>
            <div className="form-group col-md-3 mt-4">
              <DatePicker
                placeholder="From hours"
                format="HH:mm:ss"
                disableDayPicker
                plugins={[<TimePicker />]}
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "14rem",
                  height: "40px",
                }}
                value={fromhours}
                onChange={setFromhours}
              />
            </div>
            <div className="form-group col-md-3 mt-4">
              <DatePicker
                placeholder="To hours"
                disableDayPicker
                plugins={[<TimePicker />]}
                format="HH:mm:ss"
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "14rem",
                  height: "40px",
                }}
                value={tohours}
                onChange={setTohours}
              />
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

export default StoreCloseDetails;

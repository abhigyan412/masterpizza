import { useForm } from "react-hook-form";
import { userDetails } from "../../../utils/Generic";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { TOPPING } from "../../../utils/ApiMethods";

const ToppingDetails = ({ setViewState, selectedRecord, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topingname: selectedRecord?.Topingname,
      customeritemcode: selectedRecord?.Custoemritemcode,
      wholeprice: selectedRecord?.Fullprice,
      halfprice: selectedRecord?.Halfprice,
      topingid: selectedRecord?.Topingid,
    },
  });

  const onSave = (values) => {
    let { topingid, resturantid } = selectedRecord;
    let data = {
      resturantid: userDetails("companyid"),
      customeritemcode: values.customeritemcode,
      topingname: values.topingname,
      fullprice: values.wholeprice,
      halfprice: values.halfprice,
      createdby: userDetails("userid"),
    };
    let methodName = TOPPING.ADD;
    if (selectedRecord && selectedRecord.Topingid) {
      data = {
        topingid: selectedRecord.Topingid,
        resturantid: userDetails("companyid"),
        customeritemcode: values.customeritemcode,
        topingname: values.topingname,
        fullprice: values.wholeprice,
        halfprice: values.halfprice,
        createdby: userDetails("userid"),
      };
      methodName = TOPPING.EDIT;
    }

    if (selectedRecord.Topingid > 0) {
      api
        .put(methodName, data)
        .then((response) => {
          let { Status, Error, message } = response.data.data;
          let status = Status;

          if (Status === 1 || Status === 0) {
            if (response.data.data.Resultset !== undefined) {
              let message = response.data.data.Resultset.Message;
              setAlert({ isDisplay: true, status, message });
            } else {
              let message = response.data.data.Restultset.Message;
              setAlert({ isDisplay: true, status, message });
            }
          } else {
            let message = Error.ErrorMessage;
            setAlert({ isDisplay: true, Status, message });
          }
          Status === 1 && setViewState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .post(methodName, data)
        .then((response) => {
          let { Status, Error, message } = response.data.data;
          let status = Status;

          if (Status === 1 || Status === 0) {
            if (response.data.data.Resultset !== undefined) {
              let message = response.data.data.Resultset.Message;
              setAlert({ isDisplay: true, status, message });
            } else {
              let message = response.data.data.Restultset.Message;
              setAlert({ isDisplay: true, status, message });
            }
          } else {
            let message = Error.ErrorMessage;
            setAlert({ isDisplay: true, status, message });
          }
          Status === 1 && setViewState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.topingid ? "Update" : "Create"
          } Toppings`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)} autoComplete="Off">
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="ToppingCode" className="form-label mt-4">
                Topping Code
              </label>
              <input
                type="text"
                className="form-control"
                id="customeritemcode"
                autoComplete="Off"
                {...register("customeritemcode", {
                  required: "Please enter the topping code.",
                })}
              />
              {errors["customeritemcode"] && (
                <span className="text-danger">
                  {errors["customeritemcode"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="ToppingName" className="form-label mt-4">
                Topping Name
              </label>
              <input
                type="text"
                className="form-control"
                id="topingname"
                autoComplete="Off"
                {...register("topingname", {
                  required: "Please enter the topping name.",
                })}
              />
              {errors["topingname"] && (
                <span className="text-danger">
                  {errors["topingname"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="wholeprice" className="form-label mt-4">
                Whole Price
              </label>
              <input
                type="number"
                className="form-control"
                id="wholeprice"
                step="0.01"
                autoComplete="Off"
                {...register("wholeprice", {
                  required: "Please enter the whole topping price.",
                })}
              />
              {errors["wholeprice"] && (
                <span className="text-danger">
                  {errors["wholeprice"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="halfprice" className="form-label mt-4">
                Half Price
              </label>
              <input
                type="number"
                className="form-control"
                id="halfprice"
                step="0.01"
                autoComplete="Off"
                {...register("halfprice", {
                  required: "Please enter the  half topping price.",
                })}
              />
              {errors["halfprice"] && (
                <span className="text-danger">
                  {errors["halfprice"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.Topingid ? "Update" : "Save"}
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
export default ToppingDetails;

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_MASTER, OFFERS } from "../../../utils/ApiMethods";
import { initPackageValue } from "../../../utils/Master/OffersUtils";
import { userDetails } from "../../../utils/Generic";
import { searchInitValue as masterParams } from "../../../utils/Master/ItemMasterUtils";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const OfferDetails = ({ setViewState, selectedRecord, setAlert }) => {
  const [itemPackage, setItemPackage] = useState(initPackageValue);
  const [itemSize, setItemSize] = useState([]);
  const [items, setItems] = useState([]);
  const [fromday, setFromday] = useState(new DateObject().add(0, "days"));
  const [today, setToday] = useState(new DateObject().add(0, "days"));
  const [fromhours, setFromhours] = useState(new DateObject().add(0, "hours"));
  const [tohours, setTohours] = useState(new DateObject().add(1, "hours"));
  const [errMsg, setErrorMessage] = useState("");
  const inputRef = useRef();
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    api
      .post(ITEM_MASTER.LOAD, { ...masterParams(), pagesize: -1 })
      .then((response) => {
        setItems(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (itemPackage.discount && itemPackage.discounttype) {
      const discountValue =
        itemPackage.discounttype === 1
          ? ((itemPackage.itemprice * itemPackage.discount) / 100).toFixed(2)
          : itemPackage.discount;
      setItemPackage((prevState) => ({
        ...prevState,
        discountamount: discountValue,
        unitprice: (itemPackage.itemprice - discountValue).toFixed(2),
      }));
    }
  }, [itemPackage.discount, itemPackage.discounttype, itemPackage.itemprice]);

  const setItemCode = (e) => {
    if (e.target.value) {
      const selectedItem = items.find(
        (i) => i.itemcode === parseInt(e.target.value)
      );
      setItemPackage((prevState) => ({
        ...prevState,
        itemcode: parseInt(e.target.value),
        itemname: selectedItem.itemname,
      }));
      let data = {
        userid: userDetails("userid"),
        customerid: userDetails("companyid"),
        itemcode: parseInt(e.target.value),
      };
      api
        .get(OFFERS.GET_ITEM_SIZE, { params: data })
        .then((response) => {
          setItemSize(response.data.data.resultset);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onItemSizeChange = (e) => {
    if (e.target.value) {
      let selectedSizeid = parseInt(e.target.value);
      const selectedSize = itemSize.find(
        (size) => size.itemsizeid === selectedSizeid
      );
      setItemPackage((prevState) => ({
        ...prevState,
        itemsizeid: selectedSizeid,
        itemsize: selectedSize.itemsize,
        discounttype: 0,
        discount: "0",
        discountamount: "0",
        itemprice: selectedSize.itemprize,
        unitprice: selectedSize.itemprize,
      }));
    }
  };

  const onSetDiscountType = (e) => {
    setItemPackage((prevState) => ({
      ...prevState,
      discounttype: parseInt(e.target.value),
      discount: "",
      discountamount: 0,
      unitprice: prevState.itemprice,
    }));
    if (e.target.value != 0) {
      inputRef.current.focus();
    }
  };

  const onSetDiscount = (e) => {
    const re = /^[\d]*\.?[\d]{0,2}$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (itemPackage.discounttype !== 1) {
        setItemPackage((prevState) => ({
          ...prevState,
          discount: e.target.value,
        }));
      } else {
        (e.target.value === "" || parseInt(e.target.value) <= 100) &&
          setItemPackage((prevState) => ({
            ...prevState,
            discount: e.target.value,
          }));
      }
    }
  };

  const onSave = (values) => {
    //debugger;
    setErrorMessage("");
    if (
      itemPackage.itemcode &&
      itemPackage.itemsize &&
      itemPackage.unitprice >= 0 &&
      itemPackage.discounttype &&
      itemPackage.discountamount
    ) {
      let data = {
        customerid: userDetails("companyid"),
        itemcode: itemPackage.itemcode,
        itemsizeid: itemPackage.itemsizeid,
        discounttype: itemPackage.discounttype,
        itemprice: itemPackage.itemprice,
        discountamount: itemPackage.discountamount,
        unitprice: itemPackage.unitprice,
        fromday: fromday.toString(),
        today: today.toString(),
        fromhours: fromhours.toString(),
        tohours: tohours.toString(),
        userid: userDetails("userid"),
      };
      api
        .post(OFFERS.ADD, data)
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
    } else if (
      !itemPackage.itemcode &&
      !itemPackage.itemsize &&
      !itemPackage.discounttype &&
      !itemPackage.discountamount &&
      fromday.toString() !== "" &&
      today.toString() !== "" &&
      fromhours.toString() !== "" &&
      tohours.toString() !== ""
    ) {
      setAlert({ isDisplay: true, message: "Please enter all the fields" });
    } else {
      setErrorMessage("The unit price value should be greater than 0.");
    }
  };
  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.Spicyid ? "Update" : "Create"
          } Offer Item`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="ItemName" className="form-label mt-4">
                Item Name
              </label>
              <select
                id="style-5"
                name="itemcode"
                className="form-control"
                value={itemPackage.itemcode}
                onChange={(e) => setItemCode(e)}
              >
                <option value="">-- Please Select --</option>
                {items.map((type, index) => {
                  return (
                    <option key={index} value={type.itemcode}>
                      {type.itemname}
                    </option>
                  );
                })}
              </select>
              {errors["itemcode"] && (
                <span className="text-danger">
                  {errors["itemcode"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="itemsizeid" className="form-label mt-4">
                Item Size
              </label>
              <select
                name="itemsizeid"
                id="itemsizeid"
                className="form-control"
                value={itemPackage.itemsizeid}
                onChange={onItemSizeChange}
              >
                <option value="">-- Please Select --</option>
                {itemSize.map((item, index) => {
                  return (
                    <option key={index} value={item.itemsizeid}>
                      {item.itemsize}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="discounttype" className="form-label mt-4">
                Discount Type
              </label>
              <select
                name="discounttype"
                id="discountType"
                className="form-control"
                value={itemPackage.discounttype}
                onChange={onSetDiscountType}
              >
                <option value="">-- Please Select --</option>
                <option value="1">Percentage</option>
                <option value="2">Amount</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="discount" className="form-label mt-4">
                Discount
              </label>
              <input
                ref={inputRef}
                type="text"
                name="discount"
                autoComplete="off"
                className="form-control"
                value={itemPackage.discount}
                onChange={(e) => onSetDiscount(e)}
              />
              {itemPackage.discounttype > 0 ? (
                <label
                  style={{
                    color:
                      itemPackage.discounttype > 0 &&
                        itemPackage.discount === ""
                        ? "#cc3363"
                        : "black",
                    fontSize: "16px",
                  }}
                >
                  {itemPackage.discount === "" ? "Enter the discount" : ""}
                </label>
              ) : (
                ""
              )}
            </div>
            {/* <div className="form-group col-md-6">
              <label htmlFor="Discount Price" className="form-label mt-4">
                Discount Price
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                autoComplete="off"
                id="DiscountPrice"
                {...register("discountprice", {
                  required: "Please enter the discountprice.",
                  // pattern: {
                  //   value: /^[\d]*\.?[\d]{0,2}$/,
                  //   message: "Please Enter only numbers",
                  // },
                })}
              />
              {errors["discountprice"] && (
                <span className="text-danger">
                  {errors["discountprice"]["message"]}
                </span>
              )}
            </div> */}

            <div className="form-group col-md-3">
              <label htmlFor="itemprice" className="form-label mt-4">
                Item Price :&nbsp;
              </label>
              <span>{itemPackage.itemprice}</span>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="discountamount" className="form-label mt-4">
                Discount Amt :&nbsp;
              </label>
              <span>{itemPackage.discountamount}</span>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="discount" className="form-label mt-4">
                Unit Price :&nbsp;
              </label>
              <span>{itemPackage.unitprice}</span>
            </div>
            {errMsg && (
              <div className="form-group">
                <span className="text-danger">{errMsg}</span>
              </div>
            )}
          </fieldset>

          <fieldset className="row">
            <div className="form-group col-md-3">
              <label htmlFor="fromday" className="form-label mt-4">
                From Day
              </label>
              <DatePicker
                placeholder="From day"
                format="MM-DD-YYYY"
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "12rem",
                  height: "40px",
                }}
                value={fromday}
                onChange={setFromday}
              />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="today" className="form-label mt-4">
                To Day
              </label>
              <DatePicker
                placeholder="To day"
                format="MM-DD-YYYY"
                zIndex={10000}
                calendarPosition="bottom"
                style={{
                  paddingLeft: "0.8rem",
                  width: "12rem",
                  height: "40px",
                }}
                value={today}
                onChange={setToday}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="fromhours" className="form-label mt-4">
                From Hours
              </label>
              <DatePicker
                placeholder="From hours"
                format="HH:mm:ss"
                disableDayPicker
                plugins={[<TimePicker />]}
                zIndex={10000}
                calendarPosition="top"
                style={{
                  paddingLeft: "0.8rem",
                  width: "12rem",
                  height: "40px",
                }}
                value={fromhours}
                onChange={setFromhours}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tohours" className="form-label mt-4">
                To Hours
              </label>
              <DatePicker
                placeholder="To hours"
                disableDayPicker
                plugins={[<TimePicker />]}
                format="HH:mm:ss"
                zIndex={10000}
                calendarPosition="top"
                style={{
                  paddingLeft: "0.8rem",
                  width: "12rem",
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

export default OfferDetails;

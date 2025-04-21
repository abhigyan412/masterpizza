import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_MASTER, ITEM_PRICE, ITEM_SIZE } from "../../../utils/ApiMethods";
import { ITEM_PACKAGE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import { searchInitValue as masterParams } from "../../../utils/Master/ItemMasterUtils";
import Select from "react-select";

const ItemPriceDetails = ({ setViewState, selectedRecord, setAlert }) => {
  const [items, setItems] = useState([]);
  const [itemSizeList, setItemSizeList] = useState([]);
  const [itemcode, setItemcode] = useState("");
  const [enableaddon, setEnableaddon] = useState(false);
  const [itemNameSelected, setItemNameSelected] = useState([]);

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //itemcode: selectedRecord?.itemid,
      itemsizeid: selectedRecord?.itemsizeid,
      unitprice: selectedRecord?.unitprice,
    },
  });

  useEffect(() => {
    //debugger;
    api
      .post(ITEM_MASTER.LOAD, { ...masterParams(), pagesize: -1 })
      .then((response) => {
        let listOfValues = response.data.data.data;
        setItems(response.data.data.data);
        // setItems(
        //   listOfValues.map((i) => {
        //     return { value: i.itemcode, label: i.itemname };
        //   })
        // );
        // setItemNameSelected(
        //   selectedRecord?.itemid
        //     ? JSON.parse(selectedRecord?.itemid).map((i) => {
        //         return { value: i.itemid, label: i.itemcode };
        //       })
        //     : []
        // );

        let listOfValues1 = selectedRecord;
        setItemNameSelected(
          listOfValues1.map((i) => {
            return { value: i.itemid, label: i.itemcode };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    if (selectedRecord?.itemid) {
      setItemcode(selectedRecord?.itemid);
      let data = {
        userid: userDetails("userid"),
        customerid: userDetails("companyid"),
        itemcode: selectedRecord?.itemid,
      };
      api
        .get(ITEM_PACKAGE.GET_ITEM_SIZE, { params: data })
        .then((response) => {
          setItemSizeList(response.data.data.resultset);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    setValue("itemsizeid", selectedRecord?.itemsizeid);
  }, [selectedRecord, setValue, items, itemSizeList]);

  const handleChange = (event) => {
    //debugger;
    setItemNameSelected([event]);
    addTodo(event.value);
  };

  const addTodo = useCallback((e) => {
    loadItemsize(e);
  }, []);

  const loadItemsize = (e) => {
    setItemcode(e.target.value);
    if (e.target.value !== "") {
      setEnableaddon(false);
    } else setEnableaddon(true);
    let data = {
      userid: userDetails("userid"),
      customerid: userDetails("companyid"),
      itemcode: parseInt(e.target.value),
    };
    if (e.target.value !== "") {
      api
        .get(ITEM_PACKAGE.GET_ITEM_SIZE, { params: data })
        .then((response) => {
          setItemSizeList(response.data.data.resultset);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let { status, message } = {
        status: "-1",
        message: "Please select item name",
      };
      setAlert({ isDisplay: true, status, message });
    }
  };

  const onSave = (values) => {
    //debugger;
    // let itemcode = itemNameSelected.map((i) => {
    //   return { itemcode: i.value };
    // });
    if (itemcode !== "") {
      setEnableaddon(false);
      let { idprice, customerid } = selectedRecord;
      let data = {
        customerid,
        userid: userDetails("userid"),
        itemcode: parseInt(itemcode),
        //itemcode: itemcode,
        ...values,
      };
      let methodName = ITEM_PRICE.ADD;
      if (selectedRecord && selectedRecord.idprice) {
        data = {
          customerid,
          idprice: idprice,
          userid: userDetails("userid"),
          itemcode: parseInt(itemcode),
          //itemcode: itemcode,
          ...values,
        };
        methodName = ITEM_PRICE.EDIT;
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
    } else {
      setEnableaddon(true);
    }
  };

  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.idprice ? "Update" : "Create"
          } Item Price Details`}
      />
      <hr />
      <div className="page-layout row">
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="ItemCode" className="form-label mt-4">
                Item Name
              </label>
              <select
                id="style-5"
                className="form-control"
                // id="ItemCode"
                defaultValue={itemcode}
                isSearchable={true}
                value={itemcode}
                onChange={(e) => {
                  setItemcode(e.target.value);
                  addTodo(e);
                }}
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
              {enableaddon === true ? (
                <span className="text-danger">
                  Please select the item code.
                </span>
              ) : (
                <span className="text-danger"></span>
              )}
            </div>

            {/* <div className="form-group col-md-6">
              <label htmlFor="ItemCode" className="form-label mt-4">
                Item Name
              </label>
              <Select
                options={items}
                value={itemNameSelected}
                defaultValue={itemNameSelected}
                onChange={handleChange}
                placeholder="--Please select--"
                isSearchable={true}
              />
              {enableaddon === true ? (
                <span className="text-danger">
                  Please select the item code.
                </span>
              ) : (
                <span className="text-danger"></span>
              )}
            </div> */}
            <div className="form-group col-md-6">
              <label htmlFor="ItemSize" className="form-label mt-4">
                Item Size Name
              </label>
              <select
                className="form-control"
                id="ItemSize"
                {...register("itemsizeid", {
                  required: "Please select the item type.",
                })}
              >
                <option value="">-- Please Select --</option>
                {itemSizeList.map((type, index) => {
                  return (
                    <option key={index} value={type.itemsizeid}>
                      {type.itemsize}
                    </option>
                  );
                })}
              </select>
              {errors["itemsizeid"] && (
                <span className="text-danger">
                  {errors["itemsizeid"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="UnitPrice" className="form-label mt-4">
                Unit Price
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                autoComplete="off"
                id="UnitPrice"
                {...register("unitprice", {
                  required: "Please enter the unit price.",
                  // pattern: {
                  //   value: /^[\d]*\.?[\d]{0,2}$/,
                  //   message: "Please Enter only numbers",
                  // },
                })}
              />
              {errors["unitprice"] && (
                <span className="text-danger">
                  {errors["unitprice"]["message"]}
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

export default ItemPriceDetails;

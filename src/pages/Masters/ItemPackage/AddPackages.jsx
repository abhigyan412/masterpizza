import React, { useEffect, useState, useRef } from "react";
import api from "../../../services/api";
import { ITEM_PACKAGE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import { searchInitValue as itemSearchParams } from "../../../utils/Master/ItemMasterUtils";
import { searchInitValue as typeParams } from "../../../utils/Master/ItemTypeUtils";
import { initPackageValue } from "../../../utils/Master/ItemPackageUtils";

const AddPackages = ({ setPackages }) => {
  const [itemPackage, setItemPackage] = useState(initPackageValue);
  const [itemTypeList, setItemTypeList] = useState([]);

  const [items, setItems] = useState([]);
  const [itemSize, setItemSize] = useState([]);
  const inputRef = useRef();
  useEffect(() => {
    api
      .get(ITEM_PACKAGE.ITEM_TYPE + "?restaurantid=" + userDetails("companyid"))
      .then((response) => {
        setItemTypeList(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setItemType = (e) => {
    if (e.target.value) {
      const selectedType = itemTypeList.find(
        (type) => type.typeid === parseInt(e.target.value)
      );
      setItemPackage({
        ...initPackageValue,
        itemtype: parseInt(e.target.value),
        itemtypename: selectedType.typename,
      });
      api
        .get(
          ITEM_PACKAGE.ITEM_NAME +
          "?restaurantid=" +
          userDetails("companyid") +
          "&itemtype=" +
          parseInt(e.target.value)
        )
        .then((response) => {
          console.log("Default Item Name", response.data.data.data);
          setItems(response.data.data.data);
          setItemPackage((prevState) => ({
            ...prevState,
            itemtypeval: [],
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const setItemCode = (e) => {
    if (e.target.value) {
      const selectedItem = items.find(
        (i) => i.itemid === parseInt(e.target.value)
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
        .get(ITEM_PACKAGE.GET_ITEM_SIZE, { params: data })
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

  const onSetDescription = (e) => {
    if (e.target.value) {
      setItemPackage((prevState) => ({
        ...prevState,
        description: e.target.value,
      }));
    }
  };

  useEffect(() => {
    setItemPackage((prevState) => ({
      ...prevState,
      description: itemPackage.itemtypename,
    }));
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
  }, [
    itemPackage.discount,
    itemPackage.discounttype,
    itemPackage.itemprice,
    itemPackage.itemtypename,
  ]);
  const [errMsg, setErrorMessage] = useState("");

  const onAddPackages = () => {
    setErrorMessage("");
    if (
      itemPackage.itemtype &&
      itemPackage.itemcode &&
      itemPackage.itemsize &&
      //itemPackage.discounttype &&
      //itemPackage.discountamount &&y
      itemPackage.unitprice >= 0
    ) {
      setPackages(itemPackage);
      setItemPackage(initPackageValue);
    } else if (
      !itemPackage.itemtype &&
      !itemPackage.itemcode &&
      !itemPackage.itemsize
      //!itemPackage.discounttype &&
      //!itemPackage.discountamount
    ) {
      setErrorMessage("Please enter all the fields");
    } else {
      setErrorMessage("The unit price value should be greater than 0.");
    }
  };

  return (
    <div className="page-layout ">
      <fieldset className="row">
        <legend>Package Details</legend>
        <div className="form-group col-md-3">
          <label htmlFor="itemtype" className="form-label mt-4">
            Item Type
          </label>
          <select
            id="style-5"
            name="itemtype"
            className="form-control"
            value={itemPackage.itemtype}
            onChange={(e) => setItemType(e)}
          >
            <option value="">-- Please Select --</option>
            {itemTypeList.map((type, index) => {
              return (
                <option key={index} value={type.typeid}>
                  {type.typename}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="itemcode" className="form-label mt-4">
            Default Item Name
          </label>
          <select
            id="style-5"
            name="itemcode"
            className="form-control"
            value={itemPackage.itemcode}
            onChange={(e) => setItemCode(e)}
          >
            <option value="">-- Please Select --</option>
            {items.map((item, index) => {
              return (
                <option key={index} value={item.itemid}>
                  {item.itemname}
                </option>
              );
            })}
          </select>
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
                  itemPackage.discounttype > 0 && itemPackage.discount === ""
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
        <div className="form-group col-md-3">
          <label htmlFor="description" className="form-label mt-4">
            Description
          </label>
          <input
            type="text"
            name="description"
            autoComplete="off"
            className="form-control"
            value={itemPackage.description}
            onChange={(e) => onSetDescription(e)}
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="itemprice" className="form-label mt-4">
            Item Price:
          </label>
          <span>{itemPackage.itemprice}</span>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="discountamount" className="form-label mt-4">
            Discount Amt:
          </label>
          <span>{itemPackage.discountamount}</span>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="discount" className="form-label mt-4">
            Unit Price:
          </label>
          <span>{itemPackage.unitprice}</span>
        </div>
        {errMsg && (
          <div className="form-group mt-3">
            <span className="text-danger">{errMsg}</span>
          </div>
        )}
        <div className="form-group mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddPackages}
          >
            Add Item
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default AddPackages;

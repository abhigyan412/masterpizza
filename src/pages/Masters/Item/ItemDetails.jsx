import React, { useEffect, useState, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";
import { useForm } from "react-hook-form";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import {
  ITEM_MASTER,
  AUDIO_ITEM,
  ITEM_SIZE,
  ITEM_TPYE,
  TOPPING,
  ITEM_BASE,
  ITEM_SPICY,
} from "../../../utils/ApiMethods";
import { searchInitValue as typeParams } from "../../../utils/Master/ItemTypeUtils";
import { searchInitValue as sizeParams } from "../../../utils/Master/ItemSizeUtils";
import { userDetails } from "../../../utils/Generic";

const ItemDetails = ({ setViewState, selectedRecord, setAlert, dayofweek }) => {
  const input = useRef(null);
  const [isAddon, setAddon] = useState(
    selectedRecord?.isaddonitem === "Yes" ? 1 : 0
  );
  const [isModifier, setModifier] = useState(
    selectedRecord?.ismodifier === "Yes" ? 1 : 0
  );
  const [isApplayModifier, setApplayModifier] = useState(
    selectedRecord?.applaymodifier === "Yes" ? 1 : 0
  );
  const [audioItemList, setAudioItemList] = useState([]);
  const [positemname, setPOSItemname] = useState(selectedRecord?.itemname);
  const [itemTypeList, setItemTypeList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [itemSizeList, setItemSizeList] = useState([]);
  const [itemBaseList, setItemBaseList] = useState([]);
  const [itemNameSelected, setItemNameSelected] = useState([]);
  const [itemSizeSelected, setItemSizeSelected] = useState([]);
  const [itemBaseSelected, setItemBaseSelected] = useState([]);
  const [itemSpicyList, setItemSpicyList] = useState([]);
  const [itemSpicySelected, setItemSpicySelected] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [toppinglist, setToppinglist] = useState([]);
  const [toppingselected, setToppingselected] = useState([]);
  const [enableaddon, setEnableaddon] = useState(
    selectedRecord?.isown === "1" ? 1 : 0
  );
  const [addonlimit, setAddonlimit] = useState(
    selectedRecord?.addonlimit === undefined ? 0 : selectedRecord?.addonlimit
  );
  const [temp, setTemp] = useState(0);
  const [show, setShow] = useState(false);

  const tempfun = () => {
    setTemp(Math.random());
  };

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemcode: selectedRecord?.itemcode,
      customeritemcode: selectedRecord?.customeritemcode,
      positemname: selectedRecord?.itemname,
      itemdescription: selectedRecord?.itemdescription,
      typeid: selectedRecord?.typeid,
      category: selectedRecord?.category,
      extraaddonlimit: selectedRecord?.extraaddonlimit
        ? selectedRecord?.extraaddonlimit
        : 0,
      defaultremovecount: selectedRecord?.addonremovelimit
        ? selectedRecord?.addonremovelimit
        : 0,
      defaultspicy: parseInt(
        selectedRecord?.defaultspicy ? selectedRecord?.defaultspicy : ""
      ),
      uom: selectedRecord?.uom,
      itemfromhours: selectedRecord?.itemfromhours,
      itemfromminutes: selectedRecord?.itemfromminutes,
      fromtype: selectedRecord?.fromtype,
      itemtohours: selectedRecord?.itemtohours,
      itemtominutes: selectedRecord?.itemtominutes,
      totype: selectedRecord?.totype,
    },
  });

  useEffect(() => {
    api
      .post(AUDIO_ITEM.LOAD)
      .then((response) => {
        let listOfValues = response.data.data.resultset;
        setAudioItemList(
          listOfValues.map((i) => {
            return { value: i.itemid, label: i.itemname };
          })
        );
        setItemNameSelected(
          selectedRecord?.audioid
            ? JSON.parse(selectedRecord?.audioid).map((i) => {
              return { value: i.itemid, label: i.itemname };
            })
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .get(ITEM_TPYE.LOAD, { params: typeParams() })
      .then((response) => {
        setItemTypeList(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .get(ITEM_SIZE.LOAD, { params: sizeParams() })
      .then((response) => {
        let listOfValues = response.data.data.data;
        setItemSizeList(
          listOfValues.map((i) => {
            return { idsize: i.idsize, itemsize: i.itemsize };
          })
        );
        setItemSizeSelected(
          selectedRecord?.size
            ? JSON.parse(selectedRecord?.size).map((i) => {
              return { idsize: i.idsize, itemsize: i.sizename };
            })
            : []
        );
      })
      .catch(() => { });
    api
      .get(
        TOPPING.LOAD +
        "?restraurantid=" +
        userDetails("companyid") +
        "&userid=" +
        userDetails("userid")
      )
      .then((response) => {
        console.log(response);
        let listOfValues1 = response.data.data.Resultset;
        setToppinglist(
          listOfValues1.map((i) => {
            return { topingid: i.Topingid, topingname: i.Topingname };
          })
        );
        setToppingselected(
          selectedRecord?.defaulttoppings
            ? JSON.parse(selectedRecord?.defaulttoppings).map((index) => {
              return {
                topingid: index.toppingid,
                topingname: index.topingname,
              };
            })
            : []
        );
      })
      .catch((error) => console.log(error));
    api
      .get(ITEM_BASE.LIST + "?restraurantid=" + userDetails("companyid"))
      .then((response) => {
        let { Resultset, Status } = response.data.data;
        setItemBaseList(
          Resultset.map((i) => {
            return { baseid: i.Baseid, basename: i.Basename };
          })
        );
        setItemBaseSelected(
          selectedRecord?.defaultbase
            ? JSON.parse(selectedRecord?.defaultbase).map((index) => {
              return {
                baseid: index.baseid,
                basename: index.basename,
              };
            })
            : []
        );
      })
      .catch((error) => console.log(error));
    api
      .get(ITEM_SPICY.LIST + "?restaurantid=" + userDetails("companyid"))
      .then((response) => {
        let { Resultset, Status } = response.data.data;
        setItemSpicyList(
          Resultset.map((i) => {
            return { spicyid: i.Spicyid, spicyname: i.Spicyname };
          })
        );
        setItemSpicySelected(
          selectedRecord?.spicy
            ? JSON.parse(selectedRecord?.spicy).map((index) => {
              return {
                spicyid: index.spicyid,
                spicyname: index.spicyname,
              };
            })
            : []
        );
      })
      .catch((error) => console.log(error));
  }, [selectedRecord, setValue]);

  useEffect(() => {
    // setPOSItemname((prevState) => ({
    //   ...prevState,
    //   itemname: positemname.itemname,
    // }));
    setWeekList(dayofweek);
    setValue("typeid", selectedRecord?.typeid);
    setValue("defaultspicy", selectedRecord?.defaultspicy);
    tempfun();
    const tempList = [
      {
        dayid: 1,
        dayname: "Sunday",
      },
      {
        dayid: 2,
        dayname: "Monday",
      },
      { dayid: 3, dayname: "Tuesday" },
      { dayid: 4, dayname: "Wednesday" },
      { dayid: 5, dayname: "Thursday" },
      { dayid: 6, dayname: "Friday" },
      { dayid: 7, dayname: "Saturday" },
    ];
    tempfun();
    if (selectedRecord?.week) {
      tempfun();
      if (selectedRecord.week && typeof selectedRecord.week != "object") {
        var itemval = JSON.parse(selectedRecord.week);
      } else {
        var itemval = selectedRecord.week;
      }
      tempfun();
      for (let i = 0; i < weekList.length; i++) {
        for (let j = 0; j < itemval.length; j++) {
          if (weekList[i].dayid === itemval[j].dayid) {
            weekList[i].checked = true;
          } else {
          }
          tempfun();
        }
      }
    } else {
      for (let i = 0; i < weekList.length; i++) {
        for (let j = 0; j < tempList.length; j++) {
          if (weekList[i].dayid === tempList[j].dayid) {
            weekList[i].checked = true;
          } else {
          }
          tempfun();
        }
      }
    }
  }, [
    selectedRecord,
    setValue,
    itemTypeList,
    itemSpicyList,
    audioItemList,
    dayofweek,
  ]);

  const fileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const audioUpload = (event) => {
    setSelectedAudio(event.target.files[0]);
  };

  const onSave = (values) => {
    //debugger;
    let { itemcode, customerid } = selectedRecord;
    // let itemNames = itemNameSelected.map((i) => {
    //   return { audioid: i.value };
    // });
    let checkedItem = [];
    checkedItem = weekList.filter((item) => item.checked === true);
    let selectedWeek = checkedItem.map((i) => {
      return { weekid: i.dayid };
    });

    let itemSizes = itemSizeSelected.map((i) => {
      return { sizeid: i.idsize };
    });
    let itembases = itemBaseSelected.map((i) => {
      return { baseid: i.baseid, basename: i.basename };
    });
    let itemToppings = toppingselected.map((i) => {
      return { toppingid: i.topingid };
    });
    let itemSpicy = itemSpicySelected.map((i) => {
      return { spicyid: i.spicyid };
    });
    //if (itemNames.length != 0) {
    if (itemSizes.length !== 0) {
      if (selectedWeek.length !== 0) {
        if (
          (values.defaultspicy !== "" && itemSpicy.length !== 0) ||
          (values.defaultspicy === "" && itemSpicy.length === 0) ||
          (values.defaultspicy === undefined && itemSpicy.length === 0)
        ) {
          if (
            (values.itemfromhours != "0" &&
              values.itemtohours != "0" &&
              values.fromtype != "" &&
              values.totype != "") ||
            (values.itemfromhours.toString() === "0" &&
              values.itemtohours.toString() === "0" &&
              values.fromtype === "" &&
              values.totype === "")
          ) {
            if (enableaddon && addonlimit === 0) {
              let message = "Please enter addon limit";
              setAlert({ isDisplay: true, message });
              input.current.focus();
            } else {
              let data = {
                customerid,
                userid: userDetails("userid"),
                ...values,
                sizeids: itemSizes,
                defaulttoppings: itemToppings,
                itembase: itembases,
                isown: enableaddon,
                addonlimit: parseInt(addonlimit),
                spicy: itemSpicy,
                audioid: [{ audioid: 0 }],
                weekids: selectedWeek,
                //positemname: positemname,
              };
              let methodName = ITEM_MASTER.ADD;
              if (selectedRecord && selectedRecord.itemcode) {
                data = {
                  customerid,
                  itemcode: itemcode,
                  userid: userDetails("userid"),
                  ...values,
                  sizeids: itemSizes,
                  defaulttoppings: itemToppings,
                  itembase: itembases,
                  isown: enableaddon,
                  addonlimit: parseInt(addonlimit),
                  spicy: itemSpicy,
                  audioid: [{ audioid: 0 }],
                  weekids: selectedWeek,
                  //positemname: positemname,
                };
                methodName = ITEM_MASTER.EDIT;
              }
              let fd = new FormData();
              fd.append("itemdata", JSON.stringify(data));
              selectedFile &&
                fd.append("filename", selectedFile, selectedFile.name);
              selectedAudio &&
                fd.append("audiofile", selectedAudio, selectedAudio.name);
              if (selectedRecord.itemcode) {
                api
                  .put(methodName, fd, {
                    headers: { "content-type": "multipart/form-data" },
                  })
                  .then((response) => {
                    let { status, message } = response.data.data.data[0];
                    setAlert({ isDisplay: true, status, message });
                    status === 1 && setViewState(true);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                api
                  .post(methodName, fd, {
                    headers: { "content-type": "multipart/form-data" },
                  })
                  .then((response) => {
                    let { status, message } = response.data.data.data[0];
                    setAlert({ isDisplay: true, status, message });
                    status === 1 && setViewState(true);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          } else {
            setAlert({
              isDisplay: true,
              message: "Enter both time & type.",
            });
          }
        } else {
          setAlert({
            isDisplay: true,
            message: "Enter default spicy & item spicy.",
          });
        }
      } else {
        setAlert({
          isDisplay: true,
          message: "Please select item available days.",
        });
      }
    } else {
      setAlert({ isDisplay: true, message: "Please enter item size." });
    }
    // } else {
    //   setAlert({ isDisplay: true, message: "Please enter item name." });
    // }
  };

  // const handleChange = (selectedValues) => {
  //   setItemNameSelected([selectedValues]);
  //   setPOSItemname((prevState) => ({
  //     ...prevState,
  //     itemname: selectedValues.label,
  //   }));
  // };

  // const onChangePOSItem = (e) => {
  //   if (e.target.value) {
  //     setPOSItemname((prevState) => ({
  //       ...prevState,
  //       itemname: e.target.value,
  //     }));
  //   }
  // };

  const selectedValues = (selectedList, selectedItem) => {
    const list = selectedList.map((i) => {
      return { idsize: i.idsize, itemsize: i.itemsize };
    });
    setItemSizeSelected(list);
  };

  const selectedItemBase = (selectedList, selectedItem) => {
    const list = selectedList.map((i) => {
      return { baseid: i.baseid, basename: i.basename };
    });
    setItemBaseSelected(list);
  };

  const selectedToppingValues = (selectedList, selectedItem) => {
    const list = selectedList.map((i) => {
      return { topingid: i.topingid, topingname: i.topingname };
    });
    setToppingselected(list);
  };

  // const handleSetType = (e) => {
  //   var list = [];
  //   list = typeoption.filter((el) => el.value != e.target.value);
  //   setToType(list);
  // };

  // START SPICY LIST
  const handleSelectedSpicy = (e) => {
    var list = [];
    list = itemSpicyList.filter(
      (element) => element.spicyid === parseInt(e.target.value)
    );
    setItemSpicySelected(list);
  };

  const selectedItemSpicy = (selectedList, selectedItem) => {
    const list = selectedList.map((i) => {
      return { spicyid: i.spicyid, spicyname: i.spicyname };
    });
    setItemSpicySelected(list);
  };
  // END SPICY LIST

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <LayoutControls
        title={`${selectedRecord && selectedRecord.itemcode ? "Update" : "Create"
          } Item Details`}
      />
      <hr />
      <div
        className="page-layout row"
        style={{ overflow: "scroll", maxHeight: "410px" }}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-3">
              <label htmlFor="ItemCode" className="form-label mt-4">
                Item Code
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="ItemCode"
                {...register("customeritemcode", {
                  required: "Please enter the item code.",
                })}
              />
              {errors["customeritemcode"] && (
                <span className="text-danger">
                  {errors["customeritemcode"]["message"]}
                </span>
              )}
            </div>
            {/* <div className="form-group col-md-3">
              <label htmlFor="ItemName" className="form-label mt-4">
                Item Name
              </label>
              <Select
                options={audioItemList}
                value={itemNameSelected}
                onChange={handleChange}
                placeholder="Select"
                isSearchable={true}
              />
            </div> */}
            <div className="form-group col-md-3">
              <label htmlFor="POSItemName" className="form-label mt-4">
                Item Name
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="POSItemName"
                // onChange={(e) => {
                //   setPOSItemname(e.target.value);
                // }}
                // value={positemname}
                {...register("positemname", {
                  required: "Please enter the itemname.",
                })}
              />
              {errors["positemname"] && (
                <span className="text-danger">
                  {errors["positemname"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="ItemDescription" className="form-label mt-4">
                Item Description
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="ItemDescription"
                {...register("itemdescription", {
                  required: "Please enter the item Description.",
                })}
              />
              {errors["itemdescription"] && (
                <span className="text-danger">
                  {errors["itemdescription"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label className="form-label mt-4" htmlFor="itemImageUpload">
                Item Image Upload
              </label>
              <input
                type="file"
                className="form-control"
                name="fileUpload"
                onChange={fileUpload}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="ItemSize" className="form-label mt-4">
                Item Size
              </label>
              <Multiselect
                name="sizeids"
                options={itemSizeList}
                displayValue="itemsize"
                onSelect={selectedValues}
                onRemove={selectedValues}
                selectedValues={itemSizeSelected}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="ItemTypeName" className="form-label mt-4">
                Item Type Name
              </label>
              <select
                className="form-control"
                id="ItemTypeName"
                {...register("typeid", {
                  required: "Please select the item type.",
                })}
              >
                <option value="">-- Please Select --</option>
                {itemTypeList.map((type, index) => {
                  return (
                    <option key={index} value={type.idtype}>
                      {type.itemtype}
                    </option>
                  );
                })}
              </select>
              {errors["typeid"] && (
                <span className="text-danger">
                  {errors["typeid"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="ItemCategory" className="form-label mt-4">
                Item Category
              </label>
              <select
                className="form-control"
                id="ItemCategory"
                {...register("category", {
                  required: "Please select the item category.",
                })}
              >
                (<option value="">-- Please Select --</option>
                <option value="Nonvegetarian">Non-vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Other">Other</option>)
              </select>
              {errors["category"] && (
                <span className="text-danger">
                  {errors["category"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label className="form-label mt-4">Upload audio</label>
              <input
                type="file"
                className="form-control"
                name="audiofile"
                onChange={audioUpload}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="ItemBase" className="form-label mt-4">
                Item Base
              </label>
              <Multiselect
                name="Baseid"
                options={itemBaseList}
                displayValue="basename"
                onSelect={selectedItemBase}
                onRemove={selectedItemBase}
                selectedValues={itemBaseSelected}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="Extraaddonlimit" className="form-label mt-4">
                Extra Addon Limit
              </label>
              <input
                type="number"
                autoComplete="off"
                className="form-control"
                id="Extraaddonlimit"
                {...register("extraaddonlimit", {
                  required: "Please enter extra addon limit.",
                  valueAsNumber: true,
                })}
              />
              {errors["extraaddonlimit"] && (
                <span className="text-danger">
                  {errors["extraaddonlimit"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="removecount" className="form-label mt-4">
                Addon Remove Limit
              </label>
              <input
                type="number"
                autoComplete="off"
                className="form-control"
                id="removecount"
                {...register("defaultremovecount", {
                  required: "Please enter the remove count.",
                  valueAsNumber: true,
                })}
              />
              {errors["defaultremovecount"] && (
                <span className="text-danger">
                  {errors["defaultremovecount"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="defaulttoppings" className="form-label mt-4">
                Default Toppings
              </label>
              <Multiselect
                name="defaulttoppings"
                options={toppinglist}
                displayValue="topingname"
                onSelect={selectedToppingValues}
                onRemove={selectedToppingValues}
                selectedValues={toppingselected}
              />
              {errors["defaulttoppings"] && (
                <span className="text-danger">
                  {errors["defaulttoppings"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-3">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="CreateOwn" className="form-label mt-4">
                    Create Own
                  </label>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="Addonlimit" className="form-label mt-4">
                    Add on limit
                  </label>
                </div>
                <div className="col-sm-6">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onChange={(e) => {
                        setEnableaddon(e.target.checked ? 1 : 0);
                        setAddonlimit(0);
                      }}
                      checked={enableaddon}
                    />
                    <label
                      className="form-check-label"
                      for="flexSwitchCheckDefault"
                    ></label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <input
                    disabled={!enableaddon}
                    type="number"
                    autoComplete="off"
                    className="form-control"
                    id="Addonlimit"
                    onChange={(e) => {
                      setAddonlimit(e.target.value);
                    }}
                    value={addonlimit}
                    ref={input}
                  />
                  {enableaddon && addonlimit === 0
                    ? [
                      <span className="text-danger">
                        Please enter addon limit.
                      </span>,
                    ]
                    : []}
                </div>
              </div>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="DefaultItemSpicy" className="form-label mt-4">
                Default Item Spicy
              </label>
              <select
                className="form-control"
                id="DefaultItemSpicy"
                {...register("defaultspicy", {
                  //required: "Please select the default spicy.",
                })}
                onChange={(e) => {
                  handleSelectedSpicy(e);
                }}
              >
                (<option value="">-- Please Select --</option>
                {itemSpicyList.map((data, index) => {
                  return (
                    <option key={index} value={data.spicyid}>
                      {data.spicyname}
                    </option>
                  );
                })}
                )
              </select>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="spicy" className="form-label mt-4">
                Item Spicy
              </label>
              <Multiselect
                name="Spicyid"
                options={itemSpicyList}
                displayValue="spicyname"
                onSelect={selectedItemSpicy}
                onRemove={selectedItemSpicy}
                selectedValues={itemSpicySelected}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="UOM" className="form-label mt-4">
                UOM
              </label>
              <select
                className="form-control"
                id="UOM"
                {...register("uom", {
                  //required: "Please select uom.",
                })}
              >
                (<option value="C">C</option>
                <option value="UOM">UOM</option>)
              </select>
            </div>

            <hr className="mt-4" />
            <label className="form-label fs-5">Item Available Days</label>
            <div className="d-flex justify-content-between">
              {weekList.map((item, i) => (
                <div className="form-check">
                  <input
                    key={i}
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    checked={item.checked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        let a = weekList.findIndex(
                          (user) => user.dayid === item.dayid
                        );
                        weekList[a].checked = true;
                      } else {
                        let b = weekList.findIndex(
                          (user) => user.dayid === item.dayid
                        );
                        weekList[b].checked = false;
                      }
                      tempfun();
                    }}
                  />
                  <label>{item.dayname}</label>
                </div>
              ))}
            </div>

            <hr className="mt-4" />
            <label className="form-label fs-5">Available Item Fromtime</label>
            <div className="form-group col-md-2">
              <select
                className="form-control"
                id="ItemFromHours"
                {...register("itemfromhours", {
                  //required: "Please select itemfromhours.",
                })}
              >
                (<option value="0">Hours</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>)
              </select>
            </div>
            <div className="form-group col-md-2">
              <select
                className="form-control"
                id="ItemFromMinutes"
                {...register("itemfromminutes", {
                  //required: "Please select itemfromminutes.",
                })}
              >
                (<option value="0">Minutes</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="59">59</option>)
              </select>
            </div>
            <div className="form-group col-md-2">
              <select
                className="form-control"
                id="FromType"
                {...register("fromtype", {
                  //required: "Please select fromtype.",
                })}
              >
                (<option value="">Type</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>)
              </select>
            </div>
            <hr className="mt-4" />
            <label className="form-label fs-5">Available Item Totime</label>
            <div className="form-group col-md-2">
              <select
                className="form-control"
                id="ItemToHours"
                {...register("itemtohours", {
                  //required: "Please select itemtohours.",
                })}
              >
                (<option value="0">Hours</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>)
              </select>
            </div>
            <div className="form-group col-md-2">
              <select
                className="form-control"
                id="ItemToMinutes"
                {...register("itemtominutes", {
                  //required: "Please select itemtominutes.",
                })}
              >
                (<option value="0">Minutes</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="59">59</option>)
              </select>
            </div>
            <div className="form-group col-md-2 mb-4">
              <select
                className="form-control"
                id="ToType"
                {...register("totype", {
                  //required: "Please select totype.",
                })}
              >
                (<option value="">Type</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>)
              </select>
            </div>
            <div className="form-group col-md-6" style={{ display: "none" }}>
              <label className="form-label mt-4" htmlFor="isAddon">
                Is Addon
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isAddon"
                  checked={isAddon === 1}
                  onChange={(e) => {
                    setAddon(e.target.checked ? 1 : 0);
                  }}
                />
              </div>
            </div>
            <div className="form-group col-md-6" style={{ display: "none" }}>
              <label className="form-label mt-4" htmlFor="isAddon">
                Is Modifier
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isModifier"
                  checked={isModifier === 1}
                  onChange={(e) => {
                    setModifier(e.target.checked ? 1 : 0);
                  }}
                />
              </div>
            </div>
            <div className="form-group col-md-6" style={{ display: "none" }}>
              <label htmlFor="applaymodifier" className="form-label mt-4">
                Apply Modifier
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="applaymodifier"
                  checked={isApplayModifier === 1}
                  onChange={(e) => {
                    setApplayModifier(e.target.checked ? 1 : 0);
                  }}
                />
              </div>
            </div>
            <div className="form-group mt-3 mb-2">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.itemcode ? "Update" : "Save"}
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

export default ItemDetails;

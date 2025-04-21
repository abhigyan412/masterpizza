import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import api from "../../../services/api";
import { ITEM_PACKAGE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import AddPackages from "./AddPackages";
import Modal from "react-bootstrap/Modal";

const ItemPackageDetails = ({ selectedRecord, setViewState, setAlert }) => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customeritemcode: selectedRecord?.customeritemcode,
      masteritem: selectedRecord?.itemname,
      masteritemdescription: selectedRecord?.itemdescription,
    },
  });
  const updateStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    minWidth: "8rem",
  };

  const [packages, setPackages] = useState(
    selectedRecord?.packageitems ? JSON.parse(selectedRecord?.packageitems) : []
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);

  const [itemList, setItemList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [temp, setTemp] = useState(0);

  const handleClose = () => {
    setShow(false);
  };
  const tempfun = () => {
    setTemp(Math.random());
  };
  const handleShow = (pack, itemList) => {
    if (selectedRecord?.packageitems) {
      if (pack.itemtypeval && typeof pack.itemtypeval != "object") {
        var itemval = JSON.parse(pack.itemtypeval);
      } else {
        var itemval = pack.itemtypeval;
      }
      for (let i = 0; i < itemList.length; i++) {
        for (let j = 0; j < itemval.length; j++) {
          if (itemList[i].itemid === itemval[j].itemid) {
            itemList[i].checked = true;
          } else {
          }
          tempfun();
        }
      }
    } else {
      for (let i = 0; i < itemList.length; i++) {
        for (let j = 0; j < pack.itemtypeval.length; j++) {
          if (itemList[i].itemid === pack.itemtypeval[j].itemid) {
            itemList[i].checked = true;
          } else {
          }
          tempfun();
        }
      }
      var itemval = itemList;
    }
    tempfun();
    setShow(true);
  };

  const onAddItem = () => {
    let checkedItem = itemList.filter((item) => item.checked === true);
    const result = checkedItem.map(({ itemid, itemname }) => ({
      itemid,
      itemname,
    }));
    packages[selectedIndex].itemtypeval = result;
    setShow(false);
  };

  const updatePackages = (item) => {
    setPackages((prevState) => [
      ...prevState,
      { ...item, serialno: packages.length + 1 },
    ]);
  };

  const fileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  /* Total discount calculation*/
  const cantidad = useMemo(() => {
    return new Array(packages.length).fill(1);
  }, [packages]);
  const totalDiscount = useMemo(() => {
    return packages.reduce((sum, libro, index) => {
      return (
        sum +
        parseFloat(libro.discountamount !== "" ? libro.discountamount : 0) *
          cantidad[index]
      );
    }, 0);
  }, [cantidad, packages]);

  /* Total amount calculation*/
  const totalAmount = useMemo(() => {
    return packages.reduce((sum, libro, index) => {
      return (
        sum +
        parseFloat(libro.unitprice !== "" ? libro.unitprice : 0) *
          cantidad[index]
      );
    }, 0);
  }, [cantidad, packages]);

  const onSave = (values) => {
    if (selectedRecord?.packageitems) {
      for (let index = 0; index < packages.length; index++) {
        if (
          packages[index].itemtypeval &&
          typeof packages[index].itemtypeval != "object"
        ) {
          packages[index].itemtypeval = JSON.parse(packages[index].itemtypeval);
        } else {
          packages[index].itemtypeval = packages[index].itemtypeval;
        }
      }
    }
    let inputData = {
      ...values,
      packagevalues: packages,
      customerid: userDetails("companyid"),
      userid: userDetails("userid"),
    };
    let methodName = ITEM_PACKAGE.ADD;
    if (selectedRecord && selectedRecord.masteritemid) {
      inputData = { ...inputData, masteritemid: selectedRecord.masteritemid };
      methodName = ITEM_PACKAGE.EDIT;
    }
    console.log(inputData);
    let fd = new FormData();
    fd.append("itemdata", JSON.stringify(inputData));
    selectedFile && fd.append("filename", selectedFile, selectedFile.name);
    if (selectedRecord.masteritemid) {
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
  };

  const onRemovePackage = (index) => {
    const filteredArray = packages.filter((item, i) => i !== index);
    console.log(filteredArray);
    setPackages(filteredArray);
    return false;
  };
  console.log("packages: ", packages);

  return (
    <div>
      <LayoutControls
        title={`${
          selectedRecord && selectedRecord.masteritemid ? "Update" : "Create"
        } Item Package Details`}
      />
      <hr />
      <div
        id="style-5"
        className="page-layout row"
        style={{
          overflow: "scroll",
          maxHeight: "410px",
        }}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <fieldset className="row">
            <div className="form-group col-md-6">
              <label htmlFor="customeritemcode" className="form-label mt-4">
                Item Code
              </label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="customeritemcode"
                {...register("customeritemcode", {
                  required: "Please enter the item name.",
                })}
              />
              {errors["customeritemcode"] && (
                <span className="text-danger">
                  {errors["customeritemcode"]["message"]}
                </span>
              )}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="masteritem" className="form-label mt-4">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="masteritem"
                autoComplete="off"
                {...register("masteritem", {
                  required: "Please enter the item name.",
                })}
              />
              {errors["masteritem"] && (
                <span className="text-danger">
                  {errors["masteritem"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label
                htmlFor="masteritemdescription"
                className="form-label mt-4"
              >
                Item Description
              </label>
              <input
                type="text"
                className="form-control"
                id="masteritemdescription"
                autoComplete="off"
                {...register("masteritemdescription", {
                  required: "Please enter the item Description.",
                })}
              />
              {errors["masteritemdescription"] && (
                <span className="text-danger">
                  {errors["masteritemdescription"]["message"]}
                </span>
              )}
            </div>
            <div className="form-group col-md-6 mb-4">
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

            <hr />

            <div className="form-group col-md-12">
              <AddPackages setPackages={updatePackages} />
            </div>
            <div className="form-group col-md-12 mt-4">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Item Type</th>
                    <th style={{ textAlign: "left" }}>Item Name</th>
                    <th style={{ textAlign: "left" }}>Description</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Disc.Type</th>
                    <th>Discount</th>
                    <th>Disc.Amt</th>
                    <th>Unit Price</th>
                    <th>Add Item</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pack, index) => {
                    return (
                      <tr key={index}>
                        <td align="center">{pack.itemtypename}</td>
                        <td align="center">{pack.itemname}</td>
                        <td align="center">{pack.description}</td>
                        <td align="center">
                          {pack.itemsize === "" ? 0 : pack.itemsize}
                        </td>
                        <td align="center">{pack.itemprice}</td>
                        <td align="center">
                          {pack.discounttype === 1
                            ? "Percentage"
                            : pack.discounttype === 2
                            ? "Amount"
                            : "None"}
                        </td>
                        <td align="right">
                          {pack.discount === "" ? 0 : pack.discount}
                        </td>
                        <td align="right">
                          {pack.discountamount === "" ? 0 : pack.discountamount}
                        </td>
                        <td align="right">
                          {pack.unitprice === "" ? 0 : pack.unitprice}
                        </td>
                        <td align="center">
                          <div style={updateStyle}>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setSelectedIndex(index);
                                api
                                  .get(
                                    ITEM_PACKAGE.ITEM_NAME +
                                      "?restaurantid=" +
                                      userDetails("companyid") +
                                      "&itemtype=" +
                                      pack.itemtype
                                  )
                                  .then((response) => {
                                    setItemList(response.data.data.data);
                                    tempfun();
                                    handleShow(pack, response.data.data.data);
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              }}
                            >
                              {selectedRecord?.packageitems &&
                              typeof pack.itemtypeval != "object"
                                ? JSON.parse(pack.itemtypeval).length
                                : pack.itemtypeval.length}
                            </span>
                            <FaIcons.FaPlus
                              title="Add item"
                              style={{
                                cursor: "pointer",
                                color: "#2e6a5d",
                              }}
                              onClick={() => {
                                setSelectedIndex(index);
                                api
                                  .get(
                                    ITEM_PACKAGE.ITEM_NAME +
                                      "?restaurantid=" +
                                      userDetails("companyid") +
                                      "&itemtype=" +
                                      pack.itemtype
                                  )
                                  .then((response) => {
                                    setItemList(response.data.data.data);
                                    tempfun();
                                    handleShow(pack, response.data.data.data);
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              }}
                            />
                          </div>
                        </td>
                        <td align="center">
                          <button
                            type="button"
                            className="btn btn-danger btn-rounded btn-icon"
                            title="Remove"
                            onClick={() => onRemovePackage(index)}
                          >
                            <FaIcons.FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr align="center">
                    <td colSpan={7}></td>
                    <td colSpan={1}>
                      Total:
                      <span style={{ fontWeight: 600 }}>
                        &nbsp;${totalDiscount.toFixed(2)}
                      </span>
                    </td>
                    <td colSpan={1}>
                      Total:
                      <span style={{ fontWeight: 600 }}>
                        &nbsp;${totalAmount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="form-group mt-3 mb-2">
              <button type="submit" className="btn btn-primary">
                {selectedRecord && selectedRecord.masteritemid
                  ? "Update"
                  : "Save"}
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Add Item
          </h1>
        </Modal.Header>
        <Modal.Body className="d-flex flex-wrap modal-body">
          {itemList.map((item, i) => (
            <div className="form-check m-3">
              <input
                key={i}
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={item.checked}
                onChange={(e) => {
                  tempfun();
                  if (e.target.checked) {
                    let a = itemList.findIndex(
                      (user) => user.itemid === item.itemid
                    );
                    itemList[a].checked = true;
                  } else {
                    let b = itemList.findIndex(
                      (user) => user.itemid === item.itemid
                    );
                    itemList[b].checked = false;
                  }
                }}
              />
              <label>{item.itemname}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={onAddItem}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemPackageDetails;

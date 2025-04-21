import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/ItemMasterUtils";
import api from "../../../services/api";
import { ITEM_MASTER } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import AlertMessage from "../../../components/toast/AlertMessage";
import Modal from "react-bootstrap/Modal";

const ViewItemMaster = ({
  setViewState,
  columns,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
  refreshPage,
}) => {
  const changeViewState = () => setViewState(false);
  const [isViewSearch, setViewSearch] = useState(false);
  const changeViewSearch = () => {
    setViewSearch(true);
  };
  const [alert, setAlert] = useState({ isDisplay: false });
  const [show, setShow] = useState(false);
  const [addinstruction, setAddinstruction] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    api
      .get(ITEM_MASTER.LOADINSTRUCTION + userDetails("companyid"))
      .then((response) => {
        setAddinstruction(response.data.data.resultset[0].instruction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    // setAddinstruction("");
  };
  // const refreshOrders = (record) => {
  //   recordList();
  // };

  const onDownload = () => {
    api
      .get(ITEM_MASTER.DOWNLOAD + userDetails("companyid"))
      .then((response) => {
        let { status, message } = response.data.data;
        if (response.data.data.status === 1) {
          if (response.data.data.message.split("¶").length > 0) {
            window.open(response.data.data.message, "_self");
          }
        } else {
          setAlert({ isDisplay: true, status, message });
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const openModal = () => {
    setShow(true);
  };
  const addInstruction = () => {
    //debugger;
    if (addinstruction !== "") {
      let params = {
        customerid: userDetails("companyid"),
        instruction: addinstruction,
      };
      api
        .post(ITEM_MASTER.ADDINSTRUCTION, params)
        .then((response) => {
          let { status, message } = response.data.data;
          if (response.data.data.status === 1) {
            setAlert({ isDisplay: true, status, message });
            status === 1 && setViewState(true);
            setShow(false);
          } else {
            setAlert({ isDisplay: true, status, message });
            status === 1 && setViewState(true);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      inputRef.current.focus();
    }
  };

  const manageOptions = [
    {
      title: <FaIcons.FaPlus />,
      props: {
        className: "btn btn-primary btn-rounded btn-icon",
        title: "Create",
        onClick: changeViewState,
      },
    },
    {
      title: <FaIcons.FaItalic />,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "Instruction",
        onClick: openModal,
      },
    },
    {
      title: <FaIcons.FaSearch />,
      props: {
        className: "btn btn-warning btn-rounded btn-icon",
        title: "Search",
        onClick: changeViewSearch,
      },
    },
    {
      title: <FaIcons.FaDownload />,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
        title: "Export",
        onClick: onDownload,
      },
    },
  ];

  const searchParams = (values) => {
    console.log(values);

    values = { ...values, pagesize: 8 };
    changeRecordList({ type: "search", value: values });
  };

  return (
    <div className="content-shrink">
      <LayoutControls title="Item List" options={manageOptions} />
      <hr />
      {isViewSearch && (
        <SearchForm
          setViewSearch={setViewSearch}
          searchParams={searchParams}
          searchFieldSet={searchFieldSet}
        />
      )}
      <ViewDataTable
        columns={columns}
        data={recordList}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={pageDetails}
      />

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            Add Instruction
          </h1>
        </Modal.Header>
        <Modal.Body className="d-flex flex-wrap modal-body">
          <textarea
            className="form-control"
            rows={3}
            placeholder="text here..."
            onChange={(event) => {
              setAddinstruction(event.target.value);
            }}
            value={addinstruction}
            style={{ cursor: "auto" }}
            ref={inputRef}
          />
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={addInstruction}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
      <AlertMessage {...alert} setAlert={setAlert} />
    </div>
  );
};

export default ViewItemMaster;

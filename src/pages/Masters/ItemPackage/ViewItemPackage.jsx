import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/ItemPackageUtils";
import api from "../../../services/api";
import { ITEM_PACKAGE } from "../../../utils/ApiMethods";
import { userDetails } from "../../../utils/Generic";
import AlertMessage from "../../../components/toast/AlertMessage";

const ViewItemPackage = ({
  setViewState,
  columns,
  actionItems,
  recordList,
  totalRecordCount,
  changeRecordList,
  pageDetails,
}) => {
  const changeViewState = () => setViewState(false);
  const [isViewSearch, setViewSearch] = useState(false);
  const changeViewSearch = () => {
    setViewSearch(true);
  };
  const [alert, setAlert] = useState({ isDisplay: false });

  const onDownload = () => {
    api
      .get(ITEM_PACKAGE.DOWNLOAD + userDetails("companyid"))
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

    values = { ...values, pageno: 1, pagesize: pageDetails.pagesize };
    changeRecordList({ type: "search", value: values });
  };

  return (
    <div className="content-shrink">
      <LayoutControls title="Item Package List" options={manageOptions} />
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
      <AlertMessage {...alert} setAlert={setAlert} />
    </div>
  );
};

export default ViewItemPackage;

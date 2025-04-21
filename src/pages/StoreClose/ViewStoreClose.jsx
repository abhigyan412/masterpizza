import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../components/generic/LayoutControls";
import SearchForm from "../../components/search/SearchForm";
import ViewDataTable from "../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../utils/StoreClose/StorecloseUtils";

const ViewStoreClose = ({
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

  const manageOptions = [
    // {
    //   title: <FaIcons.FaPlus />,
    //   props: {
    //     className: "btn btn-primary btn-rounded btn-icon",
    //     title: "Create",
    //     onClick: changeViewState,
    //   },
    // },
  ];

  const searchParams = (values) => {
    console.log(values);

    values = { ...values, pageno: 1, pagesize: pageDetails.pagesize };
    changeRecordList({ type: "search", value: values });
  };
  return (
    <div className="content-shrink">
      <LayoutControls title="Store Close" options={manageOptions} />
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
    </div>
  );
};

export default ViewStoreClose;

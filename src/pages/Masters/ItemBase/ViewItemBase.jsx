import React, { useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/ItemBaseUtils";
// ../../../utils/Master/ItemBaseUtils
const ViewItemPrice = ({
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
  const [clientsearch, setClientsearch] = useState(true);
  const [reclist, setReclist] = useState([]);
  const changeViewSearch = () => {
    setViewSearch(true);
  };
  useEffect(() => {
    setReclist(recordList);
  }, [recordList]);

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
      },
    },
  ];

  const searchParams = (values) => {
    //debugger;
    // values = { ...values, pageno: 1, pagesize: pageDetails.pagesize };
    // changeRecordList({ type: "search", value: values });
    var result = recordList;
    result = result.filter((stu) => {
      return (
        stu.Basename.toLowerCase().includes(values.toLowerCase()) ||
        stu.Basecode.toLowerCase().includes(values.toLowerCase())
      );
    });
    setReclist(result);
  };
  return (
    <div className="content-shrink">
      <LayoutControls title="Item Base List" options={manageOptions} />
      <hr />
      {isViewSearch && (
        <SearchForm
          setViewSearch={setViewSearch}
          searchParams={searchParams}
          searchFieldSet={searchFieldSet}
          clientSearch={clientsearch}
        />
      )}
      <ViewDataTable
        columns={columns}
        data={reclist}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={pageDetails}
      />
    </div>
  );
};

export default ViewItemPrice;

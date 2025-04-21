import React, { useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import LayoutControls from "../../../components/generic/LayoutControls";
import SearchForm from "../../../components/search/SearchForm";
import ViewDataTable from "../../../components/tables/ViewDataTable";
import { searchFieldSet } from "../../../utils/Master/ToppingUtils";

const ViewTopping = ({
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
  const [Reclist, setReclist] = useState([]);
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
        onClick: changeViewState,
      },
    },
    {
      title: <FaIcons.FaSearch />,
      props: {
        className: "btn btn-warning btn-rounded btn-icon",
        onClick: changeViewSearch,
      },
    },
    {
      title: <FaIcons.FaDownload />,
      props: {
        className: "btn btn-secondary btn-rounded btn-icon",
      },
    },
  ];

  const searchParams = (values) => {
    //debugger;
    var result = recordList;
    result = result.filter((stu) => {
      return (
        stu.Topingname.toLowerCase().includes(values.toLowerCase()) ||
        stu.Custoemritemcode.toLowerCase().includes(values.toLowerCase())
      );
    });
    setReclist(result);
  };

  return (
    <div className="content-shrink">
      <LayoutControls title="Topping List" options={manageOptions} />
      <hr />
      {isViewSearch && (
        <SearchForm
          setViewSearch={setViewSearch}
          searchParams={searchParams}
          searchFieldSet={searchFieldSet}
          clientSearch={clientsearch}
          searchval={searchParams}
        />
      )}
      <ViewDataTable
        columns={columns}
        data={Reclist}
        actionItems={actionItems}
        noofRecords={totalRecordCount}
        changeRecordList={changeRecordList}
        pageDetails={pageDetails}
      />
    </div>
  );
};
export default ViewTopping;

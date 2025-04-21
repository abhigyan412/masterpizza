import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

const TablePagination = ({ totalRecords, pageDetails, changeRecordList }) => {
  let { pageno, pagesize } = pageDetails;
  return (
    <div>
      {pagesize != -1
        ? [
            <div className="foot-pagination">
              <div>
                <span>
                  Page No. {pageno} of{" "}
                  {pagesize === -1 ? 1 : Math.ceil(totalRecords / pagesize)}
                </span>
              </div>
              <ul className="pagination">
                <li className="page-item">
                  <Link
                    to="#"
                    onClick={() =>
                      changeRecordList({ type: "pagesize", value: 5 })
                    }
                    className={`page-link ${pagesize === 5 && "active"}`}
                  >
                    5
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    to="#"
                    onClick={() =>
                      changeRecordList({ type: "pagesize", value: 10 })
                    }
                    className={`page-link ${pagesize === 10 && "active"}`}
                  >
                    10
                  </Link>
                </li>
                <li className="page-item">
                  <Link
                    to="#"
                    onClick={() =>
                      changeRecordList({ type: "pagesize", value: 25 })
                    }
                    className={`page-link ${pagesize === 25 && "active"}`}
                  >
                    25
                  </Link>
                </li>
              </ul>
              <ul className="pagination">
                <li className={`page-item ${pageno === 1 && "disabled"}`}>
                  <Link
                    className="page-link"
                    to="#"
                    title="First Page"
                    onClick={() =>
                      changeRecordList({ type: "pageno", value: 1 })
                    }
                  >
                    <FaIcons.FaFastBackward />
                  </Link>
                </li>

                <li className={`page-item ${pageno === 1 && "disabled"}`}>
                  <Link
                    className="page-link"
                    to="#"
                    title="Prev Page"
                    onClick={() =>
                      changeRecordList({ type: "pageno", value: pageno - 1 })
                    }
                  >
                    <FaIcons.FaArrowLeft />
                  </Link>
                </li>
                <li
                  className={`page-item ${
                    pageno === Math.ceil(totalRecords / pagesize) && "disabled"
                  }`}
                >
                  <Link
                    className="page-link"
                    to="#"
                    title="Next Page"
                    onClick={() =>
                      changeRecordList({ type: "pageno", value: pageno + 1 })
                    }
                  >
                    <FaIcons.FaArrowRight />
                  </Link>
                </li>
                <li
                  className={`page-item ${
                    pageno === Math.ceil(totalRecords / pagesize) && "disabled"
                  }`}
                >
                  <Link
                    className="page-link"
                    to="#"
                    title="Last Page"
                    onClick={() =>
                      changeRecordList({
                        type: "pageno",
                        value: Math.ceil(totalRecords / pagesize),
                      })
                    }
                  >
                    <FaIcons.FaFastForward />
                  </Link>
                </li>
              </ul>
            </div>,
          ]
        : []}
    </div>
  );
};

export default TablePagination;

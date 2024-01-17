import React, { useRef, useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.scss";

const rowsSize = [5, 10, 20, 50];

type Props = {
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  size: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
};

export const TableHeader: React.FC<Props> = ({
  rowsPerPage,
  setRowsPerPage,
  size,
  currentPage,
  setCurrentPage,
  pageCount,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const getPrevTab = () => {
    if (currentPage === 0) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const getNextTab = () => {
    if (currentPage === pageCount - 1) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  let dataInfo;

  if (size) {
    dataInfo = `${rowsPerPage * currentPage + 1}-${
      rowsPerPage * (currentPage + 1) >= size
        ? size
        : rowsPerPage * (currentPage + 1)
    }`;
  } else {
    dataInfo = 0;
  }

  return (
    <div className={classes.TableHeader}>
      <div
        className={classes.rowsPerPage}
        ref={dropdownContainerRef}
        onClick={toggleDropdown}
      >
        Rows per page:
        <span> {rowsPerPage}</span>
        <div
          className={classNames(classes.arrow, {
            [classes.arrowUp]: isDropdownVisible,
          })}
        />
        {isDropdownVisible && (
          <ul className={classes.dropdown} ref={dropdownRef}>
            {rowsSize.map((number) => (
              <li
                className={classNames({
                  [classes.active]: rowsPerPage === number,
                })}
                onClick={() => setRowsPerPage(number)}
                key={number}
              >
                {number}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.paginationContainer}>
        <div className={classes.itemsNumber}>
          {dataInfo}
          <span> of </span>
          {size}
        </div>
        <div className={classes.pagination}>
          <div
            className={classNames(classes.prev, {
              [classes.active]: currentPage !== 0 && size,
            })}
            onClick={getPrevTab}
          />
          <div
            className={classNames(classes.next, {
              [classes.active]: currentPage !== pageCount - 1 && size,
            })}
            onClick={getNextTab}
          />
        </div>
      </div>
    </div>
  );
};

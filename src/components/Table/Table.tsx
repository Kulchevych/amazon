import React, { useEffect, useMemo, useState } from "react";
import classes from "./styles.module.scss";

import { Account } from "../../types/Account";
import { Campaign } from "../../types/Campaign";
import { Profile } from "../../types/Profile";
import { TableHeader } from "./TableHeader";
import classNames from "classnames";

type TableColumn = {
  label: string;
  key: string;
};

type Entity = Account | Profile | Campaign;

type Props = {
  data: Entity[];
  columns: Array<TableColumn>;
  onRowClick?: (id: string) => void;
};

export const Table: React.FC<Props> = ({ data, columns, onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [visibleData, setVisibleData] = useState<Entity[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm, data]
  );

  const sortedData = useMemo(
    () =>
      sortColumn
        ? [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn as keyof Entity] as string | number;
            const bValue = b[sortColumn as keyof Entity] as string | number;

            switch (true) {
              case typeof aValue === "string" && typeof bValue === "string":
                return sortOrder === "asc"
                  ? aValue.localeCompare(bValue)
                  : bValue.localeCompare(aValue);
              case typeof aValue === "number" && typeof bValue === "number":
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
              default:
                return 0;
            }
          })
        : filteredData,
    [sortOrder, sortColumn, filteredData]
  );

  const pageCount = Math.ceil(sortedData.length / rowsPerPage);

  useEffect(() => {
    if (pageCount === 0) {
      setCurrentPage(0);

      return;
    }
    if (currentPage >= pageCount) {
      setCurrentPage(pageCount - 1);
    }
  }, [currentPage, pageCount, rowsPerPage]);

  useEffect(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    setVisibleData(sortedData?.slice(startIndex, endIndex));
  }, [currentPage, rowsPerPage, sortedData]);

  return (
    <div className={classes.Table}>
      <div>
        <input
          className="form-control rounded"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {visibleData?.length || data.length ? (
        <div className={classes.tableContainer}>
          <TableHeader
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            size={sortedData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />

          <table className="table table-bordered">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    className={classNames({
                      [classes.active]: sortColumn === column.key,
                    })}
                    key={column.key}
                    onClick={() => {
                      setSortColumn(column.key);
                      setSortOrder(
                        sortColumn === column.key && sortOrder === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    {column.label}
                    {sortColumn === column.key && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleData.map((row) => (
                <tr
                  key={row[columns[0].key as keyof Entity]}
                  onClick={() =>
                    onRowClick?.(row[columns[0].key as keyof Entity])
                  }
                >
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key as keyof Entity]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span className={classes.noData}>No match for your search term</span>
      )}
    </div>
  );
};

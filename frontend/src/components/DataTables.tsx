import React, { useState } from "react";
type Column = {
  header: string;
  accessor: string;
  formatter?: (value: any) => React.ReactNode;
};

type Row = {
  [key: string]: string | number;
};

type DataTableProps = {
  columns: Column[];
  data: Row[];
  pageSize?: number;
};

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    columns.some((column) =>
      String(row[column.accessor])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg mx-1 ${
            currentPage === i
              ? "dark:bg-blue-600 bg-blue-600 text-white"
              : "dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800"
          } hover:dark:bg-blue-600 hover:bg-blue-600 hover:text-white transition-all`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="overflow-x-auto rounded-sm shadow-sm dark:bg-gray-800 dark:text-white bg-white text-gray-900">
      {/* Search Input */}
      <div className="p-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page when searching
          }}
          className="w-1/4 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="w-full">
        {/* Table Header */}
        <thead>
          <tr className="dark:bg-gray-700 bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-300 text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "dark:bg-gray-800 bg-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  : "dark:bg-gray-700 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 text-sm dark:text-gray-200 text-gray-700"
                >
                  {column.formatter
                    ? column.formatter(row[column.accessor])
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="p-4 flex justify-between items-center dark:bg-gray-800 bg-gray-100 ">
        <div>
          <span className="text-sm">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:dark:bg-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            }`}
          >
            Previous
          </button>
          <div className="flex space-x-1">{renderPageNumbers()}</div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:dark:bg-blue-600 hover:bg-blue-600 hover:text-white transition-all"
            } `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useAsyncDebounce, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import "./ReactTable.css";

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
});


const ReactTable = ({ columns, data }) => {
  const [filterInput, setFilterInput] = useState("");
  // const [globalFilter, setGlobalFilter] = useState("")

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    setFilter,
    globalFilter,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    { 
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    });

  // const [value, setValue] = useState(globalFilter)

  const handleFilterChange = e => {
    const value = e.target.value;
    setGlobalFilter(value)
    setFilterInput(value);
  };

  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 500)

  return (
    <>
        <div className="search-container">
          <input
          className="search-bar"
          value={filterInput || ""}
          onChange={handleFilterChange}
          placeholder=" Search..."
          />
          <span className="underline"></span>
        </div>
        <div className="divider-container"></div>
        <table className="dodgers-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(event) => {
                const page = event.target.value ? Number(event.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "100px" }}
              />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value))
            }}
          >
            {[25, 50, 75, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
     
    </>
  )
};

export default ReactTable;
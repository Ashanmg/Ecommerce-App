import React, { useMemo } from 'react';
import CN from 'classnames';
import { useSortBy, useTable, usePagination, useRowSelect } from 'react-table';

import './UITable.scss';
import UITablePagination from './UITablePagination';
import { Checkbox } from '../Checkbox';

export const UITable = ({
  className,
  COLUMNS,
  DATA,
  onChangePageSize,
  pageSize,
  pageCount,
  pageNumber,
  canNextPage,
  canPreviousPage,
  handleNextPage,
  handlePreviousPage,
  allowRowSelection = true,
  ...restProps
}) => {
  const UITableClasses = CN('ui-table', className, {});

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    pageOptions,
    state,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  return (
    <div className="h-full bg-white ui-table__wrapper">
      <div className={CN(UITableClasses, 'flex')} {...restProps}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '' : '▲') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UITablePagination
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        nextPage={handleNextPage}
        onChangePageSize={onChangePageSize}
        pageCount={pageCount}
        pageIndex={pageNumber}
        pageOptions={pageOptions}
        previousPage={handlePreviousPage}
        tableData={data}
        pageSize={pageSize}
      />
    </div>
  );
};
UITable.defaultProps = {
  className: undefined,
};

export default UITable;

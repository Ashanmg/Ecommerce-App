/* eslint-disable */
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Button from '../../Button/Button';
import CN from 'classnames';

export const UITablePagination = ({
  canNextPage,
  canPreviousPage,
  nextPage,
  onChangePageSize,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize = 10,
  previousPage,
  tableData,
}) => {
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  const currentPageNumber = pageIndex + 1;
  const dataLength = tableData?.length;
  const lastPageNumber = Math.ceil(dataLength / pageSize);

  return (
    <div className="flex w-full bottom-[32px] items-center px-3 py-5 ui-table__pagination border-b border-N-300 text-bodyText2 bg-N-200 text-N-800">
      <span>
        Showing {startRow + 1} to{' '}
        {lastPageNumber === currentPageNumber ? dataLength : endRow} of{' '}
        {dataLength} entries
      </span>
      <div className="flex items-center ml-auto ui-table__pagination__actions">
        <div className="flex items-center">
          <div className="ui-table__dropdown">
            <select value={pageSize} onChange={onChangePageSize}>
              {[2, 30, 50, 100, 500].map((pageSizeValue) => {
                return (
                  <option key={pageSizeValue} value={pageSizeValue}>
                    {pageSizeValue}
                  </option>
                );
              })}
            </select>
            <i className="ml-2 ri-arrow-down-s-line" />
          </div>

          <span className="px-3 mr-2">
            {currentPageNumber} of {pageCount}
          </span>
        </div>

        <Button
          className="mr-1 p-1 border-N-100 border bg-N-100 rounded-sm"
          appearance="text"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <RiArrowLeftSLine className={CN({'text-N-200': !canPreviousPage})} />
        </Button>

        <Button
          className="mr-1 p-1 border-N-100 border bg-N-100 rounded-sm"
          appearance="neutral"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <RiArrowRightSLine className={CN({'text-N-200': !canNextPage})} />
        </Button>
      </div>
    </div>
  );
};

export default UITablePagination;

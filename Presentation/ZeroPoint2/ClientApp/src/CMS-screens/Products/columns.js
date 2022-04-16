import { format } from 'date-fns';
import { RiBallPenFill } from 'react-icons/ri';
import Button from '../../components/Button/Button';

import React from 'react';

const columns = (handleEditPage) => {

  const COLUMNS = [
    {
      Header: 'Product',
      accessor: 'productImageUrls[0]',
      Cell: ({ value }) => {
        return (
          <img
            src={
              value ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmiZAtFi2gN6KL72opkl7HfU3bE72toRGKgVir_4qUNcH5ZJ6d-ILi3rXaAs1Ci4T3hxQ&usqp=CAU'
            }
            className="w-12 h-12"
            alt="img"
          />
        );
      },
    },
    {
      Header: 'Product Name',
      accessor: 'name',
    },
    {
      Header: 'SKU',
      accessor: 'sku',
    },
    {
      Header: 'Price',
      accessor: 'retailPrice',
    },
    {
      Header: 'Stock Quantity',
      accessor: 'availableQuantity',
    },
    {
      Header: 'Published',
      accessor: 'published',
      Cell: ({ value }) => {
        return value ? 'Yes' : 'No';
      },
    },
    {
      Header: 'Edit',
      accessor: 'id',
      Cell: ({value}) => {
        return (
          <Button
            children="Edit"
            beforeIcon={<RiBallPenFill />}
            className="flex items-center px-3 text-xs text-white border-2 rounded-sm gap-x-1 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
            onClick={() => handleEditPage(value)}
          />
        );
      },
    },
  ];

  return COLUMNS;
};

export default columns;

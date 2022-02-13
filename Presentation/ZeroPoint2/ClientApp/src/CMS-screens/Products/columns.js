import { format } from 'date-fns';
import { RiBallPenFill } from 'react-icons/ri';
import Button from '../../components/Button/Button';

export const COLUMNS = [
  {
    Header: 'Product',
    accessor: 'productImageUrls[0]',
    Cell: ({ value }) => {
      return <img src={value} className="w-12 h-12" alt="img" />;
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
    Cell: () => {
      return (
        <Button
          children="Edit"
          beforeIcon={<RiBallPenFill />}
          className="items-center flex gap-x-1 px-3 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark rounded-sm"
          onClick={() => {}}
        />
      );
    },
  },
];
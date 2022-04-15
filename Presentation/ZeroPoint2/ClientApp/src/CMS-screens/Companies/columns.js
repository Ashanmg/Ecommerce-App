import { format } from 'date-fns';
import { RiBallPenFill } from 'react-icons/ri';
import Button from '../../components/Button/Button';

export const COLUMNS = [
  {
    Header: 'Company',
    accessor: 'logoImageUrl',
    Cell: ({ value }) => {
      return <img src={value} className="w-12 h-12" alt="img" />;
    },
  },
  {
    Header: 'Company Name',
    accessor: 'companyName',
  },
  {
    Header: 'Published',
    accessor: 'isPublished',
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
          className="flex items-center h-auto px-3 text-xs text-white border-2 rounded-sm gap-x-1 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          onClick={() => {}}
        />
      );
    },
  },
];

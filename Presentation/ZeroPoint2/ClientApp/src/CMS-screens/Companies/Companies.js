import React, { useState, useEffect } from 'react';
import CN from 'classnames';
import Button from '../../components/Button/Button';
import Loader from 'react-spinners/PuffLoader';

import './Companies.scss';
import UITable from '../../components/CMS-components/UITable/UITable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { COLUMNS } from './columns';
import { toast, Flip } from 'react-toastify';

export const Companies = ({ className, ...restProps }) => {
  const CompaniesClasses = CN('companies', className, {});

  const errorToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'error',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const SuccessToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'success',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);

  const { isLoading } = useState(false);

  const array1 = [
    {
      companyLogoUrl: '',
      name: 'Company1',
      published: 'Yes',
    },
    {
      companyLogoUrl: '',
      name: 'Company2',
      published: 'Yes',
    },
    {
      companyLogoUrl: '',
      name: 'Company3',
      published: 'Yes',
    },
  ];
  return (
    <div className={(CompaniesClasses, 'flex flex-col')} {...restProps}>
      <div className="dashboard_title text-G-dark font-bold text-3xl w-full mb-2">
        Companies
      </div>
      <div className="product__add -item-btn flex justify-end mb-2">
        <Button
          children="Add Company"
          className="items-center px-5 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark rounded-sm"
          onClick={() => navigate('/admin/product-upload')}
        />
      </div>
      <div className="product__table">
        {isLoading ? (
          <div className="w-full h-auto flex justify-center items-center">
            <Loader type="Grid" color="#1c473c" size={60} />
          </div>
        ) : (
          <UITable
            COLUMNS={COLUMNS}
            DATA={companies?.data || array1}
            //onChangePageSize={handlePageSizeChange}
            pageSize={pageSize}
            pageCount={pageCount}
            pageNumber={pageNumber - 1}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            //handleNextPage={handleNextPage}
            //handlePreviousPage={handlePreviousPage}
          />
        )}
      </div>
    </div>
  );
};

Companies.defaultProps = {
  className: undefined,
};

export default Companies;

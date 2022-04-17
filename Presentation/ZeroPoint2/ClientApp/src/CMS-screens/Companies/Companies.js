import React, { useState, useEffect } from 'react';
import CN from 'classnames';
import Button from '../../components/Button/Button';
import Loader from 'react-spinners/PuffLoader';

import './Companies.scss';
import UITable from '../../components/CMS-components/UITable/UITable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import columns from './columns';
import { toast, Flip } from 'react-toastify';
import {
  getAllCompaniesListFail,
  getAllCompaniesListPending,
  getAllCompaniesListSuccess,
} from '../../features/getAllCompaniesSlice';
import { getAllCompanyList, removeCompany } from '../../api/companyApi';
import {
  companyRemoveFail,
  companyRemovePending,
  companyRemoveSuccessful,
} from '../../features/companyRemoveSlice';

export const Companies = ({ className, ...restProps }) => {
  const CompaniesClasses = CN('companies', className, {});

  const errorToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'error',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const SuccessToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'success',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(30);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [removeCompanies, setRemoveCompanies] = useState([]);

  const { isLoading } = useSelector((state) => state.getAllCompanies);
  const {isLoading: companyRemoveLoading } = useSelector((state) => state.companyRemove); 

  useEffect(async () => {
    dispatch(getAllCompaniesListPending());
    try {
      const data = await getAllCompanyList(pageSize, pageNumber);
      setCompanies(data);
      dispatch(getAllCompaniesListSuccess());
    } catch (error) {
      dispatch(getAllCompaniesListFail(error));
      errorToast('Error loading companies list');
    }
  }, []);

  /** handle remove company */
  const handleRemoveCompany = async () => {
    const removeIds = removeCompanies.map((company) => company.id);
    dispatch(companyRemovePending());
    try {
      const data = await removeCompany(removeIds);
      dispatch(companyRemoveSuccessful());
    } catch (error) {
      dispatch(companyRemoveFail(error));
      errorToast('Error loading companies list');
    }
  };

  //pagination handle
  const handlePageSizeChange = async (e) => {
    setPageSize(e.target.value);
    setPageNumber(1);
  };

  useEffect(() => {
    //page count
    const pageCountCopy = companies?.totalCount / pageSize;
    setPageCount(Math.ceil(pageCountCopy));

    //can next page
    const canNextPageCopy = companies?.totalCount - pageSize * pageNumber > 0;
    setCanNextPage(canNextPageCopy);

    //can previous page
    const canPreviousPageCopy = pageNumber > 1;
    setCanPreviousPage(canPreviousPageCopy);
  }, [pageSize, companies, pageNumber]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleEditPage = (id) => {
    navigate(`/admin/company-edit/${id}`);
  };

  /* Setup Columns */
  const cols = React.useMemo(() => columns(handleEditPage), []);

  return (
    <div className={(CompaniesClasses, 'flex flex-col')} {...restProps}>
      <div className="w-full mb-2 text-3xl font-bold dashboard_title text-G-dark">
        Companies
      </div>
      <div className="flex justify-end mb-2 gap-x-2 product__add -item-btn">
        {removeCompanies.length > 0 && (
          <Button
            children="Delete Company"
            isLoading={companyRemoveLoading}
            className="items-center px-5 text-xs text-white border-2 rounded-sm h-7 w-max md:h-8 lg:h-10 bg-R-500 lg:text-sm border-R-500 hover:bg-white hover:text-R-500"
            onClick={handleRemoveCompany}
          />
        )}

        <Button
          children="Add Company"
          className="items-center px-5 text-xs text-white border-2 rounded-sm h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          onClick={() => navigate('/admin/company-registration')}
        />
      </div>
      <div className="product__table">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-auto">
            <Loader type="Grid" color="#1c473c" size={60} />
          </div>
        ) : (
          companies.data && (
            <UITable
              COLUMNS={cols}
              DATA={companies?.data || []}
              onChangePageSize={handlePageSizeChange}
              onChange={(rows) => setRemoveCompanies(rows)}
              pageSize={pageSize}
              pageCount={pageCount}
              pageNumber={pageNumber - 1}
              canNextPage={canNextPage}
              canPreviousPage={canPreviousPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
            />
          )
        )}
      </div>
    </div>
  );
};

Companies.defaultProps = {
  className: undefined,
};

export default Companies;

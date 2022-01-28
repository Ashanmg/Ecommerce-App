import React, { useEffect } from 'react';
import CN from 'classnames';
import Button from '../../components/Button/Button';
import Loader from 'react-spinners/PuffLoader';

import './Products.scss';
import UITable from '../../components/CMS-components/UITable/UITable';
import { COLUMNS } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProductFail,
  getAllProductPending,
  getAllProductSuccess,
} from '../../features/getAllProductSlice';
import { toast, Flip } from 'react-toastify';
import { getAllProducts } from '../../api/productApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Products = ({ className, ...restProps }) => {
  const ProductsClasses = CN('products flex flex-col', className, {});

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

  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);

  const {
    isLoading,
    isSuccessFul,
    products: productsList,
    error,
  } = useSelector((state) => state.getAllProduct);

  useEffect(async () => {
    dispatch(getAllProductPending());
    try {
      const products = await getAllProducts(pageSize, pageNumber);
      setProducts(products);
      dispatch(getAllProductSuccess(products));
    } catch (error) {
      errorToast('Product category fetching failed');
      dispatch(getAllProductFail(error.message));
    }
  }, [pageSize, pageNumber]);

  //pagination handle
  const handlePageSizeChange = async (e) => {
    setPageSize(e.target.value);
    setPageNumber(1);
  };

  useEffect(() => {
    //page count
    const pageCountCopy = products?.totalCount / pageSize;
    setPageCount(Math.ceil(pageCountCopy));

    //can next page
    const canNextPageCopy = products?.totalCount - pageSize * pageNumber > 0;
    setCanNextPage(canNextPageCopy);

    //can previous page
    const canPreviousPageCopy = pageNumber > 1;
    setCanPreviousPage(canPreviousPageCopy);
  }, [pageSize, products, pageNumber]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <div className={ProductsClasses} {...restProps}>
      <div className="dashboard_title text-G-dark font-bold text-3xl w-full mb-2">
        Products
      </div>
      <div className="product__add -item-btn flex justify-end mb-2">
        <Button
          children="Add Product"
          className="items-center px-5 text-xs text-white border-2 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark rounded-sm"
          onClick={() => navigate('/admin/product-upload')}
        />
      </div>
      <div className="product__table">
        {isLoading ? (
          <div className='w-full h-auto flex justify-center items-center'>
            <Loader type="Grid" color="#1c473c" size={60} />
          </div>
        ) : (
          <UITable
            COLUMNS={COLUMNS}
            DATA={products?.data || []}
            onChangePageSize={handlePageSizeChange}
            pageSize={pageSize}
            pageCount={pageCount}
            pageNumber={pageNumber - 1}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </div>
    </div>
  );
};

Products.defaultProps = {
  className: undefined,
};

export default Products;

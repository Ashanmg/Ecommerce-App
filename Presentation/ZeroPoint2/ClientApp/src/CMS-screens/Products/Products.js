import React, { useEffect } from 'react';
import CN from 'classnames';
import Button from '../../components/Button/Button';
import Loader from 'react-spinners/PuffLoader';

import './Products.scss';
import UITable from '../../components/CMS-components/UITable/UITable';
import columns from './columns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProductFail,
  getAllProductPending,
  getAllProductSuccess,
} from '../../features/getAllProductSlice';
import { toast, Flip } from 'react-toastify';
import { getAllProducts, removeProduct } from '../../api/productApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  productRemoveFail,
  productRemovePending,
  productRemoveSuccessful,
} from '../../features/productRemoveSlice';

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
  const [pageSize, setPageSize] = useState(30);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const handleEditPage = (id) => {
    navigate(`/admin/product-edit/${id}`);
  };

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

  const handleDeleteProducts = async () => {
    const removeIds = selectedProducts.map((product) => product.id);
    dispatch(productRemovePending());
    try {
      const products = await removeProduct(removeIds);
      SuccessToast('Product removed successfully');
      dispatch(productRemoveSuccessful(products));
    } catch (error) {
      errorToast('Product category fetching failed');
      dispatch(productRemoveFail(error.message));
    }
  };

  /* Setup Columns */
  const cols = React.useMemo(() => columns(handleEditPage), []);

  return (
    <div className={ProductsClasses} {...restProps}>
      <div className="w-full mb-2 text-3xl font-bold dashboard_title text-G-dark">
        Products
      </div>
      <div className="flex justify-end mb-2 product__add -item-btn gap-x-2">
        {selectedProducts.length > 0 && (
          <Button
            children="Delete Products"
            className="items-center px-5 text-xs text-white border-2 rounded-sm h-7 w-max md:h-8 lg:h-10 bg-R-500 lg:text-sm border-R-500 hover:bg-white hover:text-R-500"
            onClick={() => handleDeleteProducts()}
          />
        )}

        <Button
          children="Add Product"
          className="items-center px-5 text-xs text-white border-2 rounded-sm h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          onClick={() => navigate('/admin/product-uploads')}
        />
      </div>
      <div className="product__table">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-auto">
            <Loader type="Grid" color="#1c473c" size={60} />
          </div>
        ) : (
          <UITable
            COLUMNS={cols}
            DATA={products?.data || []}
            onChangePageSize={handlePageSizeChange}
            pageSize={pageSize}
            onChange={(e) => setSelectedProducts(e)}
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

import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { Formik } from 'formik';
import Loader from 'react-spinners/PuffLoader';

import Accordion from '../../../components/Accordion/Accordion';
import ProductInformationForm from '../ProductInformationForm/ProductInformationForm';
import PriceForm from '../PriceForm/PriceForm';
import ShippingForm from '../ShippingForm/ShippingForm';
import InventoryForm from '../InventoryForm/InventoryForm';
import ImagesForm from '../ImagesForm/ImagesForm';
import ProductAttributesForm from '../ProductAttributesForm/ProductAttributesForm';
import Overlay from '../../../components/Overlay/Overlay';

import './ProductUpload.scss';
import Button from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import {
  productUploadFail,
  productUploadPending,
  productUploadSuccess,
} from '../../../features/ProductUploadSlice';
import { getProductById, productUpload } from '../../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../components/Modal/Modal';
import { useParams } from 'react-router-dom';
import { getProductFail, getProductPending, getProductSuccess } from '../../../features/getProductDetailsSlice';

export const ProductUpload = ({ className, ...restProps }) => {
  const ProductUploadClasses = CN(
    'product-upload flex flex-col',
    className,
    {}
  );

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
      // transition: Flip,
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
      // transition: Flip,
    });
  };

  const { isUploadLoading } = useSelector((state) => state.productUpload);

  const dispatch = useDispatch();

  const [editData, setEditData] = useState([]);
  const [productInformation, setProductInformation] = useState([]);
  const [price, setPrice] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [images, setImages] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  const { id } = useParams();

  useEffect( async() => {
    if(id){
      dispatch(getProductPending());
      try {
        const products = await getProductById(id);
        console.log(products);
        setEditData(products);
        dispatch(getProductSuccess());
      } catch (error) {
        // setProgressed(100);
        dispatch(getProductFail(error.message));
      }
    }
  }, [id]);

  const handleProductUpload = async (values, resetForm) => {
    const {
      productName,
      productCategory,
      productSubCategory,
      productChildCategory,
      supplierProductCode,
      metaKeyword,
      metaDescription,
      productShortDescription,
      productFullDescription,
      availableQuantity,
      company,
      madeForOrder,
      productTime,
      productType,
      unitOfMeasure,
      displayOnHomePage,
      wholePrice,
      retailPrice,
      discount,
      tax,
      taxExempt,
      shippingDescription,
      shippingLength,
      shippingWidth,
      shippingHeight,
      shippingWeight,
      ShippingUnitStrength,
      ShippingUnitWeight,
      shippingNote,
      inventoryMethod,
      minimumCartQuantity,
      maximumCartQuantity,
      allowedQuantity,
      notReturnable,
      productImages,
      colors,
      sizes,
      sizeGuide,
      productSpecification,
    } = values;

    if (productName === '') {
      errorToast('Product Name is required');
      return;
    } else if (productCategory === '') {
      errorToast('Product Category is required');
      return;
    } else if (productSubCategory === '') {
      errorToast('Product Sub Category is required');
      return;
    } else if (productChildCategory === '') {
      errorToast('Product Child Category is required');
      return;
    } else if (metaKeyword === '') {
      errorToast('Meta Keyword is required');
      return;
    } else if (supplierProductCode === '') {
      errorToast('Supplier Product Code is required');
    } else if (company === '') {
      errorToast('Company is required');
      return;
    } else if (productType === '') {
      errorToast('Product Type is required');
      return;
    } else if (wholePrice === '') {
      errorToast('Whole Price is required');
      return;
    } else if (retailPrice === '') {
      errorToast('Retail Price is required');
      return;
    } else if (inventoryMethod === '') {
      errorToast('Inventory Method is required');
      return;
    } else {
      const formData = new FormData();

      formData.append('Name', productName);
      formData.append('CategoryId', productChildCategory.value);
      formData.append('supplierProductCode', supplierProductCode);
      formData.append('MetaKeywords', metaKeyword);
      formData.append('MetaDescription', metaDescription);
      formData.append('ShortDescription', productShortDescription);
      formData.append('FullDescription', productFullDescription);
      formData.append('RetailPrice', retailPrice);
      formData.append('WholeSalePrice', wholePrice);
      formData.append('Weight', shippingWeight);
      formData.append('Length', shippingLength);
      formData.append('Width', shippingWidth);
      formData.append('Height', shippingHeight);
      formData.append('LengthWidthHeightType', ShippingUnitStrength);
      formData.append('WeightType', ShippingUnitWeight);
      formData.append('CompanyId', company.value);
      formData.append('IsReturnable', notReturnable);
      formData.append('Sizes', sizes);
      formData.append('ShowOnHomePage', displayOnHomePage);

      productImages.map((image) => {
        if (image.length !== 0) {
          formData.append('ProductImages', image, image.name);
        }
      });

      colors.map((color, idx) => {
        formData.append(`Colors[${idx}].ColorName`, color.label);
      });

      formData.append('AvailableQuantity', availableQuantity);
      formData.append('MadeForOrder', madeForOrder);
      formData.append('ProductTime', productTime);
      formData.append('ProductType', productType.label);
      formData.append('UnitOfMeasure', unitOfMeasure);
      formData.append('Discount', discount);
      formData.append(
        'TaxCategoryId',
        tax.value === undefined ? '' : tax.value
      );
      formData.append('istaxIncluded', taxExempt);
      formData.append('ShippingDescription', shippingDescription);
      formData.append('ShippingNote', shippingNote);
      formData.append(
        'IsInventoryTracked',
        inventoryMethod.value === 1 ? false : true
      );
      formData.append('MinCartQuantity', minimumCartQuantity);
      formData.append('MaxCartQuantity', maximumCartQuantity);
      formData.append('AllowedQuantity', allowedQuantity);
      formData.append('SizeGuide', sizeGuide);
      formData.append('ProductSpecification', productSpecification);

      dispatch(productUploadPending());
      try {
        const isUploaded = await productUpload(formData);
        resetForm({ values: '' });
        dispatch(productUploadSuccess());
        SuccessToast('Product Upload successful.');
      } catch (error) {
        console.log(error);
        errorToast('Product Upload failed.');
        // setProgressed(100);
        dispatch(productUploadFail(error.message));
      }
    }
  };

  useEffect(() => {
    if (editData !== undefined) {
      const { productInformation, productAttributes, images, inventory, price, shipping } = editData;
      setProductInformation(productInformation);
      setProductAttributes(productAttributes);
      setImages(images);
      setInventory(inventory);
      setPrice(price);
      setShipping(shipping);
    }
  }, [editData]);

  return (
    <div className={ProductUploadClasses} {...restProps}>
      {isUploadLoading && (
        <Modal isOpen={true} size="xxxxs">
          <div className="flex items-center justify-center py-4 align-middle">
            <Loader type="Grid" color="#1c473c" size={100} />
          </div>
        </Modal>
      )}
      {console.log(productInformation?.name)}
      <Formik
        initialValues={{
          productName: productInformation?.name || '',
          productCategory: productInformation?.productCategoryId || '',
          productSubCategory: productInformation?.productSubCategoryId || '',
          productChildCategory: productInformation?.productChildCategoryId || '',
          supplierProductCode: productInformation?.supplierProductCode || '',
          metaKeyword: productInformation?.metaKeywords || '',
          metaDescription: productInformation?.metaDescription || '',
          productShortDescription: productInformation?.shortDescription || '',
          productFullDescription: productInformation?.fullDescription || '',
          availableQuantity: productInformation?.availableQuantity || '',
          company: productInformation?.companyId || '',
          madeForOrder: productInformation?.madeForOrder || false,
          productTime: productInformation?.productTime || '',
          productType: productInformation?.productType || '',
          unitOfMeasure: productInformation?.unitOfMeasure || '',
          displayOnHomePage: productInformation?.showOnHomePage || false,
          wholePrice: price?.wholeSalePrice || '',
          retailPrice: price?.retailPrice || '',
          discount: price?.discount || '',
          tax: price?.taxCategoryId || '',
          taxExempt: price?.isTaxIncluded || false,
          shippingDescription: shipping?.shippingDescription || '',
          shippingLength: shipping?.length || '',
          shippingWidth: shipping?.width || '',
          shippingHeight: shipping?.height || '',
          shippingWeight: shipping?.weight || '',
          ShippingUnitStrength: shipping?.lengthWidthHeightType || 'cm',
          ShippingUnitWeight: shipping?.weightType || 'kg',
          shippingNote: shipping?.shippingNote || '',
          inventoryMethod: inventory?.isInventoryTracked || '',
          minimumCartQuantity: inventory?.minCartQuantity || '',
          maximumCartQuantity: inventory?.maxCartQuantity || '',
          allowedQuantity: inventory?.allowedQuantity || '',
          notReturnable: inventory?.isReturnable || false,
          productImages: images || [],
          colors: productAttributes?.colors || [],
          sizes: productAttributes?.sizes || [],
          sizeGuide: productAttributes?.sizeGuide || '',
          productSpecification: productAttributes?.productSpecification || '',
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          //need to store the values and submit them to the server
          handleProductUpload(values, resetForm);
        }}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Product Information
                      </span>
                    </div>
                  ),
                  content: (
                    <ProductInformationForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      values={values}
                      productInformation={productInformation}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Price
                      </span>
                    </div>
                  ),
                  content: (
                    <PriceForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      values={values}
                      price={price}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Shipping
                      </span>
                    </div>
                  ),
                  content: (
                    <ShippingForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      values={values}
                      shipping={shipping}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Inventory
                      </span>
                    </div>
                  ),
                  content: (
                    <InventoryForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      values={values}
                      inventory={inventory}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Images
                      </span>
                    </div>
                  ),
                  content: (
                    <ImagesForm
                      setFieldValue={setFieldValue}
                      images={images}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />
            <Accordion
              className="overflow-auto border rounded-lg shadow-lg border-G-light"
              list={[
                {
                  id: 1,
                  title: (
                    <div className="px-3 py-1 product-information">
                      <span className="text-lg font-semibold text-G-dark">
                        Product Attributes
                      </span>
                    </div>
                  ),
                  content: (
                    <ProductAttributesForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      productAttributes={productAttributes}
                      values={values}
                      className="w-full"
                    />
                  ),
                },
              ]}
            />

            <div className="flex justify-end my-5 flex-end">
              <Button
                children={id ? "Edit Product" :"Create Product"}
                className="items-center px-3 py-1 text-sm font-semibold h-7 md:h-10 md:py-2 xl:px-6 bg-G-light hover:text-white"
                // onClick={(e) => handleSubmit(e)}
                type={"submit"}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

ProductUpload.defaultProps = {
  className: undefined,
};

export default ProductUpload;

import React from 'react';
import CN from 'classnames';
import { Formik } from 'formik';

import Accordion from '../../../components/Accordion/Accordion';
import ProductInformationForm from '../ProductInformationForm/ProductInformationForm';
import PriceForm from '../PriceForm/PriceForm';
import ShippingForm from '../ShippingForm/ShippingForm';
import InventoryForm from '../InventoryForm/InventoryForm';
import ImagesForm from '../ImagesForm/ImagesForm';
import ProductAttributesForm from '../ProductAttributesForm/ProductAttributesForm';

import './ProductUpload.scss';
import Button from '../../../components/Button/Button';

export const ProductUpload = ({ className, ...restProps }) => {
  const ProductUploadClasses = CN(
    'product-upload flex flex-col',
    className,
    {}
  );

  return (
    <div className={ProductUploadClasses} {...restProps}>
      <Formik
        initialValues={{
          productName: '',
          productCategory: '',
          productSubCategory: '',
          productChildCategory: '',
          metaKeyword: '',
          metaDescription: '',
          productShortDescription: '',
          productFullDescription: '',
          availableQuantity: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          //need to store the values and submit them to the server
          console.log(values);
        }}
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
                  content: <PriceForm className="w-full" />,
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
                  content: <ShippingForm className="w-full" />,
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
                  content: <InventoryForm className="w-full" />,
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
                  content: <ImagesForm className="w-full" />,
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
                  content: <ProductAttributesForm className="w-full" />,
                },
              ]}
            />

            <div className="flex justify-end my-5 flex-end">
              <Button
                children="Create Product"
                className="items-center px-3 py-1 text-sm font-semibold h-7 md:h-10 md:py-2 xl:px-6 bg-G-light hover:text-white"
                // onClick={(e) => handleSubmit(e)}
                type="submit"
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

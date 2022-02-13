import React from 'react';
import CN from 'classnames';

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
    'product-upload flex flex-col gap-y-5',
    className,
    {}
  );

  return (
    <div className={ProductUploadClasses} {...restProps}>
      <Accordion
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
                <span className="text-lg font-semibold text-G-dark">
                  Product Information
                </span>
              </div>
            ),
            content: <ProductInformationForm className="w-full" />,
          },
        ]}
      />
      <Accordion
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
                <span className="text-lg font-semibold text-G-dark">Price</span>
              </div>
            ),
            content: <PriceForm className="w-full" />,
          },
        ]}
      />
      <Accordion
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
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
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
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
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
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
        className="border border-G-light rounded-lg shadow-lg overflow-auto"
        list={[
          {
            id: 1,
            title: (
              <div className="product-information px-3 py-1">
                <span className="text-lg font-semibold text-G-dark">
                  Product Attributes
                </span>
              </div>
            ),
            content: <ProductAttributesForm className="w-full" />,
          },
        ]}
      />
      <div className="text-right">
        <Button
          children="Create Product"
          className="items-center px-3 py-1 text-sm font-semibold h-7 md:h-10 md:py-2 xl:px-6 bg-G-light hover:text-white"
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
};

ProductUpload.defaultProps = {
  className: undefined,
};

export default ProductUpload;

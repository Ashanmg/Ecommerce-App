import React from 'react';
import CN from 'classnames';

import TextField from '../../components/TextField/TextField';
import DropDown from '../../components/DropDown/DropDown';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';

import './ProductUploadScreen.scss';

export const ProductUploadScreen = ({ className, ...restProps }) => {
  const ProductUploadScreenClasses = CN(
    'product-upload-screen flex container px-2 md:px-4 lg:px-12',
    className,
    {}
  );

  const options = [
    'convenience products',
    'shopping products',
    'specialty products',
    'unsought products',
  ];

  return (
    <div className={ProductUploadScreenClasses} {...restProps}>
      <form action="" method="post">
        <div className="flex mb-6">
          <div className="product-upload-screen__left w-8/12 mr-4">
            <div className="product-upload-screen__left__top mb-5">
              <div className="product-upload-screen__left__product-category flex items-center mb-3">
                <span className="text-left w-2/5 text-G-dark">
                  Product Category
                </span>
                <DropDown options={options} placeholder="Select" />
              </div>
              <div className="product-upload-screen__left__product-category flex items-center mb-3">
                <span className="text-left w-2/5 text-G-dark">
                  Product Title
                </span>
                <TextField
                  placeholder="Product Title"
                  textRules="50 characters maximum"
                />
              </div>
              <div className="product-upload-screen__left__product-category flex items-center mb-3">
                <span className="text-left w-2/5 text-G-dark">
                  Product Category
                </span>
                <TextArea
                  placeholder="Product Category"
                  maxLength={150}
                  rows={2}
                  textRules="150 characters maximum"
                />
              </div>
              <div className="product-upload-screen__left__product-category flex items-center">
                <span className="text-left w-2/5 text-G-dark">
                  Product Description
                </span>
                <TextArea
                  placeholder="Product Description"
                  maxLength={500}
                  rows={5}
                  textRules="500 characters maximum"
                />
              </div>
            </div>
            <div className="product-upload-screen__left__bottom flex">
              <span className="text-left text-G-dark w-2/6">
                Images Drag & Drop Or Upload
              </span>
              <div className="grid grid-cols-4 gap-2">
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
              </div>
            </div>
          </div>
          <div className="product-upload-screen__right flex-1">
            <div className="product-upload-screen__left__product-category flex items-center mb-3">
              <span className="text-left w-2/5 text-G-dark">
                WholeSale Price
              </span>
              <TextField placeholder="USD" />
            </div>
            <div className="product-upload-screen__left__product-category flex items-center mb-3">
              <span className="text-left w-2/5 text-G-dark">Retail Price</span>
              <TextField placeholder="USD" />
            </div>
            <div className="product-upload-screen__left__product-category flex items-center mb-3">
              <span className="text-left w-2/5 text-G-dark">
                Shipping Size & Weight
              </span>
              <div className="product-upload-screen__left__product-category__shipping-details border-G-dark border-2 p-3 w-full flex flex-col">
                <TextField
                  placeholder="Size:1 Description i.e, small"
                  className="pb-3"
                />
                <div className="grid grid-cols-2 gap-2 pb-3">
                  <TextField placeholder="Length" />
                  <TextField placeholder="Width" />
                  <TextField placeholder="Height" />
                  <DropDown className="w-1/4" />
                  <TextField placeholder="Weight" />
                  <DropDown className="w-1/4" />
                </div>
                <TextField placeholder="Notes (optional)" />
              </div>
            </div>
            <div className="product-upload-screen__left__product-category flex items-center mb-3">
              <span className="text-left w-2/5 text-G-dark">Colours</span>
              <DropDown options={options} />
            </div>
            <div className="product-upload-screen__left__product-category flex items-center mb-3">
              <span className="text-left w-2/5 text-G-dark">Other</span>
              <DropDown options={options} />
            </div>
          </div>
        </div>
        <div className='text-right'>
          <Button
            children="Save"
            className="h-7 md:h-10 py-1 md:py-2 px-6 xl:px-8 items-center bg-G-light text-sm hover:text-white w-1/5 font-medium"
          />
        </div>
      </form>
    </div>
  );
};

ProductUploadScreen.defaultProps = {
  className: undefined,
};

export default ProductUploadScreen;

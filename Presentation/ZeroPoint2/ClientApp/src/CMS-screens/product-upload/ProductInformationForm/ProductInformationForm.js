import React from 'react';
import CN from 'classnames';

import './ProductInformationForm.scss';
import TextField from '../../../components/TextField/TextField';
import { Checkbox } from '../../../components/CMS-components/Checkbox';
import RadioButton from '../../../components/RadioButton/RadioButton';

export const ProductInformationForm = ({ className, ...restProps }) => {
  const ProductInformationFormClasses = CN(
    'product-information-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  return (
    <div className={ProductInformationFormClasses} {...restProps}>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Name :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Category :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Sub Category :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Child Category :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Meta Keyword :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Meta Description :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Short Description :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Full Description :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Available Quantity :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Company
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Made For Order :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Time :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Product Type :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Unit of Measure :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span
          className=" text-sm text-G-dark font-semibold"
          style={{ width: '305px' }}
        >
          Unit of Measure :
        </span>
        <RadioButton className="" />
      </div>
    </div>
  );
};

ProductInformationForm.defaultProps = {
  className: undefined,
};

export default ProductInformationForm;
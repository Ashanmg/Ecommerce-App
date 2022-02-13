import React from 'react';
import CN from 'classnames';

import './PriceForm.scss';
import TextField from '../../../components/TextField/TextField';
import RadioButton from '../../../components/RadioButton/RadioButton';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';

export const PriceForm = ({ className, ...restProps }) => {
  const PriceFormClasses = CN('price-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3', className, {});

  return (
    <div className={PriceFormClasses} {...restProps}>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Whole Price :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Retail Price :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Discount :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-3/12">
          Tax Category :
        </span>
        <AutoSelect placeHolder='' />
      </div>
      <div className="w-full flex items-center">
        <span
          className=" text-sm text-G-dark font-semibold"
          style={{ width: '305px' }}
        >
          Tax exempt :
        </span>
        <RadioButton className="" />
      </div>
    </div>
  );
};

PriceForm.defaultProps = {
  className: undefined,
};

export default PriceForm;

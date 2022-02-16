import React from 'react';
import CN from 'classnames';

import './PriceForm.scss';
import TextField from '../../../components/TextField/TextField';
import RadioButton from '../../../components/RadioButton/RadioButton';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';

export const PriceForm = ({ className, ...restProps }) => {
  const PriceFormClasses = CN(
    'price-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  return (
    <div className={PriceFormClasses} {...restProps}>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold  text-G-dark">
          Whole Price :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold  text-G-dark">
          Retail Price :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold  text-G-dark">
          Discount :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold  text-G-dark">
          Tax Category :
        </span>
        <AutoSelect placeHolder="" />
      </div>
      <div className="flex items-center w-full">
        <span
          className="text-sm font-semibold  text-G-dark"
          style={{ width: '217px' }}
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

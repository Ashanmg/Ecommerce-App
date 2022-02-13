import React from 'react';
import CN from 'classnames';

import './ShippingForm.scss';
import RadioButton from '../../../components/RadioButton/RadioButton';
import TextField from '../../../components/TextField/TextField';

export const ShippingForm = ({ className, ...restProps }) => {
  const ShippingFormClasses = CN(
    'shipping-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  return (
    <div className={ShippingFormClasses} {...restProps}>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Description :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Length :
        </span>
        <TextField className="border border-G-dark w-5/12" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Width :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Height :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Weight :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Cm</span>
          <RadioButton className="" />
        </div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Inch</span>
          <RadioButton className="" />
        </div>
        <div>|</div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Kg</span>
          <RadioButton className="" />
        </div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Pou</span>
          <RadioButton className="" />
        </div>
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Note (Optional) :
        </span>
        <TextField className="border border-G-dark" />
      </div>
    </div>
  );
};

ShippingForm.defaultProps = {
  className: undefined,
};

export default ShippingForm;

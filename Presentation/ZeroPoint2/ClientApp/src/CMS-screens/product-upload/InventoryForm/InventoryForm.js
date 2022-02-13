import React from 'react';
import CN from 'classnames';

import './InventoryForm.scss';
import RadioButton from '../../../components/RadioButton/RadioButton';
import TextField from '../../../components/TextField/TextField';

export const InventoryForm = ({ className, ...restProps }) => {
  const InventoryFormClasses = CN(
    'inventory-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  return (
    <div className={InventoryFormClasses} {...restProps}>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Inventory method :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Minimum Cart Quantity :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Maximum Cart Quantity :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Allowed Quantity :
        </span>
        <TextField className="border border-G-dark" />
      </div>
      <div className="w-full flex items-center">
        <span
          className=" text-sm text-G-dark font-semibold"
          style={{ width: '217px' }}
        >
          Not returnable :
        </span>
        <RadioButton className="" />
      </div>
    </div>
  );
};

InventoryForm.defaultProps = {
  className: undefined,
};

export default InventoryForm;

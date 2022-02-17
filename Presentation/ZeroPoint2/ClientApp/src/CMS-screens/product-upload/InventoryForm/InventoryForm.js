import React from 'react';
import CN from 'classnames';

import './InventoryForm.scss';
import RadioButton from '../../../components/RadioButton/RadioButton';
import TextField from '../../../components/TextField/TextField';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';
import CheckBox from '../../../components/CheckBox/CheckBox';

export const InventoryForm = ({
  className,
  handleBlur,
  setFieldValue,
  values,
  handleChange,
  ...restProps
}) => {
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
        <AutoSelect
          id="inventoryMethod"
          onChange={(selectedOption) => {
            setFieldValue('productChildCategory', selectedOption);
          }}
          onBlur={handleBlur}
          name="inventoryMethod"
          options={[
            { value: '1', label: 'Do not track inventory' },
            { value: '2', label: 'Track inventory' },
          ]}
          value={values.productChildCategory}
          placeHolder=""
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Minimum Cart Quantity :
        </span>
        <TextField
          id="minimumCartQuantity"
          className="border border-G-dark"
          name="minimumCartQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.minimumCartQuantity}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Maximum Cart Quantity :
        </span>
        <TextField
          id="maximumCartQuantity"
          className="border border-G-dark"
          name="maximumCartQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.maximumCartQuantity}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Allowed Quantity :
        </span>
        <TextField
          id="allowedQuantity"
          className="border border-G-dark"
          name="allowedQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.allowedQuantity}
        />
      </div>
      <div className="w-full flex items-center">
        <span
          className=" text-sm text-G-dark font-semibold"
          style={{ width: '217px' }}
        >
          Not returnable :
        </span>
        <CheckBox
          id="notReturnable"
          name="notReturnable"
          onChange={handleChange}
          onBlur={handleBlur}
          className=""
        />
      </div>
    </div>
  );
};

InventoryForm.defaultProps = {
  className: undefined,
};

export default InventoryForm;

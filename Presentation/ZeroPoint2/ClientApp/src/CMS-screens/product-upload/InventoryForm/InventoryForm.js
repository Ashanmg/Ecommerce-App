import React, { useEffect, useState } from 'react';
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
  inventory,
  handleChange,
  ...restProps
}) => {
  const InventoryFormClasses = CN(
    'inventory-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  const inventoryMethods = [
    { value: false, label: 'Do not track inventory' },
    { value: true, label: 'Track inventory' },
  ];

  const [selectedInventoryMethod, setSelectedInventoryMethod] = useState();

  useEffect(() => {
    const filterMainValue = inventoryMethods.filter(
      (inventoryMethod) => inventoryMethod.value === values?.inventoryMethod
    );
    setSelectedInventoryMethod(filterMainValue[0]);
  }, [inventory]);
  
  return (
    <div className={InventoryFormClasses} {...restProps}>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark required">
          Inventory method :
        </span>
        <AutoSelect
          id="inventoryMethod"
          onChange={(selectedOption) => {
            setFieldValue('inventoryMethod', selectedOption);
          }}
          onBlur={handleBlur}
          name="inventoryMethod"
          options={inventoryMethods}
          value={selectedInventoryMethod}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Minimum Cart Quantity :
        </span>
        <TextField
          id="minimumCartQuantity"
          className="border border-G-dark"
          name="minimumCartQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.minimumCartQuantity}
          type="number"
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Maximum Cart Quantity :
        </span>
        <TextField
          id="maximumCartQuantity"
          className="border border-G-dark"
          name="maximumCartQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.maximumCartQuantity}
          type="number"
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Allowed Quantity :
        </span>
        <TextField
          id="allowedQuantity"
          className="border border-G-dark"
          name="allowedQuantity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.allowedQuantity}
          type={'number'}
        />
      </div>
      <div className="flex items-center w-full">
        <span
          className="text-sm font-semibold text-G-dark"
          style={{ width: '217px' }}
        >
          Not returnable :
        </span>
        <CheckBox
          id="notReturnable"
          name="notReturnable"
          onChange={handleChange}
          checked={values?.notReturnable}
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

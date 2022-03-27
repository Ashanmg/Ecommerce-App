import React from 'react';
import CN from 'classnames';

import './ShippingForm.scss';
import RadioButton from '../../../components/RadioButton/RadioButton';
import TextField from '../../../components/TextField/TextField';

export const ShippingForm = ({
  className,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
  ...restProps
}) => {
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
        <TextField
          id="shippingDescription"
          className="border border-G-dark"
          name="shippingDescription"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingDescription}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Length :
        </span>
        <TextField
          id="shippingLength"
          className="border border-G-dark w-5/12"
          name="shippingLength"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingLength}
          type="number"
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Width :
        </span>
        <TextField
          id="shippingWidth"
          className="border border-G-dark"
          name="shippingWidth"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingWidth}
          type="number"
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Height :
        </span>
        <TextField
          id="shippingHeight"
          className="border border-G-dark"
          name="shippingHeight"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingHeight}
          type="number"
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Weight :
        </span>
        <TextField
          id="shippingWeight"
          className="border border-G-dark"
          name="shippingWeight"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingWeight}
          type="number"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Cm</span>
          <RadioButton
            id="ShippingUnitCm"
            name="ShippingUnitStrength"
            defaultChecked={values.ShippingUnitStrength === 'cm'}
            onChange={() => setFieldValue('ShippingUnitStrength', 'cm')}
            checked={values.ShippingUnitStrength === 'cm'}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Inch</span>
          <RadioButton
            id="ShippingUnitInch"
            name="ShippingUnitStrength"
            onChange={() => setFieldValue('ShippingUnitStrength', 'inch')}
            checked={values.ShippingUnitStrength === 'inch'}
          />
        </div>
        <div>|</div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Kg</span>
          <RadioButton
            id="ShippingUnitKg"
            name="ShippingUnitWeight"
            defaultChecked={values.ShippingUnitWeight === 'kg'}
            onChange={() => setFieldValue('ShippingUnitWeight', 'kg')}
            checked={values.ShippingUnitWeight === 'kg'}
          />
        </div>
        <div className="flex items-center gap-x-2">
          <span className=" text-sm text-G-dark font-semibold">Pou</span>
          <RadioButton
            id="ShippingUnitPou"
            name="ShippingUnitWeight"
            onChange={() => setFieldValue('ShippingUnitWeight', 'pou')}
            checked={values.ShippingUnitWeight === 'pou'}
          />
        </div>
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Note (Optional) :
        </span>
        <TextField
          id="shippingNote"
          className="border border-G-dark"
          name="shippingNote"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.shippingNote}
        />
      </div>
    </div>
  );
};

ShippingForm.defaultProps = {
  className: undefined,
};

export default ShippingForm;

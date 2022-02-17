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
          id="ShippingDescription"
          className="border border-G-dark"
          name="ShippingDescription"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingDescription}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Length :
        </span>
        <TextField
          id="ShippingLength"
          className="border border-G-dark w-5/12"
          name="ShippingLength"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingLength}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Width :
        </span>
        <TextField
          id="ShippingWidth"
          className="border border-G-dark"
          name="ShippingWidth"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingWidth}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Height :
        </span>
        <TextField
          id="ShippingHeight"
          className="border border-G-dark"
          name="ShippingHeight"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingHeight}
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Weight :
        </span>
        <TextField
          id="ShippingWeight"
          className="border border-G-dark"
          name="ShippingWeight"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingWeight}
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
          id="ShippingNote"
          className="border border-G-dark"
          name="ShippingNote"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ShippingNote}
        />
      </div>
    </div>
  );
};

ShippingForm.defaultProps = {
  className: undefined,
};

export default ShippingForm;

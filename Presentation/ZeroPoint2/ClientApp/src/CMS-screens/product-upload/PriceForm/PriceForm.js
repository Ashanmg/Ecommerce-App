import React, { useState, useEffect } from 'react';
import CN from 'classnames';
import { useDispatch } from 'react-redux';

import TextField from '../../../components/TextField/TextField';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';
import CheckBox from '../../../components/CheckBox/CheckBox';

import {
  getTaxFail,
  getTaxPending,
  getTaxSuccess,
} from '../../../features/taxSlice';
import { getProductsTax } from '../../../api/productApi';

import './PriceForm.scss';

export const PriceForm = ({
  className,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  ...restProps
}) => {
  const PriceFormClasses = CN(
    'price-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  const dispatch = useDispatch();
  const [taxes, setTaxes] = useState([]);

  useEffect(async () => {
    dispatch(getTaxPending());
    try {
      const taxes = await getProductsTax();
      const taxCopy = [];
      taxes.map((tax) => {
        taxCopy.push({
          value: tax.id,
          label: tax.name,
        });
      });
      setTaxes(taxCopy);
      dispatch(getTaxSuccess());
    } catch (error) {
      dispatch(getTaxFail(error.message));
    }
  }, []);

  return (
    <div className={PriceFormClasses} {...restProps}>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark required">
          Whole Price :
        </span>
        <TextField
          id="wholePrice"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="wholePrice"
          value={values.wholePrice}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark required">
          Retail Price :
        </span>
        <TextField
          id="retailPrice"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="retailPrice"
          value={values.retailPrice}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Discount :
        </span>
        <TextField
          id="discount"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="discount"
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark required">
          Tax Category :
        </span>
        <AutoSelect
          id="tax"
          onChange={(selectedOption) => {
            setFieldValue('tax', selectedOption);
          }}
          isMultiple={false}
          onBlur={handleBlur}
          name="tax"
          options={taxes || []}
          value={values.tax}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span
          className="text-sm font-semibold text-G-dark"
          style={{ width: '217px' }}
        >
          Tax exempt :
        </span>
        <CheckBox
          id="taxExempt"
          name="taxExempt"
          onChange={handleChange}
          onBlur={handleBlur}
          type="checkbox"
          value={values.taxExempt}
        />
      </div>
    </div>
  );
};

PriceForm.defaultProps = {
  className: undefined,
};

export default PriceForm;

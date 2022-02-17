import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';

import './ProductAttributesForm.scss';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';
import {
  getColorTypesFail,
  getColorTypesPending,
  getColorTypesSuccess,
} from '../../../features/colorTypesForUploadSlice';
import { getColorTypesForUpload } from '../../../api/productApi';

export const ProductAttributesForm = ({
  className,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  ...restProps
}) => {
  const ProductAttributesFormClasses = CN(
    'product-attributes-form flex flex-col px-3 py-7 border-t border-N-100  gap-3',
    className,
    {}
  );

  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);

  useEffect(async () => {
    dispatch(getColorTypesPending());
    try {
      const colors = await getColorTypesForUpload();
      console.log(colors);
      const colorsCopy = [];
      colors.map((color) => {
        colorsCopy.push({
          value: color.id,
          label: color.colorName,
        });
      });
      setColors(colorsCopy);
      dispatch(getColorTypesSuccess());
    } catch (error) {
      dispatch(getColorTypesFail(error.message));
    }
  }, []);

  return (
    <div className={ProductAttributesFormClasses} {...restProps}>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Colors :
        </span>
        <AutoSelect
          id="colors"
          onChange={(selectedOption) => {
            setFieldValue('colors', selectedOption);
          }}
          isMultiple={true}
          onBlur={handleBlur}
          name="colors"
          options={colors || []}
          value={values.colors}
          placeHolder=""
        />
      </div>
      <div className="w-full flex items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Sizes :
        </span>
        <AutoSelect placeHolder="" />
      </div>
      <div className="w-full items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Size Guid :
        </span>
        <div className="flex-auto">
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
      </div>
      <div className="w-full items-center">
        <span className=" text-sm text-G-dark font-semibold w-2/12">
          Product Specification :
        </span>
        <div className="flex-auto">
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
        </div>
      </div>
    </div>
  );
};

ProductAttributesForm.defaultProps = {
  className: undefined,
};

export default ProductAttributesForm;

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
import TextField from '../../../components/TextField/TextField';
import { useParams } from 'react-router-dom';

export const ProductAttributesForm = ({
  className,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  productAttributes,
  ...restProps
}) => {
  const ProductAttributesFormClasses = CN(
    'product-attributes-form flex flex-col px-3 py-7 border-t border-N-100  gap-3',
    className,
    {}
  );

  const { id } = useParams();

  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(async () => {
    dispatch(getColorTypesPending());
    try {
      const colors = await getColorTypesForUpload();
      const colorsCopy = [];
      colors.map((color) => {
        colorsCopy.push({
          value: color.id,
          label: color.colorName,
          hashValue: color.colorHashValue,
        });
      });
      setColors(colorsCopy);
      dispatch(getColorTypesSuccess());
    } catch (error) {
      dispatch(getColorTypesFail(error.message));
    }
  }, []);

  useEffect(() => {
    if (id) {
      const colors = [];
      productAttributes.colors.map((color) => {
        colors.push({
          value: color.id,
          label: color.colorName,
          hashValue: color.colorHashValue,
        });
      });

      setSelectedColor(colors);
    }
  }, [productAttributes]);

  return (
    <div className={ProductAttributesFormClasses} {...restProps}>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Colors :
        </span>
        <AutoSelect
          id="colors"
          onChange={(selectedOption) => {
            setFieldValue('colors', selectedOption);
            setSelectedColor(selectedOption);
          }}
          isMultiple={true}
          onBlur={handleBlur}
          name="colors"
          options={colors || []}
          value={selectedColor}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Sizes :
        </span>
        <TextField
          id="sizes"
          onChange={handleChange}
          onBlur={handleBlur}
          name="sizes"
          value={values?.sizes}
          className="border border-G-dark"
        />
      </div>
      <div className="items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Size Guid :
        </span>
        <div className="flex-auto">
          <CKEditor
            editor={ClassicEditor}
            data={values?.sizeGuide}
            config={{
              removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed'],
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              setFieldValue('sizeGuide', data);
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
      <div className="items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Specification :
        </span>
        <div className="flex-auto">
          <CKEditor
            editor={ClassicEditor}
            data={values?.productSpecification}
            config={{
              removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed'],
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              setFieldValue('productSpecification', data);
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

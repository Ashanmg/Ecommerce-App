import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '../../components/TextField/TextField';
import DropDown from '../../components/DropDown/DropDown';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';
import RadioButton from '../../components/RadioButton/RadioButton';
import AutoSelect from '../../components/AutoSelect/AutoSelect';

import { getProductCategoryForUpload } from '../../api/productApi';

import './ProductUploadScreen.scss';
import {
  getProductCategoryFail,
  getProductCategoryPending,
  getProductCategorySuccess,
} from '../../features/productCategoryforUploadSlice';

export const ProductUploadScreen = ({ className, ...restProps }) => {
  const ProductUploadScreenClasses = CN(
    'product-upload-screen flex container max-w-screen-xl px-1 lg:px-3',
    className,
    {}
  );

  const dispatch = useDispatch();
  const { isLoading, isSuccessFull, error } = useSelector(
    (state) => state.getProductCategoryForUpload
  );

  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [mainSelectedOption, setMainSelectedOption] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [subSelectedOption, setSubSelectedOption] = useState();
  const [childCategories, setChildCategories] = useState([]);

  useEffect(async () => {
    dispatch(getProductCategoryPending());
    try {
      const productCategories = await getProductCategoryForUpload();
      setCategories(productCategories);
      dispatch(getProductCategorySuccess());
    } catch (error) {
      console.log(error);
      dispatch(getProductCategoryFail(error.message));
    }
  }, []);

  useEffect(() => {
    if (categories.length !== 0) {
      const mainOptionCopy = [];
      categories.map((category) => {
        mainOptionCopy.push({ value: category.id, label: category.name });
        setMainCategories(mainOptionCopy);
      });
    }
  }, [categories, mainSelectedOption]);

  const handleMainCategoryChange = (selectedOption) => {
    if (selectedOption) {
      const subCategories = categories.filter(
        (category) => category.id === selectedOption.value
      );
      const { childCategoryList } = subCategories[0];
      if (childCategoryList) {
        const subOptionCopy = [];
        childCategoryList.map((category) => {
          subOptionCopy.push({ value: category.id, label: category.name });
        });
        setSubCategories(subOptionCopy);
      }
    }
  };

  const handleSubCategoryChange = (selectedOption) => {
    if (selectedOption) {
      const sub = categories.filter(
        (category) => category.id === mainSelectedOption.value
      );

      const { childCategoryList } = sub[0];
      const childCategory = childCategoryList.filter(
        (category) => category.id === selectedOption.value
      );

      if (childCategory) {
        const childOptionCopy = [];
        childCategory[0].childCategoryList.map((category) => {
          childOptionCopy.push({ value: category.id, label: category.name });
        });

        setChildCategories(childOptionCopy);
      }
    }
  };

  console.log(subSelectedOption);

  return (
    <div className={ProductUploadScreenClasses} {...restProps}>
      <form action="" method="post">
        <div className="flex mb-6">
          <div className="w-8/12 mr-4 product-upload-screen__left">
            <div className="mb-5 product-upload-screen__left__top">
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Product Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={mainCategories}
                  onChange={(selectOption) => {
                    if (selectOption) {
                      setMainSelectedOption(selectOption);
                      handleMainCategoryChange(selectOption);
                    } else {
                      setMainSelectedOption();
                    }
                  }}
                />
              </div>
              <div className="flex items-center mb-3 h-2/4 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Product Sub-Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={mainSelectedOption ? subCategories : []}
                  onChange={(selectOption) => {
                    if (selectOption) {
                      setSubSelectedOption(selectOption);
                      handleSubCategoryChange(selectOption);
                    } else {
                      setSubSelectedOption();
                    }
                  }}
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Product Child-Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={subSelectedOption ? childCategories : []}
                  onChange={(selectOption) => {
                    if (selectOption) {
                      setSubSelectedOption(selectOption);
                    } else {
                      setSubSelectedOption();
                    }
                  }}
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Product Title
                </span>
                <TextField
                  placeholder="Product Title"
                  textRules="50 characters maximum"
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Meta Description
                </span>
                <TextArea
                  placeholder="Meta Description"
                  maxLength={150}
                  rows={2}
                  textRules="150 characters maximum"
                />
              </div>
              <div className="flex items-center product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Product Description
                </span>
                <TextArea
                  placeholder="Product Description"
                  maxLength={500}
                  rows={5}
                  textRules="500 characters maximum"
                />
              </div>
            </div>
            <div className="flex product-upload-screen__left__bottom">
              <span className="w-2/6 text-left text-G-dark">
                Images Drag & Drop Or Upload
              </span>
              <div className="grid grid-cols-4 gap-2">
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
                <DropZone />
              </div>
            </div>
          </div>
          <div className="flex-1 product-upload-screen__right">
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                WholeSale Price
              </span>
              <TextField placeholder="USD" />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">Retail Price</span>
              <TextField placeholder="USD" />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Shipping Size & Weight
              </span>
              <div className="flex flex-col w-full p-3 border-2 product-upload-screen__left__product-category__shipping-details border-G-dark">
                <TextField
                  placeholder="Size:1 Description i.e, small"
                  className="mb-3"
                />
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <TextField placeholder="Length" />
                  <TextField placeholder="Width" />
                  <TextField placeholder="Height" />
                  <fieldset id="length" className="flex justify-around">
                    <RadioButton id="cm" title="cm" name="length" />
                    <RadioButton id="inch" title="Inch" name="length" />
                  </fieldset>

                  {/* <DropDown className="w-1/4" /> */}
                  <TextField placeholder="Weight" />
                  <fieldset id="weight" className="flex justify-around">
                    <RadioButton id="kg" title="kg" name="weight" />
                    <RadioButton id="Pou" title="Pou" name="weight" />
                  </fieldset>
                  {/* <DropDown className="w-1/4" /> */}
                </div>
                <TextField placeholder="Notes (optional)" />
              </div>
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">Colours</span>
              <DropDown options={[]} />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Company Information
              </span>
              <TextArea
                placeholder="Company Information"
                maxLength={500}
                rows={3}
                textRules="500 characters maximum"
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Return Information
              </span>
              <TextArea
                placeholder="Return Information"
                maxLength={500}
                rows={3}
                textRules="500 characters maximum"
              />
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button
            children="Save"
            className="items-center w-1/5 px-6 py-1 text-sm font-medium h-7 md:h-10 md:py-2 xl:px-8 bg-G-light hover:text-white"
          />
        </div>
      </form>
    </div>
  );
};

ProductUploadScreen.defaultProps = {
  className: undefined,
};

export default ProductUploadScreen;

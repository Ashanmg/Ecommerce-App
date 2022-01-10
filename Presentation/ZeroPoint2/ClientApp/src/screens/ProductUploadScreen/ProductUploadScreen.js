import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Flip, toast } from 'react-toastify';
import Loader from 'react-spinners/RingLoader';

import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';
import RadioButton from '../../components/RadioButton/RadioButton';
import AutoSelect from '../../components/AutoSelect/AutoSelect';
import CheckBox from '../../components/CheckBox/CheckBox';
import { Modal } from '../../components/Modal/Modal';

import {
  getColorTypesForUpload,
  getProductCategoryForUpload,
  productUpload,
} from '../../api/productApi';

import {
  getProductCategoryFail,
  getProductCategoryPending,
  getProductCategorySuccess,
} from '../../features/productCategoryforUploadSlice';

import {
  getColorTypesPending,
  getColorTypesSuccess,
  getColorTypesFail,
} from '../../features/colorTypesForUploadSlice';

import {
  productUploadFail,
  productUploadPending,
  productUploadSuccess,
} from '../../features/ProductUploadSlice';

import './ProductUploadScreen.scss';

export const ProductUploadScreen = ({ className, ...restProps }) => {
  const ProductUploadScreenClasses = CN(
    'product-upload-screen flex container max-w-screen-xl px-1 lg:px-3',
    className,
    {}
  );

  const errorToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'error',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const SuccessToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'success',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: false,
      theme: 'colored',
      transition: Flip,
    });
  };

  const dispatch = useDispatch();

  const { isLoading, isSuccessFull, error } = useSelector(
    (state) => state.getProductCategoryForUpload,
    (state) => state.getColorTypesForUpload
  );

  // const { isLoading, isSuccessFull, error } = useSelector(
  //   (state) => state.getColorTypesForUpload
  // );

  const { isUploadLoading, isUploadSuccessFull, uploadError } = useSelector(
    (state) => state.productUpload
  );

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectColors, setColorSelectOptions] = useState([]);
  const [mainSelectedOption, setMainSelectedOption] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [subSelectedOption, setSubSelectedOption] = useState();
  const [childCategories, setChildCategories] = useState([]);
  const [childSelectedOption, setChildSelectedOption] = useState('');
  const [colorSelectedOption, setColorSelectedOption] = useState([]);

  const [productName, setProductName] = useState('');
  const [metaKeyword, setMetaKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [shortProductDescription, setShortProductDescription] = useState('');
  const [fullProductDescription, setFullProductDescription] = useState('');
  const [wholeProductPrice, setWholeProductPrice] = useState('');
  const [RetailProductPrice, setRetailProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productLength, setProductLength] = useState('');
  const [productWidth, setProductWidth] = useState('');
  const [productHeight, setProductHeight] = useState('');
  const [productDimensionUnit, setProductDimensionUnit] = useState('');
  const [productWeightUnit, setProductWeightUnit] = useState('');
  const [shippingNote, setShippingNote] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyInformation, setCompanyInformation] = useState('');
  const [isReturnable, setIsReturnable] = useState(false);
  const [returnInformation, setReturnInformation] = useState('');
  const [isHomePage, setIsHomePage] = useState(false);
  const [availableQty, setAvailableQty] = useState(0);
  const [productionTime, setProductionTime] = useState('');

  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [image4, setImage4] = useState([]);
  const [image5, setImage5] = useState([]);
  const [image6, setImage6] = useState([]);
  const [image7, setImage7] = useState([]);
  const [image8, setImage8] = useState([]);

  useEffect(async () => {
    dispatch(getProductCategoryPending());
    try {
      const productCategories = await getProductCategoryForUpload();
      setCategories(productCategories);
      dispatch(getProductCategorySuccess());
    } catch (error) {
      dispatch(getProductCategoryFail(error.message));
    }
  }, []);

  useEffect(async () => {
    dispatch(getColorTypesPending());
    try {
      const colors = await getColorTypesForUpload();
      setColors(colors);
      dispatch(getColorTypesSuccess());
    } catch (error) {
      dispatch(getColorTypesFail(error.message));
    }
  }, []);

  useEffect(() => {
    if (categories.length !== 0) {
      const mainOptionCopy = [];
      categories?.map((category) => {
        mainOptionCopy.push({ value: category.id, label: category.name });
        setMainCategories(mainOptionCopy);
      });
    }
  }, [categories, mainSelectedOption]);

  useEffect(() => {
    if (colors.length !== 0) {
      const colorsData = [];
      colors?.map((color) => {
        colorsData.push({
          value: color.colorHashValue,
          label: color.colorName,
          code: color.colorCode,
        });
        setColorSelectOptions(colorsData);
      });
    }
  }, [colors, colorSelectedOption]);

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

  //reset
  const resetFields = () => {
    setMainSelectedOption(null);
    setSubSelectedOption('');
    setChildSelectedOption('');
    setColorSelectedOption([]);
    setProductName('');
    setMetaKeyword('');
    setMetaDescription('');
    setShortProductDescription('');
    setFullProductDescription('');
    setWholeProductPrice('');
    setRetailProductPrice('');
    setProductQuantity('');
    setProductWeight('');
    setProductLength('');
    setProductWidth('');
    setProductHeight('');
    setProductDimensionUnit('');
    setProductWeightUnit('');
    setShippingNote('');
    setCompanyName('');
    setCompanyInformation('');
    setIsReturnable(false);
    setReturnInformation('');
    setColorSelectedOption(null);
    setIsHomePage(false);
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
    setImage5('');
    setImage6('');
    setImage7('');
    setImage8('');
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageList = [];

    imageList.push([
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
    ]);

    const formData = new FormData();

    if (productName === '' || productName === null) {
      errorToast('Product name is required');
      return;
    } else if (
      childSelectedOption.value === '' ||
      childSelectedOption.value === null
    ) {
      errorToast('Child category is required');
      return;
    } else if (metaKeyword === '' || metaKeyword === null) {
      errorToast('Meta keyword is required');
      return;
    } else if (metaDescription === '' || metaDescription === null) {
      errorToast('Meta description is required');
      return;
    } else if (
      shortProductDescription === '' ||
      shortProductDescription === null
    ) {
      errorToast('Short product description is required');
      return;
    } else if (
      fullProductDescription === '' ||
      fullProductDescription === null
    ) {
      errorToast('Full product description is required');
      return;
    } else if (wholeProductPrice === '' || wholeProductPrice === null) {
      errorToast('Whole product price is required');
      return;
    } else if (RetailProductPrice === '' || RetailProductPrice === null) {
      errorToast('Retail product price is required');
      return;
    } else if (productQuantity === '' || productQuantity === null) {
      errorToast('Product quantity is required');
      return;
    } else {
      formData.append('Name', productName);
      formData.append('CategoryId', childSelectedOption.value);
      formData.append('MetaKeywords', metaKeyword);
      formData.append('MetaDescription', metaDescription);
      formData.append('ShortDescription', shortProductDescription);
      formData.append('FullDescription', fullProductDescription);
      formData.append('WholeSalePrice', wholeProductPrice);
      formData.append('RetailPrice', RetailProductPrice);
      formData.append('Sizes', productQuantity);
      formData.append('Weight', productWeight);
      formData.append('Length', productLength);
      formData.append('Width', productWidth);
      formData.append('Height', productHeight);
      formData.append('LengthWidthHeightType', productDimensionUnit);
      formData.append('WeightType', productWeightUnit);
      formData.append('shippingNote', shippingNote);
      formData.append('CompanyName', companyName);
      formData.append('CompanyInformation', companyInformation);
      formData.append('NotReturnable', isReturnable);
      formData.append('ReturnInformation', returnInformation);
      formData.append('ShowOnHomePage', isHomePage);
      formData.append('AvailableQuantity', availableQty);
      formData.append('ProductionTime', productionTime);

      colorSelectedOption.map((color, idx) => {
        formData.append(`Colors[${idx}].ColorName`, color.label);
        formData.append(`Colors[${idx}].ColorHashValue`, color.value);
      });

      imageList[0].map((image, idx) => {
        if (image.length !== 0) {
          formData.append(`ProductImages`, image, image.name);
        }
      });

      dispatch(productUploadPending());

      try {
        const isAuth = await productUpload(formData);
        resetFields();
        dispatch(productUploadSuccess());
        SuccessToast('Product Upload successful.');
      } catch (error) {
        console.log(error);
        errorToast('Product Upload failed.');
        // setProgressed(100);
        dispatch(productUploadFail(error.message));
      }
    }
  };

  return (
    <div className={ProductUploadScreenClasses} {...restProps}>
      {isUploadLoading && (
        <Modal isOpen={true} size="xxxxs">
          <div className="flex items-center justify-center py-4 align-middle">
            <Loader type="Grid" color="#1c473c" size={100} />
          </div>
        </Modal>
      )}

      <form action="" method="post">
        <div className="flex mb-6">
          <div className="w-8/12 mr-4 product-upload-screen__left">
            <div className="mb-5 product-upload-screen__left__top">
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left required text-G-dark">
                  Product Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={mainCategories}
                  value={mainSelectedOption}
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
                <span className="w-2/5 text-left required text-G-dark">
                  Product Sub-Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={mainSelectedOption ? subCategories : []}
                  value={mainSelectedOption ? subSelectedOption : null}
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
                <span className="w-2/5 text-left required text-G-dark">
                  Product Child-Category
                </span>
                <AutoSelect
                  isLoading={isLoading}
                  options={subSelectedOption ? childCategories : []}
                  value={subSelectedOption ? childSelectedOption : null}
                  onChange={(selectOption) => {
                    if (selectOption) {
                      setChildSelectedOption(selectOption);
                      setSubSelectedOption(selectOption);
                    } else {
                      setChildSelectedOption();
                    }
                  }}
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left required text-G-dark">
                  Product Title
                </span>
                <TextField
                  value={productName}
                  placeholder="Product Title"
                  textRules="50 characters maximum"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left required text-G-dark">
                  Meta Keyword
                </span>
                <TextField
                  value={metaKeyword}
                  placeholder="Meta Keyword"
                  textRules="50 characters maximum"
                  onChange={(e) => setMetaKeyword(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-3 product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark required">
                  Meta Description
                </span>
                <TextArea
                  value={metaDescription}
                  placeholder="Meta Description"
                  maxLength={150}
                  rows={2}
                  textRules="150 characters maximum"
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark required">
                  Short Product Description
                </span>
                <TextArea
                  value={shortProductDescription}
                  placeholder="Short Product Description"
                  maxLength={200}
                  rows={3}
                  textRules="200 characters maximum"
                  onChange={(e) => setShortProductDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center product-upload-screen__left__product-category">
                <span className="w-2/5 text-left text-G-dark">
                  Full Product Description
                </span>
                <TextArea
                  value={fullProductDescription}
                  placeholder="Full Product Description"
                  maxLength={500}
                  rows={5}
                  textRules="500 characters maximum"
                  onChange={(e) => setFullProductDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex product-upload-screen__left__bottom">
              <span className="w-2/6 text-left text-G-dark">
                Images Drag & Drop Or Upload
              </span>
              <div className="grid grid-cols-4 gap-2">
                <DropZone img={image1} setImages={setImage1} />
                <DropZone img={image2} setImages={setImage2} />
                <DropZone img={image3} setImages={setImage3} />
                <DropZone img={image4} setImages={setImage4} />
                <DropZone img={image5} setImages={setImage5} />
                <DropZone img={image6} setImages={setImage6} />
                <DropZone img={image7} setImages={setImage7} />
                <DropZone img={image8} setImages={setImage8} />
              </div>
            </div>
          </div>
          <div className="flex-1 product-upload-screen__right">
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark required">
                WholeSale Price
              </span>
              <TextField
                value={wholeProductPrice}
                type="number"
                placeholder="USD"
                onChange={(e) => setWholeProductPrice(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark required">
                Retail Price
              </span>
              <TextField
                value={RetailProductPrice}
                type="number"
                placeholder="USD"
                onChange={(e) => setRetailProductPrice(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Shipping Size & Weight
              </span>
              <div className="flex flex-col w-full p-3 border-2 product-upload-screen__left__product-category__shipping-details border-G-dark">
                <TextField
                  value={productQuantity}
                  placeholder="Size:1 Description i.e, small"
                  className="mb-3"
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <TextField
                    value={productLength}
                    type="number"
                    placeholder="Length"
                    onChange={(e) => setProductLength(e.target.value)}
                  />
                  <TextField
                    value={productWidth}
                    type="number"
                    placeholder="Width"
                    onChange={(e) => setProductWidth(e.target.value)}
                  />
                  <TextField
                    value={productHeight}
                    type="number"
                    placeholder="Height"
                    onChange={(e) => setProductHeight(e.target.value)}
                  />
                  <fieldset id="length" className="flex justify-around">
                    <RadioButton
                      id="cm"
                      title="cm"
                      name="length"
                      value="cm"
                      checked={productDimensionUnit === 'cm'}
                      onChange={(e) => setProductDimensionUnit('cm')}
                    />
                    <RadioButton
                      id="inch"
                      title="Inch"
                      name="length"
                      value="inch"
                      checked={productDimensionUnit === 'inch'}
                      onChange={(e) => setProductDimensionUnit('inch')}
                    />
                  </fieldset>

                  {/* <DropDown className="w-1/4" /> */}
                  <TextField
                    value={productWeight}
                    type="number"
                    placeholder="Weight"
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                  <fieldset id="weight" className="flex justify-around">
                    <RadioButton
                      id="kg"
                      title="kg"
                      name="weight"
                      value="kg"
                      checked={productWeightUnit === 'kg'}
                      onChange={(e) => setProductWeightUnit('kg')}
                    />
                    <RadioButton
                      id="Pou"
                      title="Pou"
                      name="weight"
                      value="pou"
                      checked={productWeightUnit === 'pou'}
                      onChange={(e) => setProductWeightUnit('pou')}
                    />
                  </fieldset>
                  {/* <DropDown className="w-1/4" /> */}
                </div>
                <TextField
                  value={shippingNote}
                  placeholder="Notes (optional)"
                  onChange={(e) => setShippingNote(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">Colours</span>
              <AutoSelect
                isLoading={isLoading}
                options={selectColors}
                value={colorSelectedOption !== null ? colorSelectedOption : []}
                onChange={(selectOption) => {
                  if (selectOption) {
                    setColorSelectedOption(selectOption);
                  } else {
                    setColorSelectedOption();
                  }
                }}
                isMultiple={true}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Available Quantity
              </span>
              <TextField
                value={availableQty}
                type="number"
                placeholder="Enter Quantity"
                onChange={(e) => setAvailableQty(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Production time
              </span>
              <TextField
                value={productionTime}
                placeholder="Eg: 1d 2h 40m"
                onChange={(e) => setProductionTime(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">Company Name</span>
              <TextField
                value={companyName}
                placeholder="Company Name"
                textRules="500 characters maximum"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Company Information
              </span>
              <TextArea
                value={companyInformation}
                placeholder="Company Information"
                maxLength={500}
                rows={3}
                textRules="500 characters maximum"
                onChange={(e) => setCompanyInformation(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">Is Returnable</span>
              <div className="w-full">
                <CheckBox
                  value={isReturnable}
                  onChange={(e) => setIsReturnable(e.target.checked)}
                />
              </div>
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Return Information
              </span>
              <TextArea
                value={returnInformation}
                placeholder="Return Information"
                maxLength={500}
                rows={3}
                textRules="500 characters maximum"
                onChange={(e) => setReturnInformation(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-3 product-upload-screen__left__product-category">
              <span className="w-2/5 text-left text-G-dark">
                Display On Home Page
              </span>
              <div className="w-full">
                <CheckBox
                  value={isHomePage}
                  onChange={(e) => setIsHomePage(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button
            children="Save"
            className="items-center w-1/5 px-6 py-1 text-sm font-medium h-7 md:h-10 md:py-2 xl:px-8 bg-G-light hover:text-white"
            onClick={(e) => handleSubmit(e)}
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

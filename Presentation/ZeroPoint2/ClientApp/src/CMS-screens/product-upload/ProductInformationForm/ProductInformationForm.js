import React, { useEffect, useState } from 'react';
import CN from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '../../../components/TextField/TextField';
import RadioButton from '../../../components/RadioButton/RadioButton';
import AutoSelect from '../../../components/AutoSelect/AutoSelect';

import './ProductInformationForm.scss';
import { getProductCategoryForUpload } from '../../../api/productApi';
import {
  getProductCategoryFail,
  getProductCategoryPending,
  getProductCategorySuccess,
} from '../../../features/productCategoryforUploadSlice';
import {
  getAllCompaniesFail,
  getAllCompaniesPending,
  getAllCompaniesSuccess,
} from '../../../features/getCompanySlice';
import { getAllCompaniesToSelect } from '../../../api/companyApi';
import CheckBox from '../../../components/CheckBox/CheckBox';
import { useParams } from 'react-router-dom';

export const ProductInformationForm = ({
  className,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  productInformation,
  ...restProps
}) => {
  const ProductInformationFormClasses = CN(
    'product-information-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  const dispatch = useDispatch();

  const { id } = useParams();

  const productTypes = [
    { value: '1', label: 'variant' },
    { value: '2', label: 'simple' },
  ];

  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [mainSelectedCategory, setMainSelectedCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSelectedCategory, setSubSelectedCategory] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [childSelectedCategory, setChildSelectedCategory] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companySelected, setCompanySelected] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);

  const { isLoading } = useSelector(
    (state) => state.getProductCategoryForUpload
  );

  const { isLoading: isLoadingCompanies } = useSelector(
    (state) => state.getCompanies
  );

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

  useEffect(() => {
    if (categories.length !== 0) {
      const mainOptionCopy = [];
      categories?.map((category) => {
        mainOptionCopy.push({ value: category.id, label: category.name });
        setMainCategories(mainOptionCopy);
      });
    }
  }, [categories]);

  useEffect(() => {
    if (mainSelectedCategory !== null) {
      const subOptionCopy = [];
      categories?.filter((category) => {
        if (category.id === mainSelectedCategory?.value) {
          category.childCategoryList?.map((subCategory) => {
            subOptionCopy.push({
              value: subCategory.id,
              label: subCategory.name,
            });
            setSubCategories(subOptionCopy);
          });
        }
      });
    } else {
      setSubCategories([]);
      setChildCategories([]);
      setSubSelectedCategory(null);
    }
  }, [mainSelectedCategory]);

  useEffect(() => {
    if (mainSelectedCategory?.length !== 0) {
      const childOptionCopy = [];
      const sub = categories?.filter(
        (category) => category.id === mainSelectedCategory?.value
      );

      let childCategory = [];
      if (sub.length !== 0) {
        childCategory = sub[0]?.childCategoryList.filter(
          (category) => category.id === subSelectedCategory?.value
        );
      }

      if (childCategory) {
        const childOptionCopy = [];
        childCategory[0]?.childCategoryList.map((category) => {
          childOptionCopy.push({ value: category.id, label: category.name });
        });

        setChildCategories(childOptionCopy);
      }
    }
    if (subSelectedCategory === null) {
      setChildCategories([]);
      setChildSelectedCategory([]);
    }
  }, [subSelectedCategory]);

  useEffect(async () => {
    dispatch(getAllCompaniesPending());
    try {
      const companiesDetails = await getAllCompaniesToSelect();
      const companiesDetailsCopy = [];
      companiesDetails.map((company) => {
        companiesDetailsCopy.push({
          value: company.id,
          label: company.companyName,
        });
      });
      setCompanies(companiesDetailsCopy);
      dispatch(getAllCompaniesSuccess());
    } catch (error) {
      dispatch(getAllCompaniesFail(error.message));
    }
  }, []);

  useEffect(() => {
    if (id) {
      const filterMainValue = mainCategories.filter(
        (category) => category.value === values?.productCategory
      );
      const filterSubValue = subCategories.filter(
        (category) => category.value === values?.productSubCategory
      );
      const filterChildValue = childCategories.filter(
        (category) => category.value === values?.productChildCategory
      );
      setMainSelectedCategory(filterMainValue[0]);
      setSubSelectedCategory(filterSubValue[0]);
      setChildSelectedCategory(filterChildValue[0]);
    }
  }, [mainCategories, subCategories, childCategories]);

  useEffect(() => {
    const filterCompanyValue = companies.filter(
      (company) => company.value === values?.company
    );
    setCompanySelected(filterCompanyValue[0]);
  }, [companies]);

  useEffect(() => {
    const filterProductType = productTypes.filter(
      (productType) => productType.label === values?.productType
    );
    setSelectedProductType(filterProductType[0]);
  }, [productInformation]);

  return (
    <div className={ProductInformationFormClasses} {...restProps}>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Name<span className="required"></span> :
        </span>
        <TextField
          id="productName"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productName"
          value={values?.productName}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Category <span className="required"></span> :
        </span>
        <AutoSelect
          id="productCategory"
          isLoading={isLoading}
          onChange={(selectedOption) => {
            setFieldValue('productCategory', selectedOption);
            setMainSelectedCategory(selectedOption);
          }}
          onBlur={handleBlur}
          name="productCategory"
          options={mainCategories}
          value={mainSelectedCategory}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Sub Category<span className="required"></span> :
        </span>
        <AutoSelect
          id="productSubCategory"
          isLoading={isLoading}
          onChange={(selectedOption) => {
            setFieldValue('productSubCategory', selectedOption);
            setSubSelectedCategory(selectedOption);
          }}
          onBlur={handleBlur}
          name="productSubCategory"
          options={subCategories}
          value={subSelectedCategory}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Child Category<span className="required"></span> :
        </span>
        <AutoSelect
          id="productChildCategory"
          isLoading={isLoading}
          onChange={(selectedOption) => {
            setFieldValue('productChildCategory', selectedOption);
            setChildSelectedCategory(selectedOption);
          }}
          onBlur={handleBlur}
          name="productChildCategory"
          options={childCategories || []}
          value={childSelectedCategory}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Supplier Product Code :
        </span>
        <TextField
          id="supplierProductCode"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="supplierProductCode"
          value={values?.supplierProductCode}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Meta Keyword<span className="required"></span> :
        </span>
        <TextField
          id="metaKeyword"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="metaKeyword"
          value={values?.metaKeyword}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Meta Description :
        </span>
        <TextField
          id="metaDescription"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="metaDescription"
          value={values?.metaDescription}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Short Description :
        </span>
        <TextField
          id="productShortDescription"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productShortDescription"
          value={values?.productShortDescription}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Full Description :
        </span>
        <TextField
          id="productFullDescription"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productFullDescription"
          value={values?.productFullDescription}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Available Quantity :
        </span>
        <TextField
          type="number"
          id="availableQuantity"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="availableQuantity"
          value={values?.availableQuantity}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Company<span className="required"></span>:
        </span>
        <AutoSelect
          id="company"
          isLoading={isLoadingCompanies}
          onChange={(selectedOption) => {
            setFieldValue('company', selectedOption);
            setCompanySelected(selectedOption);
          }}
          onBlur={handleBlur}
          name="company"
          options={companies || []}
          value={companySelected}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Production Time :
        </span>
        <TextField
          id="productTime"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productTime"
          value={values?.productTime}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark required">
          Product Type :
        </span>
        <AutoSelect
          id="productType"
          isLoading={isLoadingCompanies}
          onChange={(selectedOption) => {
            setFieldValue('productType', selectedOption);
            setSelectedProductType(selectedOption);
          }}
          onBlur={handleBlur}
          name="productType"
          options={productTypes}
          value={selectedProductType}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Unit of Measure :
        </span>
        <TextField
          id="unitOfMeasure"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="unitOfMeasure"
          value={values?.unitOfMeasure}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex justify-center gap-x-2">
          <span className="text-sm font-semibold text-G-dark">
            Made For Order :
          </span>
          <CheckBox
            id="madeForOrder"
            name="madeForOrder"
            onChange={handleChange}
            onBlur={handleBlur}
            type="checkbox"
            value={values?.madeForOrder}
          />
        </div>
        <div className="flex gap-x-2">
          <span className="text-sm font-semibold text-G-dark">
            Display on Home page :
          </span>
          <CheckBox
            id="displayOnHomePage"
            name="displayOnHomePage"
            onChange={handleChange}
            onBlur={handleBlur}
            type="checkbox"
            value={values?.displayOnHomePage}
          />
        </div>
      </div>
    </div>
  );
};

ProductInformationForm.defaultProps = {
  className: undefined,
};

export default ProductInformationForm;

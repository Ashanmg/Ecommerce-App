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

export const ProductInformationForm = ({
  className,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  ...restProps
}) => {
  const ProductInformationFormClasses = CN(
    'product-information-form px-3 py-7 border-t border-N-100 flex flex-col gap-y-3',
    className,
    {}
  );

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [mainSelectedCategory, setMainSelectedCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSelectedCategory, setSubSelectedCategory] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companySelected, setCompanySelected] = useState([]);

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
    const subOptionCopy = [];
    categories?.filter((category) => {
      if (category.id === mainSelectedCategory.value) {
        category.childCategoryList?.map((subCategory) => {
          subOptionCopy.push({
            value: subCategory.id,
            label: subCategory.name,
          });
          setSubCategories(subOptionCopy);
        });
      }
    });
  }, [mainSelectedCategory]);

  useEffect(() => {
    if (mainSelectedCategory.length !== 0) {
      const childOptionCopy = [];
      const sub = categories.filter(
        (category) => category.id === mainSelectedCategory.value
      );

      const { childCategoryList } = sub[0];

      const childCategory = childCategoryList.filter(
        (category) => category.id === subSelectedCategory.value
      );

      if (childCategory) {
        const childOptionCopy = [];
        childCategory[0].childCategoryList.map((category) => {
          childOptionCopy.push({ value: category.id, label: category.name });
        });

        setChildCategories(childOptionCopy);
      }
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
          value={values.productName}
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
          value={values.productCategory}
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
          value={values.productSubCategory}
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
          }}
          onBlur={handleBlur}
          name="productChildCategory"
          options={childCategories || []}
          value={values.productChildCategory}
          placeHolder=""
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
          value={values.metaKeyword}
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
          value={values.metaDescription}
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
          value={values.productShortDescription}
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
          value={values.productFullDescription}
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
          value={values.availableQuantity}
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
          value={values.company}
          placeHolder=""
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Made For Order :
        </span>
        <TextField
          id="madeForOrder"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="madeForOrder"
          value={values.madeForOrder}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Time :
        </span>
        <TextField
          id="productTime"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productTime"
          value={values.productTime}
        />
      </div>
      <div className="flex items-center w-full">
        <span className="w-2/12 text-sm font-semibold text-G-dark">
          Product Type :
        </span>
        <TextField
          id="productType"
          className="border border-G-dark"
          onChange={handleChange}
          onBlur={handleBlur}
          name="productType"
          value={values.productType}
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
          value={values.unitOfMeasure}
        />
      </div>
      <div className="flex items-center w-full">
        <span
          className="text-sm font-semibold text-G-dark"
          style={{ width: '217px' }}
        >
          Display on Home page :
        </span>
        <CheckBox
          id="displayOnHomePage"
          name="displayOnHomePage"
          onChange={handleChange}
          onBlur={handleBlur}
          type="checkbox"
          value={values.displayOnHomePage}  
        />
      </div>
    </div>
  );
};

ProductInformationForm.defaultProps = {
  className: undefined,
};

export default ProductInformationForm;

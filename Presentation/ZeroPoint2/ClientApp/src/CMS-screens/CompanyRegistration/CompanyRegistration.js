import React, { useState } from 'react';
import CN from 'classnames';
import { RiAddLine } from 'react-icons/ri';
import Loader from 'react-spinners/PuffLoader';
import { toast, Flip } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';
import RadioButton from '../../components/RadioButton/RadioButton';
import Chip from '../../components/Chip/Chip';
import {
  companyRegisterFail,
  companyRegisterPending,
  companyRegisterSuccessful,
} from '../../features/companyRegisterSlice';
import { companyRegister } from '../../api/companyApi';

import './CompanyRegistration.scss';
import { Modal } from '../../components/Modal/Modal';

export const CompanyRegistration = ({ className, ...restProps }) => {
  const CompanyRegistrationClasses = CN(
    'company-registration flex flex-col',
    className,
    {}
  );

  const errorToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'error',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'dark',
      // transition: Flip,
    });
  };

  const SuccessToast = (message) => {
    toast(message, {
      position: 'top-right',
      type: 'success',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'dark',
      // transition: Flip,
    });
  };

  const { isUploadLoading } = useSelector((state) => state.companyRegister);

  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [returnablePolicy, setReturnablePolicy] = useState(false);
  const [logo, setLogo] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [inputList, setInputList] = useState([
    { title: '', image: [], imageUrl: '', description: '', isLeftAlign: true },
  ]);
  const [addedItemList, setAddedItemList] = useState([]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { id, name, value } = e.target;
    value;
    const list = [...inputList];
    if (id === `left-align-${index}`) {
      list[index].isLeftAlign = true;
    } else if (id === `right-align-${index}`) {
      list[index].isLeftAlign = false;
    } else if (e.target.name === 'image') {
      list[index][name] = e.target.files[0];
      list[index]['imageUrl'] = URL.createObjectURL(e.target.files[0]);
    } else {
      list[index][name] = value;
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        title: '',
        image: [],
        imageUrl: '',
        description: '',
        isLeftAlign: true,
      },
    ]);
  };

  const handleAddItemList = (e, idx) => {
    e.preventDefault();
    const list = [...addedItemList, inputList[idx]]; // add inputList to addedItemList
    setAddedItemList(list);
    const inputListCopy = [...inputList];
    inputListCopy.splice(idx, 1);
    setInputList(inputListCopy);
  };

  const resetForm = () => {
    setCompanyName('');
    setCompanyDescription('');
    setReturnablePolicy('');
    setLogo([]);
    setLogoUrl('');
    setInputList([
      {
        title: '',
        image: [],
        imageUrl: '',
        description: '',
        isLeftAlign: true,
      },
    ]);
    setAddedItemList([]);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (companyName === '') {
      errorToast('Please enter company name');
    } else if (companyDescription === '') {
      errorToast('Please enter company description');
    } else if (logo.length === 0) {
      errorToast('Please upload company logo');
    } else {
      const formData = new FormData();

      formData.append('CompanyName', companyName);
      formData.append('CompanySummary', companyDescription);
      formData.append('ReturnablePolicy', returnablePolicy);
      formData.append('CompanyLogoImage', logo, logo.name);

      for (let i = 0; i < addedItemList.length; i++) {
        formData.append(`CompanyFeatures[${i}].Id`, 0);
        formData.append(
          `CompanyFeatures[${i}].FeatureTitle`,
          addedItemList[i].title
        );
        formData.append(
          `CompanyFeatures[${i}].FeatureSummary`,
          addedItemList[i].description
        );
        formData.append(
          `CompanyFeatures[${i}].FeatureImage`,
          addedItemList[i].image,
          addedItemList[i].image.name
        );
        formData.append(
          `CompanyFeatures[${i}].IsImageLeftAligned`,
          addedItemList[i].isLeftAlign
        );
      }

      dispatch(companyRegisterPending());

      try {
        const companyRegistered = await companyRegister(formData);
        dispatch(companyRegisterSuccessful());
        resetForm();
        SuccessToast('Company registered successfully');
      } catch (error) {
        console.log(error);
        errorToast('Something went wrong');
        dispatch(companyRegisterFail(error.message));
      }
    }
  };

  return (
    <div className={CompanyRegistrationClasses} {...restProps}>
      {isUploadLoading && (
        <Modal isOpen={true} size="xxxxs">
          <div className="flex items-center justify-center py-4 align-middle">
            <Loader type="Grid" color="#1c473c" size={100} />
          </div>
        </Modal>
      )}
      <div className="flex justify-between dashboard__top">
        <div className="w-auto mb-10 text-3xl font-bold dashboard_title text-G-dark">
          Company Registration
        </div>
        <Button
          children="Add Company"
          className="flex items-center w-auto px-5 text-xs text-white border-2 rounded-sm gap-x-3 md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
          onClick={handleSubmit}
        />
      </div>
      <div className="grid flex-col company-registration__form gap-y-3">
        <div className="flex w-full gap-x-10">
          <div className="w-1/2 gap-y-5">
            <div className="pb-3 company-registration__form__company-name">
              <span className="pb-2 text-base text-G-dark">Company Name</span>
              <TextField
                placeholder="company name"
                className="border border-G-dark"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
              />
            </div>
            <div className="company-registration__form__company-name">
              <span className="text-base text-G-dark">Company Info</span>
              <TextArea
                rows={3}
                textRules="max length 500"
                onChange={(e) => setCompanyDescription(e.target.value)}
                value={companyDescription}
              />
            </div>
            <div className="company-registration__form__company-name">
              <span className="text-base text-G-dark">Returnable Policy</span>
              <TextArea
                rows={3}
                textRules="max length 500"
                onChange={(e) => setReturnablePolicy(e.target.value)}
                value={returnablePolicy}
              />
            </div>
          </div>
          <div className="company-registration__form__company-name">
            <span className="text-base text-G-dark">Company Logo</span>
            <DropZone
              className="w-32 h-32 bg-white"
              width={80}
              style={{ height: '124px' }}
              img={logoUrl}
              onChange={(e) => {
                setLogo(e.target.files[0]);
                setLogoUrl(URL.createObjectURL(e.target.files[0]));
              }}
              onClickCloseImg={(e) => {
                e.preventDefault();
                setLogo([]);
                setLogoUrl('');
              }}
            />
          </div>
        </div>
        <div className="w-10/12 company-registration__content-data">
          <div className="w-full mb-3 text-base dashboard_title text-G-dark">
            Company content
          </div>
          <div className="flex flex-wrap flex-shrink gap-2 my-2 company-registration__content-data__add-companies">
            {addedItemList.map(({ title }, index) => {
              return (
                <Chip
                  key={index}
                  title={title}
                  onClose={(e) => {
                    const addedItemListCopy = [...addedItemList];
                    addedItemListCopy.splice(index, 1);
                    setAddedItemList(addedItemListCopy);
                  }}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-y-4">
            {inputList.map(
              ({ title, description, isLeftAlign, image, imageUrl }, idx) => {
                return (
                  <div
                    className="flex flex-col p-2 gap-y-4"
                    style={{
                      border: '1px solid #013919',
                      borderRadius: '3px',
                      backgroundColor: '#e8f5e9',
                    }}
                    key={idx}
                  >
                    <div className="company-registration__content-data__title">
                      <TextField
                        placeholder="Title"
                        className="border border-G-dark"
                        name="title"
                        value={title}
                        onChange={(e) => handleInputChange(e, idx)}
                      />
                    </div>
                    {isLeftAlign ? (
                      <div className="flex flex-shrink gap-x-3">
                        <div className="flex">
                          <DropZone
                            className="w-32 h-32 bg-white"
                            width={80}
                            style={{ height: '124px' }}
                            img={imageUrl}
                            onChange={(e) => handleInputChange(e, idx)}
                            onClickCloseImg={(e) => {
                              e.preventDefault();
                              const list = [...inputList];
                              list[idx].imageUrl = [];
                              setInputList(list);
                            }}
                          />
                        </div>
                        <div className="flex-auto company-registration__content-data__content ">
                          <TextArea
                            rows={5}
                            textRules="max length 200"
                            name="description"
                            value={description}
                            onChange={(e) => handleInputChange(e, idx)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-shrink gap-x-3">
                        <div className="flex-auto company-registration__content-data__content ">
                          <TextArea
                            rows={5}
                            textRules="max length 200"
                            name="description"
                            value={description}
                            onChange={(e) => handleInputChange(e, idx)}
                          />
                        </div>
                        <div className="flex-">
                          <DropZone
                            className="w-32 h-32 bg-white"
                            width={80}
                            style={{ height: '124px' }}
                            img={imageUrl}
                            onChange={(e) => handleInputChange(e, idx)}
                            onClickCloseImg={(e) => {
                              e.preventDefault();
                              const list = [...inputList];
                              list[idx].imageUrl = [];
                              setInputList(list);
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between gap-x-3 add-remove-button">
                      <div className="flex gap-x-3">
                        <RadioButton
                          id={`left-align-${idx}`}
                          title="Left Align"
                          defaultChecked={true}
                          name={`align`}
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                        <RadioButton
                          id={`right-align-${idx}`}
                          title="Right Align"
                          name={`align`}
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                      </div>
                      <div className="flex gap-x-2">
                        {inputList.length > 1 && (
                          <Button
                            children="Remove"
                            className="flex items-center px-5 text-xs text-white border-2 rounded-sm gap-x-3 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                            onClick={() => handleRemoveClick(idx)}
                          />
                        )}
                        <Button
                          children="Add"
                          className="flex items-center px-5 text-xs text-white border-2 rounded-sm gap-x-3 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                          onClick={(e) => {
                            const list = [...inputList];
                            if (
                              list[idx].title !== '' &&
                              list[idx].description !== ''
                            ) {
                              handleAddItemList(e, idx);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="my-2">
            <Button
              beforeIcon={<RiAddLine size={24} />}
              className="flex items-center px-2 text-xs text-white border-2 rounded-sm gap-x-3 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              onClick={() => {
                handleAddClick();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CompanyRegistration.defaultProps = {
  className: undefined,
};

export default CompanyRegistration;

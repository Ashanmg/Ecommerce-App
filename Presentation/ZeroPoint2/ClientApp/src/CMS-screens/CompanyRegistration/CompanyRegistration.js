import React, { useState } from 'react';
import CN from 'classnames';
import { RiAddLine } from 'react-icons/ri';

import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';
import RadioButton from '../../components/RadioButton/RadioButton';
import Chip from '../../components/Chip/Chip';

import './CompanyRegistration.scss';

export const CompanyRegistration = ({ className, ...restProps }) => {
  const CompanyRegistrationClasses = CN(
    'company-registration flex flex-col',
    className,
    {}
  );

  const [inputList, setInputList] = useState([
    { title: '', image: '', description: '', isLeftAlign: true },
  ]);
  const [addedItemList, setAddedItemList] = useState([]);
  const [images, setImages1] = useState([]);

  // const handleImages = (files) => {
  //   setImages(files);
  // };

  // handle input change
  const handleInputChange = (e, index) => {
    const { id, name, value } = e.target;
    const list = [...inputList];
    if (id === `left-align-${index}`) {
      list[index].isLeftAlign = true;
    } else if (id === `right-align-${index}`) {
      list[index].isLeftAlign = false;
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
      { title: '', image: '', description: '', isLeftAlign: true },
    ]);
  };

  const handleAddItemList = (e) => {
    e.preventDefault();
    const list = [...addedItemList, ...inputList]; // add inputList to addedItemList
    setAddedItemList(list);
    setInputList([
      { title: '', image: '', description: '', isLeftAlign: true },
    ]);
  };

  return (
    <div className={CompanyRegistrationClasses} {...restProps}>
      <div className="w-full mb-10 text-3xl font-bold dashboard_title text-G-dark">
        Company Registration
      </div>
      <div className="grid flex-col company-registration__form gap-y-3">
        <div className="flex w-full gap-x-10">
          <div className="w-1/2 gap-y-5">
            <div className="pb-3 company-registration__form__company-name">
              <span className="pb-2 text-base text-G-dark">Company Name</span>
              <TextField placeholder="company name" />
            </div>
            <div className="company-registration__form__company-name">
              <span className="text-base text-G-dark">Company Info</span>
              <TextArea rows={3} textRules="max length 200" />
            </div>
          </div>
          <div className="company-registration__form__company-name">
            <span className="text-base text-G-dark">Company Logo</span>
            <DropZone className="w-28 h-28" />
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
            {inputList.map(({ title, description, isLeftAlign }, idx) => {
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
                          img={images}
                          setImages={setImages1}
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
                          img={images}
                          setImages={setImages1}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-x-3 add-remove-button">
                    {console.log(idx)}
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
                        onClick={handleAddItemList}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-2">
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

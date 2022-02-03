import React from 'react';
import CN from 'classnames';

import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import DropZone from '../../components/DropZone/DropZone';
import Button from '../../components/Button/Button';

import './CompanyRegistration.scss';
import RadioButton from '../../components/RadioButton/RadioButton';

export const CompanyRegistration = ({ className, ...restProps }) => {
  const CompanyRegistrationClasses = CN(
    'company-registration flex flex-col',
    className,
    {}
  );

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
        <div className="w-8/12 company-registration__content-data">
          <div className="w-full mb-3 text-base dashboard_title text-G-dark">
            Company content
          </div>
          <div
            className="flex flex-col p-2 gap-y-4"
            style={{
              border: '1px solid #013919',
              borderRadius: '3px',
              backgroundColor: '#e8f5e9',
            }}
          >
            <div className="company-registration__content-data__title">
              <TextField placeholder="Title" />
            </div>
            <div className="flex flex-shrink gap-x-3">
              <div className="flex-">
                <DropZone className="w-32 h-32 bg-white" />
              </div>
              <div className="flex-auto company-registration__content-data__content ">
                <TextArea rows={5} textRules="max length 200" />
              </div>
            </div>
            <div className="flex justify-between gap-x-3 add-remove-button">
              <div className='flex gap-x-3'>
                <RadioButton
                  id="cm"
                  title="Left Align"
                  name="length"
                  value="cm"
                />
                <RadioButton
                  id="cm"
                  title="Right Align"
                  name="length"
                  value="cm"
                />
              </div>

              <Button
                children="Add"
                className="flex items-center px-5 text-xs text-white border-2 rounded-sm gap-x-3 h-7 w-max md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
              />
            </div>
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

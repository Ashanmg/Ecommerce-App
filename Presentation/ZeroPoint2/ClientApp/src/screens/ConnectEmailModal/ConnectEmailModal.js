import React from 'react';
import CN from 'classnames';

import './ConnectEmailModal.scss';
import TextField from '../../components/TextField/TextField';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { emailRegisterFail, emailRegisterSuccessful, emailRegistrationPending } from '../../features/contactFormSlice';
import { contactEmailRegister } from '../../api/userApi';

export const ConnectEmailModal = ({ className, onClose, ...restProps }) => {
  const ConnectEmailModalClasses = CN('connect-email-modal', className, {});

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
    });
  };

  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '') {
      errorToast('Name is required');
    } else if (email === '' || !email.includes('@')) {
      errorToast('Email is Required and must be a valid email');
    } else if (message === '') {
      errorToast('Message is required');
    } else {
      dispatch(emailRegistrationPending());
      try {
        const data = await contactEmailRegister({name, email, message});
        console.log(data);
        var message = data['message'];
        reset();
        dispatch(emailRegisterSuccessful());
        SuccessToast(message);
        onClose();
      } catch (error) {
        console.log(error);
        dispatch(emailRegisterFail(error));
        errorToast('Please try again later');
      }
    }
  };

  return (
    <div
      className={ConnectEmailModalClasses}
      {...restProps}
      style={{ backgroundColor: '#01a45300' }}
    >
      <div className="flex items-center justify-center w-full h-full p-5 sign-up-screen__wrapper">
        <div className="flex flex-col justify-center flex-1 h-full p-10 bg-white border-4 sign-up-screen__left border-G-light">
          <div className="mb-8 text-2xl font-semibold text-center sign-up-screen__left__title text-G-dark">
            Connect Your Email
          </div>
          <div className="text-xs sign-up-screen__left__form">
            <form action="submit">
              <TextField
                placeholder="Name"
                className="mb-4 border"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                placeholder="Email"
                autoComplete="off"
                className="mb-4 border"
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextArea
                rows={5}
                maxLength={500}
                placeholder="Message"
                className="border-1"
                textRules="max length 500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* <div className="flex items-end justify-end w-full mt-1"> */}
              <Button
                children="Submit"
                className="flex items-center justify-center w-full px-5 mt-1 text-xs text-white border-2 rounded-sm gap-x-3 h-7 md:h-8 lg:h-10 bg-G-light lg:text-sm border-G-light hover:bg-white hover:text-G-dark"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              />
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ConnectEmailModal.defaultProps = {
  className: undefined,
};

export default ConnectEmailModal;

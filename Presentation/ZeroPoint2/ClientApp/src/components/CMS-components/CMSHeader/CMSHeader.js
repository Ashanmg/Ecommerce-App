import React from 'react';
import CN from 'classnames';
import { RiMenuAddFill } from 'react-icons/ri';

import Button from '../../Button/Button';
import zeroLogo from '../../../assets/zeropoint2mainlogo.svg';

import './CMSHeader.scss';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';

export const CMSHeader = ({ className, ...restProps }) => {
  const CMSHeaderClasses = CN(
    'cms-header items-center flex shadow-sm border-G-200 px-[20px] justify-between px-3 bg-G-light',
    className,
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className={CMSHeaderClasses} {...restProps}>
      <div className="header__left flex flex-row gap-x-4">
        <a href="/">
          <img src={zeroLogo} alt="Logo" width="240" height="20" />
        </a>
        <Button
          className="header__toggle"
          onClick={() => console.log('clicked')}
          beforeIcon={<RiMenuAddFill size={32} className="text-G-dark" />}
        ></Button>
      </div>
      <div className="header__right flex gap-x-4 items-center">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
            dispatch(logOut());
          }}
        >
          <span className="text-G-dark">Logout</span>
        </Button>
        <Button>
          <span className="text-G-dark">Home</span>
        </Button>
        {/* <Avatar title='A M' className='cursor-pointer' /> */}
      </div>
    </header>
  );
};

CMSHeader.defaultProps = {
  className: undefined,
};

export default CMSHeader;

import React from 'react';
import CN from 'classnames';

import './SidebarMainMenu.scss';
import { RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const SidebarMainMenu = ({
  className,
  title,
  icon,
  link,
  ...restProps
}) => {
  const SidebarMainMenuClasses = CN(
    'sidebar-main-menu flex items-center py-2 cursor-pointer',
    className,
    {}
  );

  return (
    <div className={SidebarMainMenuClasses} {...restProps}>
      <Link to={link}>
        <div
          className="p-2 mr-2 rounded-full"
          style={{ backgroundColor: '#ffffff0d' }}
        >
          {icon}
        </div>
      </Link>
      <Link to={link}>
        <span className="text-G-light font-semibold hover:text-G-100">
          {title}
        </span>
      </Link>
    </div>
  );
};

SidebarMainMenu.defaultProps = {
  title: 'Dashboard',
  className: undefined,
};

export default SidebarMainMenu;

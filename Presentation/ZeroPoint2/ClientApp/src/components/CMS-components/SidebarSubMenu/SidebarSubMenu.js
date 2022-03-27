import React from 'react';
import CN from 'classnames';

import './SidebarSubMenu.scss';
import { Link } from 'react-router-dom';

export const SidebarSubMenu = ({ className, subMenu, ...restProps }) => {
  const SidebarSubMenuClasses = CN(
    'sidebar-sub-menu pl-14 py-3',
    className,
    {}
  );

  return (
    <div
      className={SidebarSubMenuClasses}
      {...restProps}
      style={{ backgroundColor: '#ffffff0d' }}
    >
      <ul className="text-G-light font-medium">
        {subMenu?.map((item) => (
          <li className="py-2">
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

SidebarSubMenu.defaultProps = {
  className: undefined,
  subMenu: [],
};

export default SidebarSubMenu;

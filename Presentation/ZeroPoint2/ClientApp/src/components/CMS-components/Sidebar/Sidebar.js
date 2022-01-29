import React from 'react';
import CN from 'classnames';
import Accordion from '../../Accordion/Accordion';

import './Sidebar.scss';
import SidebarMainMenu from '../SidebarMainMenu/SidebarMainMenu';
import {
  RiClipboardFill,
  RiDashboardFill,
  RiShoppingCartFill,
} from 'react-icons/ri';
import SidebarSubMenu from '../SidebarSubMenu/SidebarSubMenu';

export const Sidebar = ({ className, ...restProps }) => {
  const SidebarClasses = CN(
    'sidebar flex flex-row w-72 bg-G-dark h-full flex-shrink-0 p-5',
    className,
    {}
  );

  return (
    <div className={SidebarClasses} {...restProps}>
      <Accordion
        list={[
          {
            id: 0,
            title: (
              <SidebarMainMenu
                title="Dashboard"
                icon={
                  <RiDashboardFill
                    size={32}
                    className="text-G-light hover:text-G-100"
                  />
                }
                link="/admin/dashboard"
              />
            ),
          },
          {
            id: 1,
            title: (
              <SidebarMainMenu
                title="Catalog"
                icon={
                  <RiClipboardFill
                    size={32}
                    className="text-G-light hover:text-G-100"
                  />
                }
                link=""
              />
            ),
            content: (
              <SidebarSubMenu
                subMenu={[
                  {id: 0, title: 'Products Upload', link: '/admin/product-upload'},
                  { id: 1, title: 'Products', link: '/admin/products' },
                  { id: 2, title: 'Categories', link: '/categories' },
                  { id: 3, title: 'Brands', link: '/brands' },
                  { id: 4, title: 'Tags', link: '/tags' },
                  { id: 5, title: 'Companies', link: '/admin/companies' }
                ]}
              />
            ),
          },
          {
            id: 2,
            title: (
              <SidebarMainMenu
                title="Sales"
                icon={
                  <RiShoppingCartFill
                    size={32}
                    className="text-G-light hover:text-G-100"
                  />
                }
                link=""
              />
            ),
            content: (
              <SidebarSubMenu
                subMenu={[
                  { id: 1, title: 'Orders', link: '/orders' },
                  { id: 2, title: 'shipments', link: '/shipment' },
                  { id: 3, title: 'Return request', link: '/return-request' },
                  {
                    id: 4,
                    title: 'Recurring payments',
                    link: '/recurring-payments',
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

Sidebar.defaultProps = {
  className: undefined,
};

export default Sidebar;

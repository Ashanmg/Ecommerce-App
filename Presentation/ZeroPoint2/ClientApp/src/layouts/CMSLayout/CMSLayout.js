import React, { useCallback, useEffect, useState } from 'react';
import CN from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './CMSLayout.scss';
import NavBar from '../../components/NavBar/NavBar';
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/CMS-components/Sidebar/Sidebar';
import CMSHeader from '../../components/CMS-components/CMSHeader/CMSHeader';

export const CMSLayout = ({ className, children, ...restProps }) => {
  const CMSLayoutClasses = CN('cms-layout', className, {});

  const [y, setY] = useState(window.scrollY);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;

      if (y > window.scrollY) {
        setIsScrolling(true);
        if (window.scrollY === 0) {
          setIsScrolling(false);
        }
      } else if (y < window.scrollY) {
        setIsScrolling(true);
        if (window.scrollY === 0) {
          setIsScrolling(false);
        }
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <CMSHeader className="fixed left-0 right-0 top-0 h-16" />

      <div className="cms-layout-layout__container fixed top-16 left-0 right-0 bottom-0 flex overflow-scroll">
        <Sidebar />

        <main className="flex flex-col w-full cms-layout-layout__wrapper">
          <div
            className={CN(
              'cms-layout-layout__inner py-8 px-8 flex flex-col w-full h-full'
            )}
          >
            <div className="flex-1 w-full cms-layout-layout__content">
              {children}
            </div>
          </div>
        </main>
      </div>
      {/* <footer className="flex mt-4 mb-4">
        <Footer isScrolling={isScrolling} />
      </footer> */}
    </>
  );
};

CMSLayout.defaultProps = {
  className: undefined,
};

export default CMSLayout;

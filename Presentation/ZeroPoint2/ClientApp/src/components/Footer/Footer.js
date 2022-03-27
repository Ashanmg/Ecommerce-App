import React, { useRef } from 'react';
import CN from 'classnames';
import { RiArrowDropUpLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import useMediaQuery from '../../config/customHooks/useMediaQuery';
import { Instagram } from '../icons/Instagram';
import Email from '../icons/Email';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';

import './Footer.scss';
import ConnectEmailModal from '../../screens/ConnectEmailModal/ConnectEmailModal';
import useOnClickOutside from '../../config/utils/useOnClickOutside';

export const Footer = ({ className, isScrolling, ...restProps }) => {
  const FooterClasses = CN(
    'footer container max-w-screen-xl flex px-1 md:px-3 flex-row flex-wrap justify-center md:justify-between items-center lg:items-end max-w-screen-xl pb-0 fixed bottom-0 left-0 right-0 w-full z-10 bg-white pt-1',
    className,
    {}
  );

  const isSmallWide = useMediaQuery('(max-width: 640px)');

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => {
    setExpanded(false);
  });

  const [expanded, setExpanded] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  if (isSmallWide) {
    return (
      <div
        className={CN(FooterClasses, { 'shadow-md': isScrolling === true })}
        {...restProps}
      >
        <div
          className="flex flex-col items-center justify-between w-full"
          style={{ backgroundColor: '#80bf9b' }}
        >
          <div className="my-1 text-xs italic text-white copyRight">
            Copyrights © 2022 zeropoint2.com. All rights
            reserved.sfsafdasfsafsafd
          </div>
          <div className="mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5">
            <Link
              to="./contact-info"
              className="italic text-white hover:text-G-dark"
            >
              About
            </Link>
            <Link
              to="./support"
              className="italic text-white hover:text-G-dark px-7"
            >
              Support
            </Link>
            <a href="./" className="italic text-white hover:text-G-dark">
              Connect
            </a>
          </div>
        </div>
        <hr
          style={{ width: '100%', height: '4px', border: 'none' }}
          size="3"
          color="white"
        />
      </div>
    );
  }

  return (
    <div className={FooterClasses} {...restProps}>
      <div
        className="flex flex-row items-center justify-between w-full px-2 py-2"
        style={{ backgroundColor: '#80bf9b' }}
      >
        <div className="text-xs italic text-white copyRight">
          Copyright © 2022 zeropoint2.com. All rights reserved.
        </div>
        <div className="flex items-center mb-3 mr-0 text-sm font-medium md:mb-0 md:mr-5">
          <Link
            to="/contact-info"
            className="italic text-white hover:text-G-dark"
          >
            About
          </Link>
          <Link
            to="/support"
            className="italic text-white hover:text-G-dark px-7"
          >
            Support
          </Link>
          <span className="relative flex items-center italic text-white cursor-pointer hover:text-G-dark">
            <motion.div
              initial={false}
              onClick={() => setExpanded(!expanded)}
              role="button"
              tabIndex={0}
            >
              Connect
            </motion.div>

            {expanded && (
              <motion.div
                ref={dropdownRef}
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="absolute flex flex-col float-right p-2 left-1 bottom-7 gap-y-1"
                style={{ backgroundColor: 'rgb(128, 191, 155)' }}
              >
                <Button
                  onClick={() => {
                    setIsOpen(true);
                    setExpanded(false);
                  }}
                >
                  <Email size={32} />
                </Button>
                <Button
                  onClick={() => {
                    window
                      .open(
                        'https://www.instagram.com/zero_point_2_/',
                        '_blank'
                      )
                      .focus();
                    setExpanded(false);
                  }}
                >
                  <Instagram size={32} />
                </Button>
              </motion.div>
            )}
          </span>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={true}
          onClickOverlay={handleIsOpen}
          size="sm"
        >
          <ConnectEmailModal setIsOpen={setIsOpen} />
        </Modal>
      </div>

      <hr
        style={{ width: '100%', height: '5px', border: 'none' }}
        size="3"
        color="white"
      />
    </div>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;

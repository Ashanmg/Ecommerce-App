import React from 'react';
import CN from 'classnames';

import { AnimatePresence, motion } from 'framer-motion';
import Overlay from '../../Overlay/Overlay';

import './Modal.scss';
import { RiCloseLine } from 'react-icons/ri';

export const Modal = ({
  children,
  className,
  isCustomStyles,
  isInline,
  isOpen,
  onClickOverlay,
  onClose,
  size,
  ...restProps
}) => {
  const ModalClasses = !isCustomStyles
    ? CN('modal', className, {
        'modal--lg': size === 'lg',
        'modal--md': size === 'md',
        'modal--sm': size === 'sm',
        'modal--xl': size === 'xl',
        'modal--xs': size === 'xs',
        'modal--xxs': size === 'xxs',
        'modal--xxxs': size === 'xxxs',
        'modal--xxxxs': size === 'xxxxs',
        'modal--is-inline': isInline,
      })
    : className;

  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariant = {
    initial: { marginTop: '-30px' },
    isOpen: { marginTop: '30px' },
    exit: { marginTop: '-200px' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          animate={!isInline && 'isOpen'}
          exit={!isInline && 'exit'}
          className={CN({ 'cursor-pointer': onClickOverlay })}
          initial={!isInline && 'initial'}
          isInline={isInline}
          onClick={onClickOverlay}
          variants={!isInline && modalVariant}
        >
          <motion.div
            className={ModalClasses}
            variants={containerVariant}
            onClick={(e) => e.stopPropagation()}
            {...restProps}
          >
            {onClose && (
              <div
                className="absolute rounded-sm cursor-pointer right-10 top-10 text-G-light hover:bg-N-100 modal-close"
                onClick={onClickOverlay}
                onKeyPress={onClickOverlay}
                role="button"
                tabIndex={0}
              >
                <RiCloseLine size={24} />
              </div>
            )}

            {children}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

Modal.defaultProps = {
  children: undefined,
  className: undefined,
  isCustomStyles: false,
  isInline: false,
  isOpen: false,
  onClickOverlay: undefined,
  onClose: undefined,
  size: undefined,
};

export default Modal;

import React from 'react';
import CN from 'classnames';

import { motion } from 'framer-motion';

import './Overlay.scss';

export const Overlay = ({ className, children, isInline, ...restProps }) => {
  const OverlayClasses = CN('overlay', className, {});

  return (
    <motion.div className={OverlayClasses} {...restProps}>
      {children}
    </motion.div>
  );
};

Overlay.defaultProps = {
  className: undefined,
};

export default Overlay;

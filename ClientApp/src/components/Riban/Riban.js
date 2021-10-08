import React from 'react';
import CN from 'classnames';

import { RiInformationLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import './Riban.scss';

export const Riban = ({ className, ...restProps }) => {
  const RibanClasses = CN(
    'riban flex w-full justify-center items-center text-xl italic h-14 text-G-dark font-semibold',
    className,
    {}
  );

  return (
    <motion.div
      className={RibanClasses}
      {...restProps}
      initial={{ x: -2000 }}
      animate={{ x: 0 }}
      transition={{duration: 0.45, delay:0.2}}
    >
      Your one-stop shop for giving -20% of every sale Donated to charity&nbsp;{' '}
      <RiInformationLine />
    </motion.div>
  );
};

Riban.defaultProps = {
  className: undefined,
};

export default Riban;

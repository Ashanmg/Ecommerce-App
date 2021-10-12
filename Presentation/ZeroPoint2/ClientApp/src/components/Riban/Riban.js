import React from 'react';
import CN from 'classnames';

import { RiInformationLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import './Riban.scss';

export const Riban = ({ className, ...restProps }) => {
  const RibanClasses = CN(
    'riban flex flex-col w-full justify-center items-center italic h-14 text-G-dark',
    className,
    {}
  );

  return (
    <motion.div
      className={RibanClasses}
      {...restProps}
      initial={{ x: -2000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <div className='mb-2 text-xs md:text-sm'>Where the world's finest artisans showcase their talents</div>
      <div className="flex flex-row items-center text-md md:text-xl font-semibold">
        Your one-stop shop for giving -20% of every sale Donated to
        charity&nbsp; <RiInformationLine />
      </div>
    </motion.div>
  );
};

Riban.defaultProps = {
  className: undefined,
};

export default Riban;

import React from 'react';
import CN from 'classnames';

import './Chip.scss';
import { RiCloseLine } from 'react-icons/ri';

export const Chip = ({ className, title, onClose, ...restProps }) => {
  const ChipClasses = CN(
    'chip w-fit px-2 py-1 bg-G-light rounded border border-G-light justify-center items-center',
    className,
    {}
  );

  return (
    <div className={ChipClasses} {...restProps}>
      <p className="font-medium text-white truncate ...">{title}</p>
      {onClose && (
        <div>
          <RiCloseLine
            className="ml-2 text-white cursor-pointer hover:text-G-dark"
            size={20}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
};

Chip.defaultProps = {
  className: undefined,
};

export default Chip;

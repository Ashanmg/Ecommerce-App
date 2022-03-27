import React from 'react';
import CN from 'classnames';

import './ColorChip.scss';
import { RiCheckFill } from 'react-icons/ri';

export const ColorChip = ({
  className,
  colors,
  isSelected,
  onChange,
  onClick,
  tooltipPlacement,
  tooltipTitle,
  ...restProps
}) => {
  const ColorChipClasses = CN('color-chip', className, {});

  const setMultipleBackgroundList = (colorList) => {
    let colorListPrcentage = '';
    colorList.forEach((color, idx) => {
      colorListPrcentage = `${colorListPrcentage} ${color} ${
        (100 / colors.length) * idx
      }%,  ${color} ${(100 / colors.length) * (idx + 1)}% ${
        idx === colors.length - 1 ? '' : ','
      }`;
    });

    return `linear-gradient(to right, ${colorListPrcentage} )`;
  };

  return (
    <div className={ColorChipClasses} {...restProps}>
      <div
        className={CN(ColorChipClasses)}
        onClick={onClick}
        onChange={onChange}
        aria-hidden="true"
        style={{ background: setMultipleBackgroundList(colors) }}
        {...restProps}
      >
        {isSelected && <RiCheckFill color='white' />}
      </div>
    </div>
  );
};

ColorChip.defaultProps = {
  className: undefined,
  isSelected: false,
  onChange: undefined,
  onClick: undefined,
  tooltipPlacement: 'top',
  tooltipTitle: undefined,
};

export default ColorChip;

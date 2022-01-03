import React, { useEffect, useState } from 'react';
import CN from 'classnames';

import ColorChip from '../ColorChip/ColorChip';

import './ColorChipsPicker.scss';

export const ColorChipsPicker = ({
  className,
  colorChips,
  defaultActive,
  onChange,
  ...restProps
}) => {
  const ColorChipsPickerClasses = CN('color-chips-picker', className, {});

  const [activeBtn, setActiveBtn] = useState(defaultActive);

  /* If Parent defaultActive changed, update Local */
  useEffect(() => {
    setActiveBtn(defaultActive);
  }, [defaultActive]);

  /* On Active Button Change, Transmit ID to onChange */
  useEffect(() => {
    if (onChange) onChange(activeBtn);
  }, [activeBtn]);

  return (
    <div className={ColorChipsPickerClasses} {...restProps}>
      <div className={ColorChipsPickerClasses} {...restProps}>
        {colorChips?.map(({ id, hex, tooltip, onClick }) => (
          <ColorChip
            key={id || uniqueId()}
            className="color-chips-picker__color-chip"
            colors={hex}
            isSelected={activeBtn === id}
            onClick={(e) => {
              setActiveBtn(id);
              if (onClick) onClick(e);
            }}
            onChange={onChange}
            tooltipTitle={tooltip}
          />
        ))}
      </div>
    </div>
  );
};

ColorChipsPicker.defaultProps = {
  className: undefined,
  colorChips: undefined,
  defaultActive: undefined,
  onChange: undefined,
};

export default ColorChipsPicker;

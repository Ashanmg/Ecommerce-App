import React, { useEffect, useState } from 'react';
import CN from 'classnames';

import './SizePicker.scss';
import Button from '../Button/Button';

export const SizePicker = ({
  className,
  sizeList,
  defaultActive,
  onChange,
  ...restProps
}) => {
  const SizePickerClasses = CN('size-picker', className, {});

  const [activeBtn, setActiveBtn] = useState(null);

  /* If Parent defaultActive changed, update Local */
  useEffect(() => {
    setActiveBtn(defaultActive);
  }, [defaultActive]);

  /* On Active Button Change, Transmit ID to onChange */
  useEffect(() => {
    if (onChange) onChange(activeBtn);
  }, [activeBtn]);

  return (
    <div className={SizePickerClasses} {...restProps}>
      {sizeList?.map(({ id, size, tooltip, btnProps }) => (
        <div
          tabIndex={-1}
          role={'button'}
          className={CN(
            'size-picker__button border-G-dark border-solid] px-2 rounded-sm',
            { active: id === activeBtn }
          )}
          size="default"
          onClick={(e) => {
            setActiveBtn(id);
            if (btnProps && btnProps.onClick) btnProps.onClick(e);
          }}
          onKeyPress={(e) => {
            setActiveBtn(id);
            if (btnProps && btnProps.onClick) btnProps.onClick(e);
          }}
          {...btnProps}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

SizePicker.defaultProps = {
  className: undefined,
};

export default SizePicker;

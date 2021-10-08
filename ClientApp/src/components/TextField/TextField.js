import React from 'react';
import CN from 'classnames';

import './TextField.scss';

export const TextField = ({
  className,
  placeholder,
  isCustom,
  ...restProps
}) => {
  const TextFieldClasses = CN('text-field', className, {});

  return (
    <div className={TextFieldClasses} {...restProps}>
      <input
        type="text"
        disabled={false}
        readOnly={false}
        placeholder={placeholder}
        className="placeholder-G-dark pl-2 border-G-dark border-solid border-2 h-9 focus:border-G-dark"
      />
    </div>
  );
};

TextField.defaultProps = {
  className: undefined,
};

export default TextField;

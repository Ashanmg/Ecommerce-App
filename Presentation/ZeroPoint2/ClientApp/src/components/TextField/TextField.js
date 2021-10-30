import React from 'react';
import CN from 'classnames';

import './TextField.scss';

export const TextField = ({
  className,
  placeholder,
  type,
  isCustom,
  textRules,
  ...restProps
}) => {
  const TextFieldClasses = CN('text-field w-full flex flex-col', className, {});

  return (
    <div className={TextFieldClasses} {...restProps}>
      <input
        type={type}
        disabled={false}
        readOnly={false}
        placeholder={placeholder}
        className="placeholder-G-dark pl-2 border-G-dark border-solid border-2 w-full h-7 md:h-8 lg:h-10 focus:border-G-dark"
      />
      {textRules && (
        <div className="text-right text-xs text-G-light italic">
          {textRules}
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  className: undefined,
  type: 'text',
};

export default TextField;

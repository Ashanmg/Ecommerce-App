import React from 'react';
import CN from 'classnames';

import './TextArea.scss';

export const TextArea = ({
  className,
  placeholder,
  type,
  isCustom,
  textRules,
  maxLength,
  rows,
  ...restProps
}) => {
  const TextAreaClasses = CN('text-area w-full flex flex-col', className, {});

  return (
    <div className={TextAreaClasses} {...restProps}>
      <textarea
        type={type}
        disabled={false}
        readOnly={false}
        placeholder={placeholder}
        maxlength={maxLength}
        rows={rows}
        className="placeholder-G-dark pl-2 border-G-dark border-solid border-2 w-full focus:border-G-dark"
      />
      {textRules && (
        <div className="text-right text-xs text-G-light italic">{textRules}</div>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  className: undefined,
};

export default TextArea;

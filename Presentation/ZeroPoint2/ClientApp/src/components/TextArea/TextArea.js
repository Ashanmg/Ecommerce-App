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
        maxLength={maxLength}
        rows={rows}
        className="w-full pl-2 border-2 border-solid placeholder-G-dark border-G-dark focus:border-G-dark"
      />
      {textRules && (
        <div className="text-xs italic text-right text-G-light">{textRules}</div>
      )}
    </div>
  );
};

TextArea.defaultProps = {
  className: undefined,
};

export default TextArea;

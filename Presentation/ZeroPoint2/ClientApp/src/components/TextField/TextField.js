import React from 'react';
import CN from 'classnames';

import './TextField.scss';

export const TextField = ({
  appearance,
  className,
  colorRules,
  disabled,
  placeholder,
  type,
  min,
  isCustom,
  textRules,
  iconAfter,
  iconBefore,
  isCustomStyles,
  name,
  onClickIconAfter,
  onClickIconBefore,
  onChange,
  autoComplete,
  readOnly,
  size,
  value,
  wrapperClassName,
  ...restProps
}) => {
  const TextFieldClasses = !isCustomStyles
    ? CN(
        'text-field border-2 border-solid placeholder-G-dark border-G-dark h-7 md:h-8 lg:h-10 focus:border-G-dark',
        className,
        {}
      )
    : className;

  const TextFieldWrapperClasses = !isCustomStyles
    ? CN('text-field__wrapper', wrapperClassName, {
        'text-field--is-danger': appearance === 'danger',
        'text-field--is-default': appearance === 'default' || !appearance,
        'text-field--is-success': appearance === 'success',
        'text-field--is-warning': appearance === 'warning',
        'text-field--has-icon-after': iconAfter,
        'text-field--has-icon-before': iconBefore,
        'text-field--is-disabled': disabled,
        'text-field--is-readonly': readOnly,
        'text-field--is-large': size === 'large',
        'text-field--is-compact': size === 'compact',
      })
    : wrapperClassName;

  return (
    <div className={TextFieldClasses} {...restProps}>
      {iconBefore && (
        <div
          className={CN('text-field__icon icon-before', {
            'text-field__icon--is-clickable': iconBefore,
          })}
          onClick={onClickIconBefore}
          onKeyDown={onClickIconBefore}
          role="button"
          tabIndex={0}
        >
          {iconBefore}
        </div>
      )}
      <input
        type={type}
        disabled={false}
        readOnly={false}
        name={name}
        min={min}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={CN('w-full h-full pl-2 focus:outline-none placeholder-G-500 text-G-dark')}
        autoComplete={autoComplete}
      />
      {iconAfter && (
        <div
          className={CN('text-field__icon icon-after text-G-dark', {
            'text-field__icon--is-clickable': onClickIconAfter,
          })}
          onClick={onClickIconAfter}
          onKeyDown={onClickIconAfter}
          role="button"
          tabIndex={0}
        >
          {iconAfter}
        </div>
      )}
    </div>
  );
};

TextField.defaultProps = {
  className: undefined,
  type: 'text',
  autoComplete: 'off',
};

export default TextField;

import React from 'react';
import CN from 'classnames';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';

import './Button.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Button = ({
  className,
  children,
  type,
  isLoading,
  afterIcon,
  beforeIcon,
  ...restProps
}) => {
  const ButtonClasses = CN('button', className, {});

  return (
    <button type={type} className={ButtonClasses} {...restProps}>
      {beforeIcon && beforeIcon}
      {children}
      {isLoading && (
        <BeatLoader
          css={override}
          // size={15}
          color={'#005C27'}
          on
          loading={true}
          speedMultiplier={1}
        />
      )}

      {afterIcon && afterIcon}
    </button>
  );
};

Button.defaultProps = {
  className: undefined,
  type: 'button',
};

export default Button;

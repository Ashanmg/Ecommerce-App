import React from 'react';
import CN from 'classnames';

import './[FTName].scss';

export const <FTName> = ({
  className,
  ...restProps
}) => {
  const <FTName>Classes = CN('<FTName | kebabcase>', className, {})

  return (
    <div className={<FTName>Classes} {...restProps}>
      <FTName> is working...
    </div>
  );
};

<FTName>.defaultProps = {
  className: undefined,
}

export default <FTName>;

import React from 'react';
import CN from 'classnames';

import './NoResults.scss';

export const NoResults = ({ className, ...restProps }) => {
  const NoResultsClasses = CN('no-results', className, {});

  return (
    <div className={NoResultsClasses} {...restProps}>
      NoResults is working...
    </div>
  );
};

NoResults.defaultProps = {
  className: undefined,
};

export default NoResults;

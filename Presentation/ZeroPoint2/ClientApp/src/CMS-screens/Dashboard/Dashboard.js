import React from 'react';
import CN from 'classnames';

import './Dashboard.scss';

export const Dashboard = ({ className, ...restProps }) => {
  const DashboardClasses = CN('dashboard', className, {});

  return (
    <div className={DashboardClasses} {...restProps}>
      <div className="dashboard_title text-G-dark font-bold text-3xl">Dashboard</div>
    </div>
  );
};

Dashboard.defaultProps = {
  className: undefined,
};

export default Dashboard;

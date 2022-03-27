import { Navigate, Route } from 'react-router-dom';

export const AuthRoute = ({ isAuthenticated, ...props }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
};

export const PrivateRoute = ({ isAuthenticated, ...props }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
};

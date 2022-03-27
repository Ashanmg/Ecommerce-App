import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, accessRoles, ...rest }) => {
  let location = useLocation();

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userData = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (accessRoles && accessRoles.includes(userData.user.userRoleId)) {
    return children;
   }else {
      return <Navigate to="/" state={{ from: location }} />;
  };
  

  // return children;
};

export default PrivateRoute;

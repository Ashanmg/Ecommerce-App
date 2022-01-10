import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './App.css';
import routes from './routes/routes';
import PrivateRoute from './routes/config/PrivateRoute';

function App() {
  const routeRender = (
    <Routes>
      {routes.map(
        (
          {
            redirectTo,
            path,
            accessRoles,
            private: Private,
            layout: Layout,
            component: Component,
          },
          key
        ) => {
          /* If redirectTo is defined, render a Redirect component */
          if (redirectTo) {
            return (
              <Route
                key={key}
                path={path}
                element={<Navigate to={redirectTo} />}
              />
            );
          }

          /* If Layout is defined, render a Layout component */
          if (Layout) {
            return (
              <>
                {Private ? (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <PrivateRoute accessRoles={accessRoles}>
                        <Layout>
                          <Component />
                          <ToastContainer autoClose={5000} />
                        </Layout>
                      </PrivateRoute>
                    }
                  />
                ) : (
                  <Route
                    key={key}
                    path={path}
                    element={
                      <Layout>
                        <Component />
                        <ToastContainer autoClose={5000} />
                      </Layout>
                    }
                  />
                )}
              </>
            );
          }

          /* If Layout is not defined, render a Route component */
          return <Route path={path} key={key} element={<Component />} />;
        }
      )}
    </Routes>
  );

  return <Router>{routeRender}</Router>;
}

export default App;

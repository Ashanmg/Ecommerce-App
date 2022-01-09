import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './App.css';
import routes from './routes/routes';

function App() {
  // return (
  //   <Router>
  //     <div className="h-screen font-sans App">
  //       <LoadingBar
  //         color="#01A453"
  //         progress={progressed}
  //         onLoaderFinished={() => setProgressed(0)}
  //       />
  //       <header>
  //         {!isAuthenticated ? (
  //           <NavBar
  //             handleToggle={handleToggle}
  //             handleFundModal={handleFundModal}
  //             handleSignIn={handleSignIn}
  //             handleToggleSignIn={handleToggleSignIn}
  //             setProgressed={setProgressed}
  //             progressed={progressed}
  //             isScrolling={isScrolling}
  //           />
  //         ) : (
  //           <>
  //             <LoginNavBar
  //               handleToggle={handleToggle}
  //               handleSignIn={handleSignIn}
  //               isScrolling={isScrolling}
  //             />
  //           </>
  //         )}
  //       </header>
  //       <main className="container max-w-screen-xl">
  //         {/* <Riban /> */}
  //         <Routes>
  //           <Route
  //             path="/product/:id"
  //             element={isAuthenticated ? <ProductScreen /> : <HomeScreen />}
  //           />
  //           <Route
  //             path="/product-upload"
  //             element={<ProductUploadScreen />}
  //           ></Route>
  //           <Route path="/contact-info" element={<ContactInfo />}></Route>
  //           <Route
  //             path="/"
  //             element={<HomeScreen isAuthenticated={isAuthenticated} />}
  //           ></Route>
  //         </Routes>
  //       </main>
  //       <footer className="flex mt-4 mb-4">
  //         <Footer isScrolling={isScrolling} />
  //       </footer>
  //     </div>
  //     <Modal
  //       isOpen={showSignInModal}
  //       onClickOverlay={handleToggleSignIn}
  //       size="sm"
  //     >
  //       <SignInFrom
  //         OnClickModalClose={handleToggleSignIn}
  //         showSignUpModal={handleToggle}
  //       />
  //     </Modal>
  //     <Modal isOpen={showSignUpModal} onClickOverlay={handleToggle} size="sm">
  //       <SignUpScreen OnClickModalClose={handleToggle} />
  //     </Modal>
  //     <Modal isOpen={showFundModal} onClickOverlay={handleFundModal} size="sm">
  //       <FundRaiseScreen />
  //     </Modal>
  //     {/* <Switch>
  //       <Route path="/signup">
  //         <SignUpScreen />
  //       </Route>
  //     </Switch> */}
  //     <ToastContainer autoClose={5000} />
  //   </Router>
  // );
  const routeRender = (
    <Routes>
      {routes.map(
        ({ redirectTo, path, layout: Layout, component: Component }, key) => {
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

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Contexts/authContext';
import { GetUsersContextProvider } from './Contexts/getUsersContext';
import { BlogContextProvider } from './Contexts/blogContext';
import { Provider } from 'react-redux';
import {store, persistor} from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingSpinner from './Components/LoadingSpinner';
import Home from './Pages/Home';
import About from './Pages/About';
import AllSignUpUsers from './Pages/AllSignUpUsers';


const root = ReactDOM.createRoot(document.getElementById('root'));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "home",
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "allSignUpUsers",
//         element: <AllSignUpUsers />,
//       },
//     ],
//   }
// ])
root.render(
  <Suspense fallback={<LoadingSpinner/>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <GetUsersContextProvider>
            <BlogContextProvider>
              <BrowserRouter>
                {/* <RouterProvider router={router} fallback={<LoadingSpinner/>}> */}
                    <App />
                {/* </RouterProvider> */}
              </BrowserRouter>
            </BlogContextProvider>
          </GetUsersContextProvider>
        </AuthContextProvider>
        </PersistGate>
      </Provider>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

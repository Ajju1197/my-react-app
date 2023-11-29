import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import './App.css';
import './Contexts/useAxios';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import React, { Suspense, lazy, startTransition, useEffect, useState } from 'react';
import { useAuthContext } from './Hooks/useAuthContext';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import logo from './logo.svg';
import LoadingSpinner from './Components/LoadingSpinner';
import { useSelector } from 'react-redux';
import { useLogout } from './Hooks/useLogout';


const Home =  React.lazy(() => import('./Pages/Home'));
const About =  React.lazy(() => import('./Pages/About'));
const SideNav =  React.lazy(() => import('./Components/SideNav'));
const Product =  React.lazy(() => import('./Pages/Products/Product'));
const Navbar =  React.lazy(() => import('./Components/Navbar/Navbar'));
const AllProducts =  React.lazy(() => import('./Pages/Products/AllProducts'));
const FeaturedProducts =  React.lazy(() => import('./Pages/Products/FeaturedProducts'));
const NewProducts =  React.lazy(() => import('./Pages/Products/NewProducts'));
const ProductDetails =  React.lazy(() => import('./Pages/Products/ProductDetails'));
const SignUp =  React.lazy(() => import('./Components/Logins/Signup'));
const Login =  React.lazy(() => import('./Components/Logins/Login'));
const ScrollToTop =  React.lazy(() => import('./Components/ScrollToTop'));
const UserProfile =  React.lazy(() => import('./Pages/UserProfile'));
const PageNotFound =  React.lazy(() => import('./Components/PageNotFound'));
const AllSignUpUsers =  React.lazy(() => import('./Pages/AllSignUpUsers'));
const SignUpUserDetail =  React.lazy(() => import('./Pages/SignUpUserDetail'));
const Settings =  React.lazy(() => import('./Pages/Settings'));
const Blogs =  React.lazy(() => import('./Pages/BlogPosts/Blogs'));
const BlogDetails =  React.lazy(() => import('./Pages/BlogPosts/BlogDetails'));
const PostBlogs =  React.lazy(() => import('./Pages/BlogPosts/PostBlogs'));
const CartProducts =  React.lazy(() => import('./Pages/Products/CartProducts'));

const App = () => {

  const [showSideNav, setShowSideNav] = useState(false);
  // const {user} = useAuthContext();
  const currUser = useSelector(state => state.login);
  const {logout} = useLogout();

  const { user } = currUser.user;
  
  // this Code is to Show Hide the sideNavBar.
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav)
  }

   // Function to check token expiration
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

    if (token && tokenExpiresAt) {
      const currentTime = Date.now() / 1000; // Current time in seconds
      const expirationTime = new Date(tokenExpiresAt).getTime() / 1000; // Expiration time in seconds

      if (expirationTime < currentTime) {
        // Token expired, perform logout
        logout();
      }
    }
  };
  
  useEffect(() => {
    // const LoginUser = JSON.parse(localStorage.getItem('user'));
    if(!user) return setShowSideNav(false); 

    window.document.title = `MERN | ${user.name}`;

    checkTokenExpiration();
    // You can set up a timer or use other methods to periodically check token expiration
    // For instance, setInterval
    const tokenCheckInterval = setInterval(() => {
      checkTokenExpiration();
      console.log('Token is Expired..');
    }, 60000); // Check every minute, adjust as needed

    return () => {
      clearInterval(tokenCheckInterval); // Clean up interval on component unmount
    };
    
  },[user])

  const toasterStyle = {
    zIndex:99999,
  }
  return (
    <div className={showSideNav ? 'App' : 'withOutSideNavAppClass'}>
      <ScrollToTop/>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"/>
      <div className='appSideNavBodyContentClass'>
          <div className='Header'>
            <Navbar toggleSideNav={toggleSideNav} showSideNav={showSideNav} />
          </div>
          <div className={showSideNav ? 'sideNavWidthClass' : 'sideNavHideClass'}>
            <SideNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} />
          </div>
          <div className={showSideNav ? 'right-block' : 'rightBlockWithoutSideNav'}>
                <div className='content'>
                    <Routes>
                          <Route path="/home" element={<Home/>} />;
                          <Route path="/allSignUpUsers" element={user ? <AllSignUpUsers/> : <Navigate to="/"/>} />;
                          <Route path="/blogs" element={user ? <Blogs/> : <Navigate to="/"/>} />;
                          <Route path="/postBlog" element={user ? <PostBlogs/> : <Navigate to="/"/>} />;
                          <Route path="/blogDetails/:id" element={user ? <BlogDetails/> : <Navigate to="/"/>} />;
                          <Route path="/userDetails/:id" element={user ? <SignUpUserDetail/> : <Navigate to="/"/>} />;
                          <Route path="/userProfile" exact element={user ? <UserProfile/> : <Navigate to="/"/>} />;
                          <Route path="/setting" exact element={user ? <Settings/> : <Navigate to="/"/>} />;
                          <Route path="/" exact element={ user ? <Home/> :  <Login/>}/>;
                          {/* <Route path="orderSummary" element={<OrderSummary />} /> */}
                          <Route path="/about" element={user ? <About /> : <Navigate to="/" />} />;
                          <Route path="/register" element={!user ? <SignUp /> : <Navigate to="/" />} />;
                          <Route path="product" element={ user ? <Product /> : <Navigate to="/" />}>
                            <Route index element={<AllProducts />} />
                            <Route path="featuredProducts" element={<FeaturedProducts />} />
                            <Route path="newProducts" element={<NewProducts />} />
                          </Route>
                          <Route path="product/productDetails/:id" element={user ? <ProductDetails /> : < Navigate to="/" />} />
                          <Route path="product/cartProducts" element={user ? <CartProducts/> : <Navigate to="/"/>}/>
                          <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </div>
          </div>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SideNav from './Components/SideNav';
import Product from './Pages/Products/Product';
import Navbar from './Components/Navbar/Navbar';
import OrderSummary from './Components/OrderSummary';
import AllProducts from './Pages/Products/AllProducts';
import FeaturedProducts from './Pages/Products/FeaturedProducts';
import NewProducts from './Pages/Products/NewProducts';
import ProductDetails from './Pages/Products/ProductDetails';
import SignUp from './Components/Logins/Signup';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './Components/Logins/Login';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from './Components/ScrollToTop';

const App = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  
  // this Code is to Show Hide the sideNavBar.
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav)
  }

  // Login functionality
  const handleLogin = async (email, password) => {
    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error('Please fill the form details.');
      return;
    }

    setLoggedIn(true);
    navigate('/home')
    toast.success('Login Successful!');
  }

  // Logout functionality
  const handleLogout = async () => {
    try {
      const res = await fetch('/logout', {
        method: 'POST', // or 'PUT'
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      console.log(`From App.js ${res}`);
      const data = await res.json();
      console.log(`From App.js ${data}`);
      setLoggedIn(false);
      toast.success('Logged Out Successful!');
      navigate('/')
    } catch (error) {
      console.error(error + ' ' + 'From App.js');
      toast.error(error);
    }
  };


  return (
    <div className={showSideNav ? 'App' : 'withOutSideNavAppClass'}>
      <ScrollToTop/>
      <Toaster position='top-right'
        toastOptions={{
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className='appSideNavBodyContentClass'>
        <div className={showSideNav ? 'sideNavWidthClass' : 'sideNavHideClass'}>
          <SideNav showSideNav={showSideNav} toggleSideNav={toggleSideNav} />
        </div>
        <div className={showSideNav ? 'right-block' : 'rightBlockSpanTwoClass'}>
          <div className='Header'>
            <Navbar toggleSideNav={toggleSideNav} handleLogout={handleLogout} showSideNav={showSideNav} isLoggedIn={isLoggedIn} />
          </div>
          <div className='mainBody'>
            <div className='content'>
              <Routes>
                <Route path="/home" exact element={<Home />} />;
                <Route path="/" element={<Login onLogin={handleLogin} />} />;
                {/* <Route path="orderSummary" element={<OrderSummary />} /> */}
                <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/" />} />;
                <Route path="/register" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />;
                <Route path="product" element={<Product />}>
                  <Route index element={<AllProducts />} />
                  {/* <Route path="allProducts" element={<AllProducts />} /> */}
                  <Route path="featuredProducts" element={<FeaturedProducts />} />
                  <Route path="newProducts" element={<NewProducts />} />
                </Route>
                <Route path="product/productDetails/:id" element={<ProductDetails />} />
              </Routes>
            </div>
            <div className='footer bg-dark p-5'>
              <label className='text-white'>Copy right</label>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <div className={showSideNav ? 'SideNavOpenIconHide' : 'SideNavOpenClass'} onClick={toggleSideNav}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>) :
        null
      }
    </div>
  );
}

export default App;

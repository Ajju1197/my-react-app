import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../PagesStyles.css';
import { useSelector } from 'react-redux';
import './product.css';

const Product = (props) => {
    const productTabs = [
        {
            id: 1,
            name: 'All Products',
            routeName: '',
        },
        {
            id: 2,
            name: 'Featured Products',
            routeName: 'featuredProducts',
        },
        {
            id: 3,
            name: 'New Products',
            routeName: 'newProducts',
        }
    ];

    const cartData = useSelector(state => state.productCart);

    const [activeTab, setActiveTab] = useState(0);

    const handlingTheActiveTabClick = (index) => {
        setActiveTab(index);
    }
    const inputRef = React.createRef();

    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <div className="product">
            <div className='d-flex justify-between mb-2 align-items-center position-sticky top-0 z-10 bg-black shadow-sm'>
                <div className='searchClass'>
                    <input className='form-control' type='text' placeholder='Search Product' ref={inputRef}/>
                    <button className='btn btn-primary'>Go</button>
                </div>
                <div className="cartBag position-relative">
                    <Link to="/checkout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="#fff"><path stroke="currentColor" stroke-width="1.5" d="M3.794 12.03C4.331 9.342 4.6 8 5.487 7.134a4 4 0 0 1 .53-.434C7.04 6 8.41 6 11.15 6h1.703c2.739 0 4.108 0 5.13.7c.19.13.367.276.53.435c.888.865 1.157 2.208 1.694 4.894c.771 3.856 1.157 5.784.269 7.15c-.16.248-.348.477-.56.683C18.75 21 16.785 21 12.853 21H11.15c-3.933 0-5.899 0-7.065-1.138a3.998 3.998 0 0 1-.559-.683c-.888-1.366-.502-3.294.27-7.15Z"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="9" r="1" fill="currentColor"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9 6V5a3 3 0 1 1 6 0v1"/></g></svg>
                    </Link>
                    <div className="bagCountClass">
                        <span className='text-white'>{cartData.length}</span>
                    </div>
                </div>
            </div>
            <ul className='nav nav-tabs'>
                    {
                        productTabs.map((eachLink, index) => (
                            <li className='nav-item' key={eachLink.id}>
                                <Link className={`nav-link ${index === activeTab ? 'active' : ''}`} onClick={() => handlingTheActiveTabClick(index)} to={eachLink.routeName}>{eachLink.name}</Link>
                            </li>
                        ))
                    }
            </ul>
            <Outlet/>
        </div>
    );
}

export default Product;
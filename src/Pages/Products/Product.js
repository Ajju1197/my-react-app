import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../PagesStyles.css';

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
            <div className='searchClass'>
                <input className='form-control' type='text' placeholder='Search Product' ref={inputRef}/>
                <button className='btn btn-primary'>Go</button>
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
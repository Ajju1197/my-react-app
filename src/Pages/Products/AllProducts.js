import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrMsg] = useState('');

    useEffect( () => {
        axios.get('https://fakestoreapi.com/products')
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            setErrMsg(err);
        })
    }, [])
    return (
        <div className='productList'>
            {
                products && products.length > 0 ? (
                    products.map((eachItem) => (
                        <div className='productCart' key={eachItem.id}>
                            <Link className='card productsClass' to={`productDetails/${eachItem.id}`}>
                                <div className='productImage'>
                                    <img src={eachItem.image} alt={eachItem.title} />
                                </div>
                                <div className='title'>
                                    <h1>{eachItem.title}</h1>
                                    <p>{eachItem.description}</p>
                                </div>
                            </Link>
                            <div className='social-icons'>
                                <FontAwesomeIcon icon={faFacebook} className='iconsStylingClass' />
                                <FontAwesomeIcon icon={faInstagram} className='iconsStylingClass' />
                                <FontAwesomeIcon icon={faShare} className='iconsStylingClass' />
                                <FontAwesomeIcon icon={faEnvelope} className='iconsStylingClass' />
                                <FontAwesomeIcon icon={faTwitter} className='iconsStylingClass' />
                            </div>
                        </div>
                    ))
                ) : 
                (
                    <p>{errorMessage}</p>
                )
            }
        </div>
    )
}

export default AllProducts

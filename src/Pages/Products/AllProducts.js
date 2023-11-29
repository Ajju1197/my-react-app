import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useProductCart } from '../../Hooks/useProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/slices/productCartSlice';

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrMsg] = useState('');

    const {productAddToCart} = useProductCart();
    const dispatch = useDispatch();

    useEffect( () => {
        axios.get('https://fakestoreapi.com/products')
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            setErrMsg(err);
        })
    }, []);

    const handleAddToCart = (eachItem) => {
        dispatch(addToCart(eachItem));
    }
    return (
        <div className='productList mernCardMainBlockClass'>
            {
                products && products.length > 0 ? (
                    products.map((eachItem) => (
                        <div className='productCart' key={eachItem.id}>
                            <div className='card productsClass'>
                                <div className='productImage'>
                                    <img src={eachItem.image} alt={eachItem.title} />
                                </div>
                                <div className='title'>
                                    <h1>{eachItem.title}</h1>
                                    <p>{eachItem.description}</p>
                                </div>
                                <div className='d-flex gap-2 align-items-center p-3 justify-center'>
                                    <Link type='button' className='btn btn-primary bg-dark text-white' onClick={() => handleAddToCart(eachItem)}>Add To Cart</Link>
                                    <Link type='button' className='btn btn-primary bg-dark text-white' to={`productDetails/${eachItem.id}`}>View Details</Link>
                                </div>
                            </div>
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

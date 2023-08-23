import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetails() {
    const navigate = useNavigate();
    const params = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoad] = useState(false);

    useEffect(() => {
        setLoad(loading);
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => {
                console.log(res.data);
                setProduct(res.data);
                setLoad(!loading);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className='col-sm-4 m-auto'>
            {
                loading ?
                    <div className="card">
                        <div className='productImage'>
                            <img src={product?.image || ''} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <button className='btn btn-dark' onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </div> :
                    <div>Loading...</div>
            }

        </div>
    )
}

export default ProductDetails

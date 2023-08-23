import React from 'react'
import { useNavigate } from 'react-router-dom'


function OrderSummary() {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center">Order Placed Successfully!</h1><br/>
            <button onClick={() => navigate(-1)} className='btn btn-dark'>Go Back</button>
        </div>
    )
}

export default OrderSummary

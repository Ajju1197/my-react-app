import React, { useState } from 'react'
import { useGetUserData } from '../Hooks/useGetUsersData';

function Form({handleOnChange}) {

    return (
        <input type="text" className='form-control' onChange={handleOnChange} />
    )
}

export default Form

import React, { useState } from 'react'
import { useGetUserData } from '../Hooks/useGetUsersData';

function Form({handleOnChange}) {

    return (
        <>
            <input type="text" placeholder=' ' className='form-control' onChange={handleOnChange} />
            <label>Search User</label>
        </>
    )
}

export default Form

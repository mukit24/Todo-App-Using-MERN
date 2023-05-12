import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = () => {
    return (
        <Spinner
            animation='border'
            variant='success'
            className='d-block m-auto'
        >
        </Spinner>
    )
}

export default Loader
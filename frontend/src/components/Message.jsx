import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Message = ({message}) => {
    return (
        <Alert variant="danger">
            {message}
        </Alert>
    )
}

export default Message
import React from 'react'
import { Toast } from 'react-bootstrap'

const ToastMessage = ({ title, Message }) =>
{
    return (
        <Toast>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{Message}</Toast.Body>
        </Toast>
    )
}

export default ToastMessage
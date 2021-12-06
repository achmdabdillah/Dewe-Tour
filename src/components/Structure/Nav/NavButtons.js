import React, { useState } from 'react';
import LoginModals from '../../Modal/LoginModals';
import RegisModals from '../../Modal/RegisModals';

const NavButtons = () => {

    // Login Modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Register Modals
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    return (
        <>
         <div className="buttons">
            {/* LOGIN */}
            <button className="login" variant="primary" onClick={handleShow}>
            Login
            </button>
            <LoginModals handleClose={handleClose} show={show} show1={show1} handleShowRegis={handleShow1} />
            {/* REGISTER */}
            <button className="register" variant="primary" onClick={handleShow1}>
            Register
            </button>
            <RegisModals handleClose={handleClose1} show={show1} />
         </div>   
        </>
    )
}

export default NavButtons

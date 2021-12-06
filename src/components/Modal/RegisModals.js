import { Modal } from 'react-bootstrap'
import { useState } from 'react';
import Swal from 'sweetalert2';

// get API
import { API } from "../../config/api";

const RegisModals = ({ handleClose, show }) => {


  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const { fullName, email, password, phone, address } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      // Notification
      if (response.data.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Register Success',
        })
      }
    } catch (error) {
      setForm({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
      })
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Register failed',
      })
      console.log(error);
    }
  };
    return (
      <>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header >
            <img src="/assets/palm1.png" alt="" className="palm"/>
            <Modal.Title>Register</Modal.Title>
            <img src="/assets/flower.png" alt="" className="flower"/>
          </Modal.Header>
          <Modal.Body>
              <div className="modal-input">
                <label htmlFor="fullName">Full Name</label>
                <input
                type="text"
                placeholder="Name"
                value={fullName}
                name="fullName"
                onChange={handleOnChange}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleOnChange}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleOnChange}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="phone">Phone</label>
                <input 
                type="number"
                placeholder="Phone number"
                id="phone" 
                name="phone" 
                value={phone}
                onChange={handleOnChange}
                />
              </div>
              <div className="modal-input">
                <label htmlFor="address">Address</label>
                <input 
                type="text"
                placeholder="Address"
                id="address" 
                name="address" 
                value={address}
                onChange={handleOnChange}
                />
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="modal-btn" onClick={(e) => {handleSubmit(e); handleClose();}}>
              Register
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
  
export default RegisModals;
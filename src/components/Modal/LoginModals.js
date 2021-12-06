import { Modal, Button } from 'react-bootstrap'
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

// get API
import { API } from "../../config/api";

const LoginModals = ({ handleClose, show, handleShowRegis }) => {
  let history = useHistory();

  const {dispatch } = useContext(AuthContext);

  // Store data with useState here ...
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });
        // Status check
        if (response.data.data.status === "admin") {
          history.push("/income");
        }
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Success',
        })
      }
    } catch (error) {
      setForm({
        email: "",
        password: "",
      });
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Please input correct email or password',
      })
      console.log(error);
    }
  };
  
    return (
      <>
        <Modal show={show} onHide={handleClose} centered >
          <Modal.Header>
            <img src="/assets/palm1.png" alt="" className="palm"/>
            <Modal.Title>Login</Modal.Title>
            <img src="/assets/flower.png" alt="" className="flower"/>
          </Modal.Header>
          <Modal.Body>
              <div className="modal-input">
                <label htmlFor="email">Email</label>
                <input
                placeholder="Email address"
                onChange={handleOnChange} 
                value={email} 
                type="email" 
                id="email" 
                name="email" />
              </div>
              <div className="modal-input">
                <label htmlFor="password">Password</label>
                <input 
                placeholder="Password"
                onChange={handleOnChange} 
                value={password} 
                type="password" 
                id="password" 
                name="password" />
              </div>
              <div className="modal-input">
                <p className="avenir-thin mb-0 mt-1">Don't have an account? ? Click <strong className="orange pointer" onClick={() => {handleShowRegis(); handleClose()}}>Here</strong></p>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="modal-btn" onClick={(e) => {handleSubmit(e); handleClose();}}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
  
export default LoginModals
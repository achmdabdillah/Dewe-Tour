import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import Nav from "../components/Structure/Nav/Nav";
import Footer from "../components/Structure/Footer";

import { API } from "../config/api";

const Profile = () => {
  const [payment, setPayment] = useState([])
  const history = useHistory()
  // PROFILE
  const [data, setData] = useState([])
  const [status, setStatus] = useState('Waiting Payment')

  const getData = async () => {
    try {
      const response = await API.get(`/user`);
      setData(response.data.data);
    } catch (error) {
      alert("Cannot get data");
    }
  }


  useEffect(() => {
  getData();
  }, []);

  // HANDLE PROFILE PIC
  const [form, setForm] = useState(null);
  const [preview, setPreview] = useState(null);

  // console.log(form)
  const handleOnChange = (e) => { 
    if (e.target.type === "file") {
        setForm(e.target.files);

        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url); 
    }
  };

  const handleUpload = async () => {
    try {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
        const data = new FormData();
        data.set("image", form[0], form[0].name)
        const response = await API.patch(`/users`, data, config );
        if(response.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Profile picture uploaded!',
          })  
        }
        getData();
        const timer = setTimeout(() => {
          history.go('/profile')
        }, 1000);
        return () => clearTimeout(timer);
    } catch (error) {
        console.log(error);
    }
  };

  // PAYMENT
  const getPayment = async () => {
    try {
      const response = await API.get(`/transaction`);
      setPayment(response.data.data);
    } catch (error) {
      alert("Cannot get data");
    }
  };

  useEffect(() => {
  getPayment();
  }, []);

  const formatter = function(amount){
    return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR" }).format(amount)
  }

  const dateFormatter = (inputDate) => {
    let data = new Date(inputDate).toString()
    const newDate = data.split(' ')
    return newDate.slice(0,4)
  }
  
  let bookDate = []
  let dateTrip = []

  const filterPayment = (status) => {
    setStatus(status)
  }

    return (
        <>
          <Nav />
          <div className="profile-card">
              <div className="profile-card-container pt-3 d-flex justify-content-between">
                <div className="personal-info">
                    <h1>Personal Info</h1>
                    <div className="p-info-card d-flex align-items-center my-auto">
                        <img src="/icons/profilepic.png" alt="" />
                        <div className="p-info-card-text ps-3">
                          <h5 classNameName="avenir mb-0">{data?.fullName}</h5>
                          <p>Full name</p>
                        </div>
                    </div>
                    <div className="p-info-card d-flex align-items-center my-auto">
                        <img src="/icons/email.png" alt="" />
                        <div className="p-info-card-text ps-3">
                          <h5 classNameName="avenir mb-0">{data?.email}</h5>
                          <p>Email</p>
                        </div>
                    </div>
                    <div className="p-info-card d-flex align-items-center my-auto">
                        <img src="/icons/phone.png" alt="" />
                        <div className="p-info-card-text ps-3">
                          <h5 classNameName="avenir mb-0">{data?.phone}</h5>
                          <p>Phone</p>
                        </div>
                    </div>
                    <div className="p-info-card d-flex align-items-center my-auto">
                      <img className="me-1" src="/icons/location.png" alt="" />
                        <div className="p-info-card-text ps-3">
                          <h5 classNameName="avenir mb-0">{data?.address}</h5>
                          <p>Address</p>
                        </div>
                    </div>
                </div>
                <div className="profile-image">
                    <label for="image">
                      <img className="box pointer" src={preview !== null ? preview : data?.profilePicture !== null ? data?.profilePicture : "/images/Avatar.png"} alt=""/>
                    </label>
                        <div>
                            <input type="file" id="image" className='pointer avenir-thin fs-6 pointer a filestyle' name="image" onChange={handleOnChange}></input>
                        </div>
                    <button className="change-profile-btn avenir-thin" onClick={handleUpload}>Upload</button>
                </div>
              </div>
          </div>
          <div className="profile-container">
            <h1>History Trip</h1>
          </div>
          <div className="profile-status-nav">
            <button className="orange-gradient" onClick={() => filterPayment("Waiting Payment")}>Waiting Payment</button>
            <button className="yellow-gradient" onClick={() => filterPayment("Waiting Approve")}>Waiting Approve</button>
            <button className="green-gradient" onClick={() => filterPayment("Approved")}>Approved</button>
            <button className="red-gradient" onClick={() => filterPayment("Cancelled")}>Cancelled</button>
          </div>
          {payment?.filter((item) => item?.status === status).length !== 0 ? (
          payment.filter((item) => item?.status === status).map((item) => (
            <>
              <div className="payment-ticket mb-5" >
                  <div className="payment-container">
                      <div className="payment-header d-flex justify-content-between">
                          <img src="/assets/logo-dewe-bl.png" alt=""/>
                          <div>
                              <h1>Booking</h1>
                              <p className="hide">
                                {bookDate = dateFormatter(item?.createdAt)}
                              </p>
                              <p><strong>{bookDate[0]}</strong>, {bookDate[2]} {bookDate[1]} {bookDate[3]}</p>
                          </div>
                      </div>
                      <div className="payment-body d-flex">
                          <div className="pbody-title">
                            <h1>{item?.trip?.title}</h1>
                            <p>{item?.trip?.country?.name}</p>
                            <p><span className={
                              item?.status === "Approved" ? "payment-status status-green bg-green" :
                              item?.status === "Cancelled" ? "payment-status status-red bg-red" :
                              "payment-status status-orange bg-orange" 
                            }>{item?.status}</span></p>
                          </div>
                          <div className="pbody-center container">
                              <div className="row row-cols-2">
                                  <div className="col pbody-info">
                                      <h1>Date Trip</h1>
                                      <p class="hide">
                                        {dateTrip = dateFormatter(item?.trip?.dateTrip)}
                                      </p>
                                      <p>{dateTrip[0]}, {dateTrip[2]} {dateTrip[1]} {dateTrip[3]}</p>
                                  </div>
                                  <div className="col pbody-info">
                                      <h1>Duration</h1>
                                      <p>{item?.trip?.day} Day {item?.trip?.night} Night</p>
                                  </div>
                                  <div className="col pbody-info">
                                      <h1>Accomodation</h1>
                                      <p>{item?.trip?.accomodation}</p>
                                  </div>
                                  <div className="col pbody-info">
                                      <h1>Transportation</h1>
                                      <p>{item?.trip?.transportation}</p>
                                  </div>
                              </div>
                          </div>
                          <div className="pbody-end">
                              <label for="proof" className="marginEnd">
                                  <img className="box me-0" src={item?.attachment ? item?.attachment : "/assets/struk.png" } alt="" />
                              </label>
                              <input type="file" id="proof" name="attachment" className='filestyle pointer avenir-thin fs-6 pointer a'></input>
                          </div>
                      </div>
                      <div className="payment-end">
                          <div className="payment-table">
                              <table>
                              <tr>
                                  <th>No</th>
                                  <th>Full Name</th>
                                  <th>Gender</th>
                                  <th>Phone</th>
                                  <th></th>
                                  <th></th>
                              </tr>
                              <tr className="tdata">
                                  <td>1</td>
                                  <td>{item?.user?.fullName}</td>
                                  <td>Male</td>
                                  <td>{item?.user?.phone}</td>
                                  <td className="avenir">Qty<span className="px-5">:</span></td>
                                  <td className="avenir">{item?.counterQty}</td>
                              </tr>
                              <tr className="t-end">
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td className="avenir">Total<span className="px-5">:</span></td>
                                  <td className="avenir red">{formatter(item?.total)}</td>
                              </tr>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
            </>
          ))
          ) : (
            <>
              <div className="no-payment-profile" >
                <img className="img-fluid" src="/assets/no-payment.png" alt="" />
                <h1 class="avenir fs-1">No Data To Show</h1>
              </div>
            </>
          )}
          <Footer /> 
        </>
    )
}

export default Profile

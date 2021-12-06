// import { useState } from 'react'

// const PaymentTicket = ({item, handleOnChange, preview}) => {
//     console.log(item)
//     const { trip, user } = item

//     const dateFormatter = (inputDate) => {
//         let data = new Date(inputDate).toString()
//         const newDate = data.split(' ')
//         return newDate.slice(0,4)
//     }

//     const bookDate = dateFormatter(createdAt)
//     const dateTrip = dateFormatter(trip.dateTrip)
//     const bookDate = [1,2,3,4]
//     const dateTrip = [1,2,3,4]

//     const formatter = function(amount){
//         return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR" }).format(amount)
//     }

//     const handleOnChange = (e) => {
//         setForm({
//           ...form,
//           [e.target.name]:
//             e.target.type === "file" ? e.target.files : e.target.value,
//         });
//         if (e.target.name === "attachment") {
//           let url = URL.createObjectURL(e.target.files[0]);
//           setPreview(url); 
//         }
//       };

//     return (
//         <>
//                 <div className="payment-container">
//                     <div className="payment-header d-flex justify-content-between">
//                         <img src="/assets/logo-dewe-bl.png" alt=""/>
//                         <div>
//                             <h1>Booking</h1>
//                             <p><strong>{bookDate[0]}</strong>, {bookDate[2]} {bookDate[1]} {bookDate[3]}</p>
//                         </div>
//                     </div>
//                     <div className="payment-body d-flex">
//                         <div className="pbody-title">
//                             <h1>{item?.trip?.title}</h1>
//                             <p>{item?.trip?.country?.name}</p>
//                             <p><span className="payment-status">{item?.status}</span></p>
//                         </div>
//                         <div className="pbody-center container">
//                             <div className="row row-cols-2">
//                                 <div className="col pbody-info">
//                                     <h1>Date Trip</h1>
//                                     <p>{dateTrip[0]}, {dateTrip[2]} {dateTrip[1]} {dateTrip[3]}</p>
//                                 </div>
//                                 <div className="col pbody-info">
//                                     <h1>Duration</h1>
//                                     <p>{trip.day} Day {trip.night} Night</p>
//                                 </div>
//                                 <div className="col pbody-info">
//                                     <h1>Accomodation</h1>
//                                     <p>{trip.accomodation}</p>
//                                 </div>
//                                 <div className="col pbody-info">
//                                     <h1>Transportation</h1>
//                                     <p>{trip.transportation}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="pbody-end">
//                             <label for="proof" className="pointer">
//                                 <img className="box" src={preview ? preview : item?.attachment ? item?.attachment : "/assets/struk.png" } alt="" />
//                             </label>
//                             <input type="file" id="proof" name="attachment" className="filestyle" onChange={() => handleOnChange()}></input>
//                             <p>upload payment proof</p>
//                         </div>
//                     </div>
//                     <div className="payment-end">
//                         <div className="payment-table">
//                             <table>
//                             <tr>
//                                 <th>No</th>
//                                 <th>Full Name</th>
//                                 <th>Gender</th>
//                                 <th>Phone</th>
//                                 <th></th>
//                                 <th></th>
//                             </tr>
//                             <tr className="tdata">
//                                 <td>1</td>
//                                 <td>{user.fullName}</td>
//                                 <td>Male</td>
//                                 <td>{user.phone}</td>
//                                 <td className="avenir">Qty<span className="px-5">:</span></td>
//                                 <td className="avenir">{item.counterQty}</td>
//                             </tr>
//                             <tr className="t-end">
//                                 <td></td>
//                                 <td></td>
//                                 <td></td>
//                                 <td></td>
//                                 <td className="avenir">Total<span className="px-5">:</span></td>
//                                 <td className="avenir red">{formatter(item.total)}</td>
//                             </tr>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </>
//     )
// }

// export default PaymentTicket

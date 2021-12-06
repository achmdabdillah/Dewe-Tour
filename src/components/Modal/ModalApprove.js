const ModalApprove = () => {
    return (
        <div className="payment-ticket">
            <div className="payment-container">
                <div className="payment-header d-flex justify-content-between">
                    <img src="/assets/logo-dewe-bl.png" alt=""/>
                    <div>
                        <h1>Booking</h1>
                        <p>Saturday, 22 Juy 2020</p>
                    </div>
                </div>
                <div className="payment-body d-flex">
                    <div className="pbody-title">
                        <h1>6D/4N Fun Tassie Vacation</h1>
                        <p>Australia</p>
                        <p><span className="payment-status">Waiting Approve</span></p>
                    </div>
                    <div className="pbody-center container">
                        <div className="row row-cols-2">
                            <div className="col pbody-info">
                                <h1>Date Trip</h1>
                                <p>26 August 2020</p>
                            </div>
                            <div className="col pbody-info">
                                <h1>Duration</h1>
                                <p>6 Day 4 Night</p>
                            </div>
                            <div className="col pbody-info">
                                <h1>Accomodation</h1>
                                <p>Hotel 4 Nights</p>
                            </div>
                            <div className="col pbody-info">
                                <h1>Transportation</h1>
                                <p>Qatar Airways</p>
                            </div>
                        </div>
                    </div>
                    <div className="pbody-end">
                        <img src="/assets/struk.png" alt="" />
                        <p>upload payment proof</p>
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
                            <td>Radif Ganteng</td>
                            <td>Male</td>
                            <td>083896833112</td>
                            <td className="avenir">Qty<span className="px-5">:</span></td>
                            <td className="avenir">1</td>
                        </tr>
                        <tr className="t-end">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="avenir">Total<span className="px-5">:</span></td>
                            <td className="avenir red">IDR. 12,398,000</td>
                        </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalApprove

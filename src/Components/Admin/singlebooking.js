import React from "react";
import api from "../../api";


const Singlebooking=({ground_name,contact,email,bookingtime,name,booking_id})=>{
    const cancleBooking=async()=>{
        const responce=await api.put('/cancleBooking',{booking_id:booking_id})

    }
    return(
        <div className="ui segment" >
            <div className="ui grid">
                <div className="four wide column olive column" >Name:{name}</div>
                <div className="four wide column" >Court Name:{ground_name}</div>
                <div className="four wide column" >contact:{contact}</div>
                <div className="four wide column" >email:{email}</div>
                <div className="four wide column" > email:{email}</div>
                <div className="four wide column" >bookingtime:{bookingtime}</div>
            </div>
            <button onClick={()=>cancleBooking()}>Cancle Booking</button>
        </div>
    )
}

export default Singlebooking;
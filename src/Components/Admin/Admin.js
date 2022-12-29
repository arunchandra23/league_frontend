import React, { useState, useEffect } from "react";
import api from "../../api";
import Singlecourtbox from "./singlecourt";
import Singlebooking from "./singlebooking";

const Admin=()=>{
    const [courtValues, setcourtValues] = useState([]);
    const [isCourtSelected,setIsCourtSelected]=useState(false)
    const [addingCourt,setAddingCourt]=useState(false)
    const [newCourt,setNewCourt]=useState("")
    const [refetechCourts,setrefetechCourts]=useState(false)
    const [isGetBookings,setIsGetBookings]=useState(false)
    const [bookings,setBookings]=useState([])
    const [daysToDelete,setDaysToDelete]=useState(1)
    const [isDeleting,setIsDeleting]=useState(false)
    const getBookings=async()=>{
        const responce=await api.get('/getBookings')
        setBookings(responce.data)
    }
    const getCourts = async () => {
        const responce = await api.get("/getCourts");
        setcourtValues(responce.data);
      };
    const addNewCourt=async()=>{
        const responce=await api.post("/addCourts",{court_name:newCourt,undermaintainence:false})
        setrefetechCourts(!refetechCourts)

    }
    const deletePreviousBookings=async()=>{
        console.log(daysToDelete)
        const responce=await api.post("/deletebookings",{numberofdays:daysToDelete.toString()})
    }
      useEffect(() => {
        getCourts();
      }, [refetechCourts]);
    
    return(
        <div className="ui container">
            <br></br>
        <button className="fluid ui button" onClick={()=>{setIsCourtSelected(!isCourtSelected)}}>Update Courts</button>
        <br></br>
        {isCourtSelected?<div>{courtValues?.map((m)=>{
            return(
            <Singlecourtbox 
            key={m.ground_id}
            court_id={m.ground_id}
            courtname={m.ground_name}
            underMaintenence={m.under_maintainence}
             />)
        })}</div>:null}
        <button className="fluid ui button" onClick={()=>{setAddingCourt(!addingCourt)}} >Add court</button>
        <br></br>
        {addingCourt?<div className="ui input">
            <input value={newCourt} onChange={(e)=>{setNewCourt(e.target.value)}} type="text" placeholder="Enter Court Name"></input>
            <button onClick={()=>addNewCourt()} type="submit">Submit</button>
        </div>:null}
        <button className="fluid ui button" onClick={()=>{setIsGetBookings(!isGetBookings);getBookings()}} >Get Bookings</button>
        <br></br>
        {isGetBookings?<div>
            {bookings.map((m)=>{
                return(
                    <div className="ui segments">
                <Singlebooking booking_id={m.booking_id} key={m.booking_id} name={m.name} bookingtime={m.slot_time} email={m.email} contact={m.contact} ground_name={m.ground_name} />
                </div>)
            })}
            </div>:null}
        <button className="fluid ui button" onClick={()=>{setIsDeleting(!isDeleting)}} >Delet Previous Bookings</button>
        <br></br>
        {isDeleting?<div className="ui input">
            <input min={1} value={daysToDelete} onChange={(e)=>{setDaysToDelete(e.target.value)}} type='number' placeholder="Enter Number of Days" ></input>
            <button onClick={()=>{deletePreviousBookings()}} >Delete</button>
        </div>:null}
        </div>
    )
}

export default Admin;
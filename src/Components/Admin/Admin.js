import React, { useState, useEffect } from "react";
import api from "../../api";
import Singlecourtbox from "./singlecourt";
import Singlebooking from "./singlebooking";

const Admin=()=>{
    const [courtValues, setcourtValues] = useState([]);
    const [isCourtSelected,setIsCourtSelected]=useState(true)
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
            <div className="ui secondary pointing menu">
            <br></br>
        <a className={`${isCourtSelected?'active':null} item`} onClick={()=>{setIsCourtSelected(true);setAddingCourt(false);setIsGetBookings(false);setIsDeleting(false)}}>Update Courts</a>
        <a className={`${addingCourt?'active':null} item`} onClick={()=>{setAddingCourt(true);setIsGetBookings(false);setIsDeleting(false);setIsCourtSelected(false)}}>Add Court</a>
        <a className={`${isGetBookings?'active':null} item`}  onClick={()=>{setIsGetBookings(true);setIsDeleting(false);setIsCourtSelected(false);setAddingCourt(false);getBookings()}}>Get Bookings</a>
        <a className={`${isDeleting?'active':null} item`} onClick={()=>{setIsDeleting(true);setIsCourtSelected(false);setAddingCourt(false);setIsGetBookings(false)}}>Delet Previous Bookings</a>
        </div>
        {isCourtSelected?<div>{courtValues?.map((m)=>{
            return(
            <Singlecourtbox 
            key={m.ground_id}
            court_id={m.ground_id}
            courtname={m.ground_name}
            underMaintenence={m.under_maintainence}
             />)
        })}</div>:null}
        {addingCourt?<div className="ui input">
            <input value={newCourt} onChange={(e)=>{setNewCourt(e.target.value)}} type="text" placeholder="Enter Court Name"></input>
            <button onClick={()=>addNewCourt()} type="submit">Submit</button>
        </div>:null}
        {isGetBookings?<div>
            {bookings.length!==0?bookings.map((m)=>{
                return(
                    <div className="ui segments">
                <Singlebooking handlerefetch={getBookings} booking_id={m.booking_id} key={m.booking_id} name={m.name} bookingtime={m.slot_time} email={m.email} contact={m.contact} ground_name={m.ground_name} />
                </div>)
            }):<div className="ui segments" >
                <div className="ui segment" >
                    No Bookings
                </div>
                </div>}
            </div>:null}
        {isDeleting?<div className="ui input">
            <input min={1} value={daysToDelete} onChange={(e)=>{setDaysToDelete(e.target.value)}} type='number' placeholder="Enter Number of Days" ></input>
            <button onClick={()=>{deletePreviousBookings()}} >Delete</button>
        </div>:null}
        </div>
    )
}

export default Admin;
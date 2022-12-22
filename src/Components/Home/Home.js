// Render Prop
import React, { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";
import api from "./api";

const Home = () => {
  const [courtValues,setcourtValues]=useState()
  const [court,setcourt]=useState()
  const [isCourtSelected,setIsCourtSelected]=useState(false)
  const [availablSlots,setAvailableSlots]=useState()
  const [slot,setSlot]=useState()
  const getCourts= async ()=>{
        const responce=await api.get('/getCourts')
        setcourtValues(responce.data)
           }
  const getAvailableSlots= async (cou)=>{
            
            const responce=await api.get('/getAvailableSlots',{
                      params:{
                         court_id:cou
                      }
                    })
            setAvailableSlots(responce.data)
               }
    useEffect(()=>{
      getCourts();
     
    },[])
  const handleCourtChange=(e)=>{
    console.log(e.target.value)
    setcourt(e.target.value)
    setIsCourtSelected(true)
    getAvailableSlots(e.target.value)
  }
    
    
  return (
    <>
      <div className="ui raised segment " >
        <Formik
          initialValues={{ email: "", name: "", contact: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Enter Woxsen email ID";
            } else if (!/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)) {
              errors.email = "Please enter a valid Woxsen email ID";
            }
            if (!values.contact) {
              errors.contact = "Enter phone number";
            } else if (!isValidPhoneNumber("+91" + values.contact)) {
              errors.contact = "Enter valid phone number";
            }else{

            }
            return errors;
          }}
          onSubmit={async(values, { setSubmitting ,resetForm}) => {
            console.log(court,slot,values.contact,values.email,values.name)
            const responce=await api.post(`/addBooking?name=${values.name}&email=${values.email}&contact=${values.contact}&ground_id=${court}&slot_id=${slot}`)
            setSubmitting(false);
            setcourt([])
            setSlot([])
            setIsCourtSelected(false)
            resetForm({values:''})
            if(responce.status===200){
              alert("Slot Booked ")
            }
            
          }}
        >
          {({ isSubmitting }) => (
            <Form className="ui form" >
              <label >Enter Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <br />
              <label >Name</label>
              <Field type="text" name="name" />
              <ErrorMessage  name="name" component="div" />
              <br />
              <label >Mobile Number</label>
              <Field type="text" name="contact" />
              <ErrorMessage name="contact" component="div" />
              <br />
              <label >Select areana:</label>
              <br />
              <select onChange={(e)=>{handleCourtChange(e)}}  value={court} name="court" > 
              <option value="" label="Select Court" />
                {courtValues?.map((m)=>{
                  return (<option key={m.ground_id} value={m.ground_id} label={m.ground_name} />)
                })}
              </select>
              {isCourtSelected?<div >
              <label >Select Slots</label>
              <select onChange={(e)=>{setSlot(e.target.value)}}  value={slot} name="court" > 
              <option value="" label="Select Slot" />
                {availablSlots?.map((m)=>{
                  return (<option key={m.slot_id} value={m.slot_id} label={m.slot_time} />)
                })}
              </select>
              </div>:null}
              <br />
              <button type="submit" >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Home;

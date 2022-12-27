// Render Prop
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";
import api from "../../api";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";


const Home = () => {
  const [show, setShow] = useState(true);
  const [msg,setMsg]=useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courtValues, setcourtValues] = useState();
  const [court, setcourt] = useState();
  const [isCourtSelected, setIsCourtSelected] = useState(false);
  const [availablSlots, setAvailableSlots] = useState();
  const [slot, setSlot] = useState();
  const getCourts = async () => {
    const responce = await api.get("/getCourts");
    setcourtValues(responce.data);
  };
  const getAvailableSlots = async (cou) => {
    const responce = await api.get("/getAvailableSlots", {
      params: {
        court_id: cou,
      },
    });
    setAvailableSlots(responce.data);
  };
  useEffect(() => {
    getCourts();
  }, []);
  
  return (
    <div>
      <div className="ui container">
        <div className="ui fixed borderless huge menu">
          <Link to="/" className="active item">
            THE LEAGUE
          </Link>
          <div className="right menu">
            <Link to="/admin" className="ui item">
              ADMIN
            </Link>
          </div>
        </div>
        <div style={{ margin: "20vh 0 0 0" }} className="ui raised segment ">
        {isModalVisible?<Modal handleClose={setIsModalVisible} text={msg}/>:null}
          <Formik
            initialValues={{
              email: "",
              name: "",
              contact: "",
              arena: "",
              slot: "",
            }}
            validate={(values) => {
              console.log(values);
              const errors = {};
              if (!values.email) {
                errors.email = "Enter Woxsen email ID";
              } else if (
                !/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)
              ) {
                errors.email = "Please enter a valid Woxsen email ID";
              }
              if (!values.name) {
                errors.name = "Enter your name";
              }
              if (!values.contact) {
                errors.contact = "Enter phone number";
              } else if (!isValidPhoneNumber("+91" + values.contact)) {
                errors.contact = "Enter valid phone number";
              }
              if (!values.arena) {
                errors.arena = "Select arena";
              }
              if (!values.slot) {
                errors.slot = "Select slot";
              }
              if (
                values.email &&
                values.name &&
                values.contact &&
                values.arena
              ) {
                setIsCourtSelected(true);
              }
              if (
                values.email &&
                values.name &&
                values.contact &&
                values.arena &&
                values.slot
              ) {
                setShow(false);
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(
                values.arena,
                values.slot,
                values.contact,
                values.email,
                values.name
              );
              let responce
              try{
                responce = await api.post(
                  `/addBooking?name=${values.name}&email=${values.email}&contact=${values.contact}&ground_id=${values.arena}&slot_id=${values.slot}`
                  );
              }
              catch{
                setMsg('Something went wrong')
                setIsModalVisible(true)
              }
              setSubmitting(false);
              setcourt([]);
              setSlot([]);
              setIsCourtSelected(false);
              resetForm({ values: "" });
              if (responce.status === 200) {
                alert("Slot booked sucessfully");
                setMsg('Slot booked sucessfully')
              }
              setIsModalVisible(true)
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="ui form">
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="email"
                  component="div"
                />
                <br />
                <label>Name</label>
                <Field type="text" name="name" />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="name"
                  component="div"
                />
                <br />
                <label>Mobile Number</label>
                <Field type="text" name="contact" />
                <ErrorMessage
                  style={{ color: "red" }}
                  name="contact"
                  component="div"
                />
                <br />
                <label>Select areana:</label>
                <br />
                <select
                  className="ui dropdown"
                  onChange={(e) => {
                    console.log(e.target.value);
                    getAvailableSlots(e.target.value);
                    setFieldValue("arena", e.target.value);
                  }}
                  value={court}
                  name="court"
                >
                  <option value="" hidden label="Select Court" />
                  {courtValues?.map((m) => {
                    return (
                      <option
                        key={m.ground_id}
                        value={m.ground_id}
                        label={m.ground_name}
                      />
                    );
                  })}
                </select>
                {console.log("first>>", isCourtSelected)}
                <ErrorMessage
                  style={{ color: "red" }}
                  name="arena"
                  component="div"
                />
                {isCourtSelected ? (
                  <div>
                    <label>Select Slots</label>
                    <select
                      className="ui dropdown"
                      onChange={(e) => {
                        setFieldValue("slot", e.target.value);
                      }}
                      value={slot}
                      name="court"
                    >
                      <option value="" hidden label="Select Slot" />
                      {availablSlots?.map((m) => {
                        return (
                          <option
                            key={m.slot_id}
                            value={m.slot_id}
                            label={m.slot_time}
                          />
                        );
                      })}
                    </select>
                    <ErrorMessage
                      style={{ color: "red" }}
                      name="slot"
                      component="div"
                    />
                  </div>
                ) : null}
                <br />
                <button disabled={show} className="ui button" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Home;

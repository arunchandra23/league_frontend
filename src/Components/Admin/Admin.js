import React, { useState, useEffect } from "react";
import api from "../../api";
import Singlecourtbox from "./singlecourt";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/actions/authActions";
import Table from "../../Utils/Table/Table";
import './Admin.css'

const Admin = () => {
  const [courtValues, setcourtValues] = useState([]);
  const [isCourtSelected, setIsCourtSelected] = useState(true);
  const [addingCourt, setAddingCourt] = useState(false);
  const [isCameraSelected, setIsCameraSelected] = useState(false);
  const [newCourt, setNewCourt] = useState("");
  const [refetechCourts, setrefetechCourts] = useState(false);
  const [isGetBookings, setIsGetBookings] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [daysToDelete, setDaysToDelete] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  const getBookings = async () => {
    const responce = await api.get("/getBookings");
    setBookings(responce.data);
  };
  const getCourts = async () => {
    const responce = await api.get("/getCourts");
    setcourtValues(responce.data);
  };
  const addNewCourt = async () => {
    const responce = await api.post("/addCourts", {
      court_name: newCourt,
      undermaintainence: false,
    });
    setrefetechCourts(!refetechCourts);
  };
  const deletePreviousBookings = async () => {
    console.log(daysToDelete);
    const responce = await api.post("/deletebookings", {
      numberofdays: daysToDelete.toString(),
    });
  };
  useEffect(() => {
    getCourts();
  }, [refetechCourts]);

  return (
    <div className="ui container">
      <div className="admin-nav ui secondary pointing menu">
        <br></br>
        <Link
          className={`${isCourtSelected ? "active" : null} item`}
          onClick={() => {
            setIsCourtSelected(true);
            setAddingCourt(false);
            setIsGetBookings(false);
            setIsDeleting(false);
            setIsCameraSelected(false);
          }}
        >
          Update Arena
        </Link>
        <Link
          className={`${addingCourt ? "active" : null} item`}
          onClick={() => {
            setAddingCourt(true);
            setIsGetBookings(false);
            setIsDeleting(false);
            setIsCourtSelected(false);
            setIsCameraSelected(false);
          }}
        >
          Add Arena
        </Link>
        <Link
          className={`${isGetBookings ? "active" : null} item`}
          onClick={() => {
            setIsGetBookings(true);
            setIsDeleting(false);
            setIsCourtSelected(false);
            setAddingCourt(false);
            setIsCameraSelected(false);
            getBookings();
          }}
        >
         Bookings
        </Link>
        <Link
          className={`${isDeleting ? "active" : null} item`}
          onClick={() => {
            setIsDeleting(true);
            setIsCourtSelected(false);
            setAddingCourt(false);
            setIsGetBookings(false);
            setIsCameraSelected(false);
          }}
        >
          Delete Bookings
        </Link>
        <Link
          className={`${isCameraSelected ? "active" : null} item`}
          onClick={() => {
            setIsCameraSelected(true);
            setIsDeleting(false);
            setIsCourtSelected(false);
            setAddingCourt(false);
            setIsGetBookings(false);
          }}
        >
          Security
        </Link>
        <div className="right menu">
          <Link
            className="ui item"
            onClick={() => {
              logout();
            }}
          >
            <button className="ui red  button">
            Logout
          </button>
          </Link>
        </div>
      </div>
      {isCourtSelected ? (
        <div>
          {courtValues?.map((m) => {
            return (
              <Singlecourtbox
                key={m.ground_id}
                court_id={m.ground_id}
                courtname={m.ground_name}
                underMaintenence={m.under_maintainence}
              />
            );
          })}
        </div>
      ) : null}
      {addingCourt ? (
        <div className="ui input">
          <input
            value={newCourt}
            onChange={(e) => {
              setNewCourt(e.target.value);
            }}
            type="text"
            placeholder="Enter arena name"
          ></input>
          <br/>
          <button className="ui button" onClick={() => addNewCourt()} type="submit">
            Add
          </button>
        </div>
      ) : null}
      {isGetBookings ? (
        <div>
          {bookings.length !== 0 ? (
            <Table
              isAdmin={true}
              rowData={bookings}
              handlerefetch={getBookings}
            />
          ) : (
            <div className="ui segments">
              <div className="ui segment">No Bookings</div>
            </div>
          )}
        </div>
      ) : null}
      {isDeleting ? (
        <div className="ui input">
          <input
            min={1}
            value={daysToDelete}
            onChange={(e) => {
              setDaysToDelete(e.target.value);
            }}
            type="number"
            placeholder="Enter Number of Days"
          />
          <br/>
          <button
          className="ui button"
            onClick={() => {
              deletePreviousBookings();
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Admin;

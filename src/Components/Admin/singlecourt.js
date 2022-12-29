import React, { useState, useEffect } from "react";
import api from "../../api";

const Singlecourtbox = ({ courtname, court_id, underMaintenence }) => {
  console.log(underMaintenence.toLowerCase());
  const [isCheckboxSelected, setisCheckboxSelected] = useState(
    underMaintenence === "True" ? true : false
  );
  console.log(">>>>", isCheckboxSelected);
  const handleupdatemaintenence = async (value) => {
    const responce = await api.put(
      `/updatedcouty?court_maintainence=${value}&court_id=${court_id}`
    );
  };
  return (
    <div className="ui segment">
      <p>{courtname}</p>
      <button
        className="ui button"
        onClick={() => {
          setisCheckboxSelected(!isCheckboxSelected);
          handleupdatemaintenence(!isCheckboxSelected);
        }}
      >
        {isCheckboxSelected
          ? "Remove from under Maintenenct "
          : "Update to under maintainence"}
      </button>
    </div>
  );
};

export default Singlecourtbox;

import { Avatar, Button, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../API/api";
import { DetailState } from "../Context/Details";
import "./components.css";
import PopupComp from "./Popup";

function Navbar() {
  const [pop, setPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { student, setStudent } = DetailState();
  const popUpHandle = () => {
    // console.log("sdf");
    setPop(true);
  };
  const getCurrentUser = async () => {
    let tkn = await localStorage.getItem("user");
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    };
    let { data } = await axios.get(`${URL}/student/currentUser`, config);
    console.log(data, "sd");
    if (data.error) {
      console.log("Error");
    } else {
      setStudent(data);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    console.log(student);
  }, [student]);

  useEffect(() => {
    console.log(isLoggedIn);
    console.log("called");
    getCurrentUser();
    // if (student != undefined) {
    //   setIsLoggedIn(true);
    //   //   console.log(student);
    // }
  }, [isLoggedIn, pop]);
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div style={{ display: "flex", height: "100%", alignItems: "center" }}>
          <Avatar src={student.profile_img} />{" "}
          <Typography style={{ margin: 12 }}>{student.name}</Typography>
        </div>
      ) : (
        <Button
          variant="contained"
          className="login-btn"
          style={{
            borderRadius: 10,
            backgroundColor: "#21b6ae",
            fontSize: "16px",
          }}
          onClick={popUpHandle}
        >
          Login or Register
        </Button>
      )}

      <PopupComp pop={pop} setPop={setPop} />
    </div>
  );
}

export default Navbar;

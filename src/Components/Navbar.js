import {
  Avatar,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../API/api";
import { DetailState } from "../Context/Details";
import "./components.css";
import PopupComp from "./Popup";
import Profile from "./Profile";

function Navbar() {
  const [pop, setPop] = useState(false);

  const { student, setStudent, isLoggedIn, setIsLoggedIn } = DetailState();
  const [open, setOpen] = useState(false);
  const popUpHandle = () => {
    setPop(true);
  };
  const getCurrentUser = async () => {
    let tkn = await localStorage.getItem("user");
    if (tkn) {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };
      let { data } = await axios.get(`${URL}/student/currentUser`, config);

      if (data.error) {
        console.log("Error");
      } else {
        setStudent(data);
        setIsLoggedIn(true);
      }
    }
  };

  const openProfile = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getCurrentUser();
    // if (student != undefined) {
    //   setIsLoggedIn(true);
    //   //   console.log(student);
    // }
  }, [isLoggedIn, pop]);
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={openProfile}
        >
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

      {open ? <Profile setOpen={setOpen} /> : ""}

      <PopupComp pop={pop} setPop={setPop} />
    </div>
  );
}

export default Navbar;

import { Avatar, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DetailState } from "../Context/Details";
import "./components.css";

function Profile({ setOpen }) {
  const { student, setIsLoggedIn } = DetailState();
  //   const wrapperRef = useRef(null);
  //   const [isVisible, setIsVisible] = useState(true);

  //   useEffect(() => {
  //     console.log("Dd", isVisible);
  //     // setIsVisible(true);
  //     document.addEventListener("click", handleClickOutside, false);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, false);
  //     };
  //   }, []);

  //   const handleClickOutside = (event) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       setIsVisible(false);
  //     }
  //   };

  const logOut = () => {
    localStorage.clear();
    setOpen(false);

    setIsLoggedIn(false);
  };

  return (
    <div className="profile">
      <div className="upper">
        <Avatar src={student.profile_img} />
        <Typography>{student.name}</Typography>
        <Typography>{student.email}</Typography>
      </div>
      <div>
        <Button style={{ color: "lightcoral" }} onClick={logOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Profile;

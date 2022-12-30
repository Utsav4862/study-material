import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { URL } from "../API/api";
import { DetailState } from "../Context/Details";

function PopupComp({ pop, setPop }) {
  const { student, setStudent, setIsLoggedIn, isLoggedIn } = DetailState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState(false);
  const [valid, setValid] = useState(true);

  //   console.log("vhvg");

  const login = async () => {
    let { data } = await axios.post(`${URL}/student/login`, {
      email,
      password,
    });
    console.log(data);
    if (data.token) {
      setError(false);

      localStorage.setItem("user", data.token);
      setStudent(data.student);
      setIsLoggedIn(true);
      setPop(false);
    } else {
      console.log("errrr");
      setError(true);
      setStatus("User does not Exists");
    }
  };
  const signup = async () => {
    console.log(name, email, password);
    if (name != "" && email != "" && !email.contains("@") && password != "") {
      let { data } = await axios.post(`${URL}/student/signup`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(data.student);
      if (data.student) {
        setError(false);
        setStatus("Your Account Successfully Created!!");
      } else {
        setError(true);
        setStatus("Email address already Exists!!!");
      }
    } else {
      setValid(false);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: 400,
      md: 400,
      xs: 250,
    },
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setToggle(false);
  }, []);
  return (
    <Modal
      open={pop}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CancelIcon
          onClick={() => setPop(false)}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: 15,
            top: 10,
          }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          marginBottom={5}
        >
          {!toggle ? "Login to Continue..." : "Register Now"}
        </Typography>
        {toggle ? (
          <TextField
            fullWidth
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            // size="small"
            value={name}
            className="cred"
            style={{ marginBottom: 35 }}
          />
        ) : (
          ""
        )}

        <TextField
          fullWidth
          placeholder="Email"
          // size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="cred"
          style={{ marginBottom: 35 }}
        />
        <TextField
          fullWidth
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // size="small"
          className="cred"
          type="password"
          style={{ marginBottom: 35 }}
        />
        {toggle ? (
          <Button
            fullWidth
            style={{
              borderRadius: 10,
              backgroundColor: "#21b6ae",
              //   padding: "18px 36px",
              marginBottom: 15,
              fontSize: "16px",
            }}
            variant="contained"
            onClick={signup}
          >
            Register
          </Button>
        ) : (
          <Button
            fullWidth
            style={{
              borderRadius: 10,
              backgroundColor: "#21b6ae",
              //   padding: "18px 36px",
              marginBottom: 15,
              fontSize: "16px",
            }}
            variant="contained"
            onClick={login}
          >
            Login
          </Button>
        )}

        <Typography
          id="modal-modal-title"
          variant="h6"
          //   component="span"
          align="center"
        >
          {toggle ? "Already have an Account" : "Don't have an account?"}
        </Typography>
        <Button
          fullWidth
          style={{
            borderRadius: 10,
            backgroundColor: "#21b6ae",
            //   padding: "18px 36px",
            marginBottom: 15,
            fontSize: "16px",
          }}
          variant="contained"
          onClick={() => {
            setToggle(!toggle);
            setError(false);
            setStatus("");
            setValid(true);
          }}
        >
          {toggle ? "Login Now" : "Register Now"}
        </Button>
        {/* <PasswordOutlined fullWidth size="small" className="cred" /> */}

        <Typography
          ypography
          id="modal-modal-title"
          variant="h6"
          color={error ? "red" : "green"}
          //   component="span"
          align="center"
        >
          {status}
        </Typography>

        {!valid ? (
          <Typography
            ypography
            id="modal-modal-title"
            variant="h6"
            color="red"
            //   component="span"
            align="center"
          >
            Enter Valid Details
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
}

export default PopupComp;

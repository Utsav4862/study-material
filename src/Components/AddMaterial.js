import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTkn } from "../Func/extra";
import { URL } from "../API/api";

function AddMaterial() {
  const [semester, setSemester] = useState("");
  const [material, setMaterial] = useState("");
  const [subject, setSubject] = useState("");
  const [pdf, setPdf] = useState();
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [upload, setUpload] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [ms, setMs] = useState(false);
  const fileInput = useRef();

  const navigate = useNavigate();
  const handleUpload = (e) => {
    setPdf(e.target.files[0]);
    const blob = new Blob([e.target.files[0]]);
    const fr = new FileReader();
    fr.readAsDataURL(blob);
    fr.addEventListener("load", () => {
      let res = fr.result;
    });
    setUpload(true);
  };

  const createFormData = (body = {}) => {
    let formData = new FormData();
    formData.append("file", pdf);
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    return formData;
  };
  const handleSubmit = () => {
    let body = {
      material,
      semester,
      subject,
    };

    let fd = createFormData(body);
    if (material != "" && semester != "" && subject != "" && pdf) {
      setError(false);
      getTkn().then(async (tkn) => {
        setIsSubmitted(false);

        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tkn}`,
          },
        };

        let { data } = await axios.post(`${URL}/material/upload`, fd, config);

        if (data.error) {
          setMs(true);
        }
        setIsSubmitted(true);
        setToggle(true);
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    let tkn = localStorage.getItem("user");
    if (tkn) {
      console.log("ok");
    } else {
      navigate("/");
    }
  });
  const readFile = (input) => {};
  return (
    <Container maxWidth="md">
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        align="center"
        fontWeight={"bold"}
        color={"#21b6ae"}
        marginTop={5}
      >
        Upload a Material
      </Typography>
      {error ? (
        <Alert
          severity="error"
          onClose={() => {
            setError(false);
          }}
        >
          Please Fill Valid Details{" "}
        </Alert>
      ) : (
        ""
      )}
      {/* {ms ? (
        <Alert severity="error" sx={{ width: "100%" }}>
          file size should be less than 10MB
        </Alert>
      ) : (
        ""
      )} */}
      <TextField
        placeholder="Material Name"
        fullWidth
        style={{ margin: 15 }}
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
      ></TextField>
      {/* <InputLabel>Text</InputLabel> */}
      <Select
        fullWidth
        displayEmpty
        variant="outlined"
        value={semester}
        style={{ margin: 15 }}
        // style={{ width: 100 }}
        onChange={(e) => setSemester(e.target.value)}
        renderValue={semester !== "" ? undefined : () => "Select a Semester"}
      >
        <MenuItem value={"1"}>Sem 1</MenuItem>
        <MenuItem value={"2"}>Sem 2</MenuItem>
        <MenuItem value={"3"}>Sem 3</MenuItem>
        <MenuItem value={"4"}>Sem 4</MenuItem>
        <MenuItem value={"5"}>Sem 5</MenuItem>
        <MenuItem value={"6"}>Sem 6</MenuItem>
        <MenuItem value={"7"}>Sem 7</MenuItem>
      </Select>
      <TextField
        placeholder="Subject Name"
        fullWidth
        style={{ margin: 15 }}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></TextField>
      <div style={{ margin: 15 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInput.current.click()}
        >
          upload a PDF
        </Button>
        <Typography marginTop={1}>(Max 10MB allowed)</Typography>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleUpload}
        multiple={false}
      />

      {pdf !== undefined ? (
        <Alert style={{ margin: 15 }} severity="success">
          {pdf.name} has been uploaded successfully!!!
        </Alert>
      ) : (
        ""
      )}

      <Button
        disabled={!isSubmitted}
        style={{
          margin: 15,
          backgroundColor: "#21b6ae",
          color: "#fff",
          fontSize: "16px",
        }}
        fullWidth
        onClick={handleSubmit}
      >
        Submit Details
      </Button>
      {!isSubmitted ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress style={{ color: "#21b6ae" }} />
        </div>
      ) : (
        ""
      )}

      <Snackbar open={toggle} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Your Material uploaded Successfully!!!!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddMaterial;

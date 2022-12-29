import {
  Alert,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMaterial() {
  const [sem, setSem] = useState("");
  const [pdf, setPdf] = useState();
  const [upload, setUpload] = useState(false);
  const fileInput = useRef();

  const navigate = useNavigate();
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    setPdf(e.target.files[0]);
    const blob = new Blob([e.target.files[0]]);
    const fr = new FileReader();
    fr.readAsDataURL(blob);
    fr.addEventListener("load", () => {
      let res = fr.result;
      console.log(res);
    });
    setUpload(true);
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
      <TextField
        placeholder="Material Name"
        fullWidth
        style={{ margin: 15 }}
      ></TextField>
      {/* <InputLabel>Text</InputLabel> */}
      <Select
        fullWidth
        displayEmpty
        variant="outlined"
        value={sem}
        style={{ margin: 15 }}
        // style={{ width: 100 }}
        onChange={(e) => setSem(e.target.value)}
        renderValue={sem !== "" ? undefined : () => "Select a Semester"}
      >
        <MenuItem value={"sem 1"}>Sem 1</MenuItem>
        <MenuItem value={"sem 2"}>Sem 2</MenuItem>
        <MenuItem value={"sem 3"}>Sem 3</MenuItem>
        <MenuItem value={"sem 4"}>Sem 4</MenuItem>
        <MenuItem value={"sem 5"}>Sem 5</MenuItem>
        <MenuItem value={"sem 6"}>Sem 6</MenuItem>
        <MenuItem value={"sem 7"}>Sem 7</MenuItem>
      </Select>
      <TextField
        placeholder="Subject Name"
        fullWidth
        style={{ margin: 15 }}
      ></TextField>
      <div style={{ margin: 15 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInput.current.click()}
        >
          upload file
        </Button>
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
        style={{
          margin: 15,
          backgroundColor: "#21b6ae",
          color: "#fff",
          fontSize: "16px",
        }}
        fullWidth
      >
        Submit Details
      </Button>
    </Container>
  );
}

export default AddMaterial;

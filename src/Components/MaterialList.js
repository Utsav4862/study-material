import {
  Button,
  Container,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import { DetailState } from "../Context/Details";
import { Box } from "@mui/system";
import { URL } from "../API/api";

import axios from "axios";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function MaterialList() {
  const { student, setIsLoggedIn, isLoggedIn } = DetailState();
  const [search, setSearch] = useState("");
  const [canUpload, setCanUpload] = useState(true);
  const [semester, setSemester] = useState("");
  const [allMat, setAllMat] = useState([]);
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const formatDate = (dt) => {
    let dtt = new Date(dt);

    let m = dtt.getMonth() + 1;
    let d = dtt.getDate() + "/" + m + "/" + dtt.getFullYear();
    return d;
  };

  const handleUpload = () => {
    if (isLoggedIn) {
      setCanUpload(true);
      navigate("add-material");
    } else {
      setCanUpload(false);
    }
  };

  const searchMaterial = async (semester, search) => {
    let { data } = await axios.post(`${URL}/material/search/`, {
      semester,
      search,
    });

    setAllMat(data);
  };

  const fetchMaterials = async () => {
    let { data } = await axios.get(`${URL}/material/all`);

    setAllMat(data);
  };
  useEffect(() => {
    fetchMaterials();
  }, []);

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
    bgcolor: "#fff",
    // border: "2px solid #fff",
    outline: "none",
    borderRadius: 5,
    boxShadow: 24,
    border: "none",
    p: 4,
  };
  return (
    <div className="main-content-wrapper">
      <Container maxWidth="xl" className="main-content">
        <Select
          fullWidth
          displayEmpty
          variant="outlined"
          value={semester}
          // style={{ width: 100 }}
          onChange={(e) => {
            setSemester(e.target.value);
            searchMaterial(e.target.value, search);
          }}
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
          size="medium"
          fullWidth
          placeholder="Search for subject or material... "
          variant="standard"
          value={search}
          style={{ marginTop: 20 }}
          onKeyDown={(e) => {
            searchMaterial(semester, e.target.value);
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Material", "Subject", "Semester", "Uploaded By", "Date"].map(
                  (head) => (
                    <TableCell
                      style={{
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head == "Material" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {allMat.map((mat) => (
                <TableRow style={{}} key={mat._id}>
                  <TableCell
                    style={{ color: "blue", cursor: "pointer", fontSize: 20 }}
                    component={"th"}
                    scope="row"
                    onClick={() => window.open(mat.pdf)}
                    align="left"
                  >
                    {mat.material} <OpenInNewIcon fontSize="18" />
                  </TableCell>
                  <TableCell
                    component={"th"}
                    scope="row"
                    align="right"
                    style={{ fontSize: 18 }}
                  >
                    {mat.subject}
                  </TableCell>
                  <TableCell
                    component={"th"}
                    scope="row"
                    align="right"
                    style={{ fontSize: 18 }}
                  >
                    {mat.semester}
                  </TableCell>
                  <TableCell
                    component={"th"}
                    scope="row"
                    align="right"
                    style={{ fontSize: 18 }}
                  >
                    {/* <Avatar src={mat.student.profile_img} /> */}
                    {mat.student.name}
                  </TableCell>

                  <TableCell align="right">
                    {formatDate(mat.createdAt)}
                    {/* {" "}
                    <a href="123.zip" target="_blank" download>
                      <DownloadIcon />
                    </a> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          className="plus-btn"
          style={{
            position: "fixed",
            bottom: 50,
            right: 50,
            width: 50,
            backgroundColor: "#21b6ae",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={handleUpload}
        >
          <AddCircleOutlineRoundedIcon
            fontSize="large"
            style={{ textAlign: "center", color: "#fff" }}
          />
        </div>

        <Modal
          open={!canUpload}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              You need to Login to Upload a Material
            </Typography>
            <Button
              onClick={() => setCanUpload(true)}
              style={{
                borderRadius: 5,
                backgroundColor: "#21b6ae",
                //   padding: "18px 36px",
                marginLeft: 15,
                fontSize: "16px",
                marginTop: 10,
              }}
              variant="contained"
            >
              Ok
            </Button>
          </Box>
        </Modal>
      </Container>
      {/* <object
        data="http://localhost:5555/file-1672339101934.pdf"
        width="800"
        height="500"
      ></object> */}
    </div>
  );
}

export default MaterialList;

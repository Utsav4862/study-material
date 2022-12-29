import {
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import Navbar from "./Navbar";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
import { DetailState } from "../Context/Details";
import { Box } from "@mui/system";

function MaterialList() {
  const { student } = DetailState();
  const [canUpload, setCanUpload] = useState(true);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (student != undefined) {
      setCanUpload(true);
      navigate("add-material");
    } else {
      setCanUpload(false);
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
        <TextField
          size="medium"
          fullWidth
          placeholder="Search for subject, semester or student name... "
          variant="standard"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Material",
                  "Subject",
                  "Semester",
                  "Uploaded By",
                  "Download",
                ].map((head) => (
                  <TableCell
                    style={{
                      fontWeight: "700",
                    }}
                    align={head == "Material" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell component={"th"} scope="row">
                  Technical
                </TableCell>
                <TableCell component={"th"} scope="row" align="right">
                  PDS
                </TableCell>
                <TableCell component={"th"} scope="row" align="right">
                  5th
                </TableCell>
                <TableCell component={"th"} scope="row" align="right">
                  Utsav Dholiya
                </TableCell>

                <TableCell align="right">
                  {" "}
                  <DownloadIcon />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          className="plus-btn"
          style={{
            position: "absolute",
            right: 50,
            bottom: 50,
            width: 50,
            backgroundColor: "#21b6ae",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            cursor: "pointer",
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
    </div>
  );
}

export default MaterialList;

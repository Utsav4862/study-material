import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import React, { useState } from "react";

import Navbar from "./Navbar";
import DownloadIcon from "@mui/icons-material/Download";
import MaterialList from "./MaterialList";
import { Route, Routes } from "react-router-dom";
import AddMaterial from "./AddMaterial";

function Home() {
  return (
    <div>
      <Navbar />
      {/* <div className="main-content-wrapper">
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
        </Container>
        <div></div>
      </div> */}
      <Routes>
        <Route path="/" element={<MaterialList />} />
        <Route path="/add-material" element={<AddMaterial />} />
      </Routes>
    </div>
  );
}

export default Home;

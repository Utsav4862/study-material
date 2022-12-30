import React, { createContext, useContext, useState } from "react";

const DetailContext = createContext();

function Details({ children }) {
  const [student, setStudent] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <DetailContext.Provider
      value={{ student, setStudent, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </DetailContext.Provider>
  );
}

export const DetailState = () => {
  return useContext(DetailContext);
};

export default Details;

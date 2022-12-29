import React, { createContext, useContext, useState } from "react";

const DetailContext = createContext();

function Details({ children }) {
  const [student, setStudent] = useState();
  return (
    <DetailContext.Provider value={{ student, setStudent }}>
      {children}
    </DetailContext.Provider>
  );
}

export const DetailState = () => {
  return useContext(DetailContext);
};

export default Details;

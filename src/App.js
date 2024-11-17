import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FileUpload from "./FileUpload";
// import logo from "./Vaahannex.png";
// import AddressForm from "./AddressForm";
// import Navbar from "./Navbar";
// import Navbar from "./Navbar";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FileUpload />} />
          {/* <Route path="/address" element={<AddressForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}



export default App;
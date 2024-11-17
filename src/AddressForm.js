// import React from "react";
// import "./AddressForm.css"; // Create this CSS file to style the layout
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// // import MapComponent from "./MapComponent"; // Import the MapComponent

// function AddressForm() {
//     const navigate = useNavigate();
//     const handleBackButton = () => {
//         navigate("/");
//     };

//     return (
//         <div className="address-form-page">
//             {/* <header className="App-header">
//                 <Navbar />
//             </header> */}
//             {/* <main>
//                 <div className="content">
//                     <div className="content-wrap">
//                         <div className="content-words">
//                             <h2>Keeping the roads safe, and you safer!</h2>
//                             <p>
//                                 Adding the Address Details will help us report the location to the respective department to take care of it for you!
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </main> */}
//             <div className="form-container">
//                 {/* Map section */}

//                 {/* <div style={{ margin: "50px", borderRadius: "8px" }}>

//                     <MapComponent />

//                 </div> */}

//                 {/* Form section */}
//                 <div className="address-form">
//                     <div className="form-group">
//                         <label htmlFor="address">Address</label>
//                         <input id="address" type="text" placeholder="Enter Details" required/>
//                     </div>
//                     <div>
//                         <div className="form-group1">
//                             <div className="form-group">
//                                 <label htmlFor="state">State</label>
//                                 <input id="state" type="text" placeholder="Enter Details" required/>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="city">City</label>
//                                 <input id="city" type="text" placeholder="Enter Details" required/>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="address-btn">
//                         {/* <button className="back-button" onClick={handleBackButton}>Back</button> */}
//                         <button className="submit-button">Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddressForm;

import React, { useState } from "react";
import "./AddressForm.css"; // Ensure proper styling
// import { useNavigate } from "react-router-dom";

function AddressForm({ onAddressChange }) {
  // const navigate = useNavigate();

  // Local state to manage form inputs
  const [formState, setFormState] = useState({
    address: "",
    city: "",
    state: "",
    name: "",
    email: "",
    phone: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Call the parent callback with updated address details
    const fullAddress = `${formState.address}, ${formState.city}, ${formState.state}`;
    onAddressChange(fullAddress);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled out
    if (!formState.address || !formState.city || !formState.state) {
      alert("Please fill in all the fields.");
      return;
    }

    const fullAddress = `${formState.address}, ${formState.city}, ${formState.state}`;
    // console.log(fullAddress)
    onAddressChange(fullAddress);
    alert("Address submitted successfully!");
  };

  return (
    <div className="address-form-page">
      <div className="form-container">
        <div className="address-form">
          <form onSubmit={handleSubmit}>
            {/* Address Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter Phone number"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter Email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter Address"
                  value={formState.address}
                  onChange={handleChange}
                  required
                />
              </div>


            {/* State and City Fields */}
            <div className="form-group1">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  placeholder="Enter State"
                  value={formState.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter City"
                  value={formState.city}
                  onChange={handleChange}
                  required
                />
              </div>

              
            </div>

            {/* Buttons */}
            <div className="address-btn">
              {/* <button
                type="button"
                className="back-button"
                onClick={() => navigate("/")}
              >
                Back
              </button> */}
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;


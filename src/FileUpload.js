// 
// <****************** Version-1 **********>

// import React, { useState, useRef } from "react";
// import s3 from "./AWSConfig";

// function FileUpload() {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (event) => {
//     event.preventDefault();
//     const selectedFiles = event.target.files;
//     setFiles(Array.from(selectedFiles));
//   };

//   const uploadToS3 = async (file) => {
//     const params = {
//       Bucket: "vaahannex", // Replace with your bucket name
//       Key: `uploads/${file.name}`, // Path inside your bucket
//       Body: file,
//       ACL: "public-read", // Optional: To make the file publicly accessible
//       ContentType: file.type, // Set the content type
//     };

//     return s3.upload(params).promise(); // Return a promise for async handling
//   };

//   const handleUpload = async () => {
//     setUploading(true);
//     try {
//       const uploadPromises = files.map((file) => uploadToS3(file));
//       const results = await Promise.all(uploadPromises);

//       console.log("Upload Results:", results);
//       alert("Files uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Videos to AWS S3</h1>
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="video/*"
//         multiple
//         onChange={handleFileSelect}
//       />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload to S3"}
//       </button>

//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FileUpload;


// // <****************** Version-2 **********>

// import React, { useState, useRef } from "react";
// import AWS from "aws-sdk"; // AWS SDK for S3 integration
// import "./FileUpload.css";
// import uploadIcon from "./Group 23.png"; // Path to upload icon
// import videoIcon from "./movie.png"; // Path to video icon for file previews
// import Navbar from "./Navbar";
// import AddressForm from "./AddressForm"; // Import the AddressForm component

// function FileUpload() {
//   const [files, setFiles] = useState([]);
//   const [address, setAddress] = useState("");
//   const [uploading, setUploading] = useState(false); // To manage upload state
//   const fileInputRef = useRef(null); // Ref for the file input element

//   // Configure AWS SDK
//   const s3 = new AWS.S3({
//     accessKeyId: "aws-key", // Replace with your IAM Access Key
//     secretAccessKey: "secret-key", // Replace with your IAM Secret Key
//     region: "us-east-1", // Replace with your S3 bucket's region (e.g., "us-east-1")
//   });

//   // Handle file selection from drag-and-drop or file input
//   const handleFileSelect = (event) => {
//     event.preventDefault();

//     let selectedFiles;
//     if (event.dataTransfer) {
//       selectedFiles = event.dataTransfer.files;
//     } else {
//       selectedFiles = event.target.files;
//     }

//     // Convert FileList to an array and update state
//     const fileArray = Array.from(selectedFiles);
//     setFiles((prevFiles) => [...prevFiles, ...fileArray]);

//     // Reset the input value so it can detect the same file again
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };

//   // Handle removal of a file
//   const removeFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   // Trigger file input click
//   const handleUploadButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Function to upload files to AWS S3
//   const uploadFileToS3 = async (file) => {
//     const params = {
//       Bucket: "vaahannex", // Replace with your bucket name
//       Key: `uploads/${file.name}`, // Define the path inside the bucket
//       Body: file,
//       ACL: "public-read", // Optional: Allows public access to the file
//       ContentType: file.type, // Set the content type (e.g., video/mp4)
//     };

//     try {
//       const data = await s3.upload(params).promise();
//       console.log(`File uploaded successfully at ${data.Location}`);
//       return data.Location; // Return the file's public URL
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   };

//   const saveToGoogleSheets = async (videoURL, address) => {
//     const endpoint = "https://script.google.com/macros/s/AKfycbzZ-_WJsmsNizmEMErR2KfZTQo79QJWwRwWbZtPTM8EX43ALPE5OIeFgJAxnImzjkP9/exec"; // Replace with your Apps Script URL
  
//     const requestBody = {
//       videoURL,
//       address,
//     };
  
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         mode: "no-cors", // Enable cross-origin requests
//         body: JSON.stringify(requestBody),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to save data to Google Sheets");
//       }
  
//       const responseData = await response.json();
//       console.log("Data saved to Google Sheets:", responseData);
//     } catch (error) {
//       console.error("Error saving data to Google Sheets:", error);
//     }
//   };
  
//   const handleUploadFiles = async () => {
//     if (!address) {
//       alert("Please enter an address before uploading files.");
//       return;
//     }
  
//     setUploading(true);
  
//     try {
//       for (const file of files) {
//         // Upload file to S3
//         const videoURL = await uploadFileToS3(file);
  
//         // Save video URL and address to Google Sheets
//         await saveToGoogleSheets(videoURL, address);
  
//         console.log(`File ${file.name} uploaded and saved to Google Sheets successfully`);
//       }
  
//       alert("Files uploaded and saved successfully!");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files. Please try again.");
//     } finally {
//       setUploading(false);
//       setFiles([]);
//       setAddress("");
//     }
//   };
  
//   return (
//     <div>
//       <header className="App-header">
//         <Navbar />
//       </header>
//       <main>
//         <div className="content">
//           <div className="content-wrap">
//             <div className="content-words">
//               <h2>Keeping the roads safe, and you safer!</h2>
//               <p>
//                 Upload a video of a pothole or manhole detected in your area and
//                 help us keep the roads safe for all of us!
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//       <div className="upload-container">
//         {files.length === 0 ? (
//           // Upload Container with Drag-and-Drop when there are no files uploaded
//           <div
//             className="drag-drop-box"
//             onDragOver={(event) => event.preventDefault()}
//             onDrop={handleFileSelect}
//             onClick={handleUploadButtonClick}
//           >
//             <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
//             <p>Drag & Drop Files here (.mov or .mp4)</p>
//           </div>
//         ) : (
//           // File Preview List and AddressForm when files are uploaded
//           <div className="main-content">
//             <div className="uploaded-content">
//               <div className="file-list">
//                 {files.map((file, index) => (
//                   <div key={index} className="file-item">
//                     <img src={videoIcon} alt="Video Icon" className="file-icon" />
//                     <span className="file-name">{file.name}</span>
//                     <button
//                       className="remove-button"
//                       onClick={() => removeFile(index)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Render the AddressForm next to the file preview list */}
//             <div className="address-form-container">
//               <AddressForm onAddressChange={(newAddress) => setAddress(newAddress)} />
//             </div>
//           </div>
//         )}

//         {/* Always include the file input element, but hide it with CSS */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".mov,.mp4"
//           multiple
//           style={{ display: "none" }}
//           onChange={handleFileSelect}
//         />

//         <div style={{ marginTop: "20px" }}>
//           <button
//             className="upload-button"
//             onClick={handleUploadFiles}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Save to AWS S3"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

// <************************ Version-3 ****************>


// import React, { useState, useRef } from "react";
// import AWS from "aws-sdk"; // AWS SDK for S3 integration
// // import { collection, addDoc } from "firebase/firestore"; // Firestore functions
// // import { firestore } from "./Firebase"; // Your Firebase configuration
// import "./FileUpload.css";
// import uploadIcon from "./Group 23.png"; // Path to upload icon
// import videoIcon from "./movie.png"; // Path to video icon for file previews
// import Navbar from "./Navbar";
// import AddressForm from "./AddressForm"; // Import the AddressForm component

// function FileUpload() {
//   const [files, setFiles] = useState([]);
//   const [address, setAddress] = useState("");
//   const [uploading, setUploading] = useState(false); // To manage upload state
//   const fileInputRef = useRef(null); // Ref for the file input element

//   // Configure AWS SDK
//   const s3 = new AWS.S3({
//     accessKeyId: "aws-key", // Replace with your IAM Access Key
//     secretAccessKey: "secret-key", // Replace with your IAM Secret Key
//     region: "us-east-1", // Replace with your S3 bucket's region (e.g., "us-east-1")
//   });


   

//   // Handle file selection from drag-and-drop or file input
//   const handleFileSelect = (event) => {
//     event.preventDefault();

//     let selectedFiles;
//     if (event.dataTransfer) {
//       selectedFiles = event.dataTransfer.files;
//     } else {
//       selectedFiles = event.target.files;
//     }

//     // Convert FileList to an array and update state
//     const fileArray = Array.from(selectedFiles);
//     setFiles((prevFiles) => [...prevFiles, ...fileArray]);

//     // Reset the input value so it can detect the same file again
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };


//   const saveToGoogleDriveAndSheets = async (file, addressDetails) => {
//         const corsProxy = "https://cors-anywhere.herokuapp.com/"; // CORS proxy URL
//         const endpoint =
//           "https://script.google.com/macros/s/AKfycbyMYybnYQ2U8N4GXlI2P5mNvr3uaaJGmBlvmnxPBMzqVGbcI41uLFg1cMMZCBw1izxV/exec"; // Replace with your Apps Script URL
    
//         const fileReader = new FileReader();
    
//         return new Promise((resolve, reject) => {
//           fileReader.onload = async () => {
//             const base64File = fileReader.result.split(",")[1]; // Extract Base64 part
    
//             const requestBody = {
//               videoFile: base64File,
//               fileType: file.type,
//               fileName: file.name,
//               name: "abhishek",
//               email: "abhishekkr1025@gmail.com",
//               phone: "8375936641",
//               ...addressDetails, // Spread user address details (name, phone, email, etc.)
//             };
//             //  console.log(...addressDetails);
//             try {
//               const response = await fetch(endpoint, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(requestBody),
//               });
    
//               // console.log(response);
    
//               if (!response.ok) {
//                 throw new Error("Failed to save data to Google Drive or Sheets");
//               }
    
//               const responseData = await response.json();
//               console.log(`File ${file.name} saved successfully:`, responseData);
//               resolve(responseData);
//             } catch (error) {
//               console.log(error);
//               console.error(`Error saving file ${file.name}:`, error);
//               reject(error);
//             }
//           };
    
//           fileReader.onerror = () => {
//             reject(new Error("Error reading file"));
//           };
    
//           fileReader.readAsDataURL(file);
//         });
//       };

//   // Handle removal of a file
//   const removeFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   // Trigger file input click
//   const handleUploadButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Function to upload files to AWS S3
//   const uploadFileToS3 = async (file) => {
//     const params = {
//       Bucket: "vaahannex", // Replace with your bucket name
//       Key: `uploads/${file.name}`, // Define the path inside the bucket
//       Body: file,
//       ACL: "public-read", // Optional: Allows public access to the file
//       ContentType: file.type, // Set the content type (e.g., video/mp4)
//     };

//     try {
//       const data = await s3.upload(params).promise();
//       console.log(`File uploaded successfully at ${data.Location}`);
//       return data.Location; // Return the file's public URL
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   };

//   // Function to save video URL and address to Firestore
//   // const saveToFirestore = async (videoURL) => {
//   //   try {
//   //     const docRef = await addDoc(collection(firestore, "uploads"), {
//   //       videoURL,
//   //       address,
//   //       timestamp: new Date(), // Save the current timestamp
//   //     });
//   //     console.log("Document written with ID: ", docRef.id);
//   //   } catch (error) {
//   //     console.error("Error saving to Firestore:", error);
//   //   }
//   // };

//   // Function to handle file upload and metadata saving
//   const handleUploadFiles = async () => {
//     if (!address) {
//       alert("Please enter an address before uploading files.");
//       return;
//     }

//     setUploading(true);

//     try {
//       for (const file of files) {
//         // Upload file to S3
//         const videoURL = await uploadFileToS3(file);

//         // Save video URL and address to Firestore
//         // await saveToFirestore(videoURL);

//         console.log(`File ${file.name} uploaded and saved to Firestore successfully`);
//       }

//       alert("Files uploaded and address saved successfully!");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("Failed to upload files. Please try again.");
//     } finally {
//       setUploading(false);
//       setFiles([]);
//       setAddress("");
//     }
//   };

//   return (
//     <div>
//       <header className="App-header">
//         <Navbar />
//       </header>
//       <main>
//         <div className="content">
//           <div className="content-wrap">
//             <div className="content-words">
//               <h2>Keeping the roads safe, and you safer!</h2>
//               <p>
//                 Upload a video of a pothole or manhole detected in your area and
//                 help us keep the roads safe for all of us!
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//       <div className="upload-container">
//         {files.length === 0 ? (
//           // Upload Container with Drag-and-Drop when there are no files uploaded
//           <div
//             className="drag-drop-box"
//             onDragOver={(event) => event.preventDefault()}
//             onDrop={handleFileSelect}
//             onClick={handleUploadButtonClick}
//           >
//             <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
//             <p>Drag & Drop Files here (.mov or .mp4)</p>
//           </div>
//         ) : (
//           // File Preview List and AddressForm when files are uploaded
//           <div className="main-content">
//             <div className="uploaded-content">
//               <div className="file-list">
//                 {files.map((file, index) => (
//                   <div key={index} className="file-item">
//                     <img src={videoIcon} alt="Video Icon" className="file-icon" />
//                     <span className="file-name">{file.name}</span>
//                     <button
//                       className="remove-button"
//                       onClick={() => removeFile(index)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Render the AddressForm next to the file preview list */}
//             <div className="address-form-container">
//               <AddressForm onAddressChange={(newAddress) => setAddress(newAddress)} />
//             </div>
//           </div>
//         )}

//         {/* Always include the file input element, but hide it with CSS */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".mov,.mp4"
//           multiple
//           style={{ display: "none" }}
//           onChange={handleFileSelect}
//         />

//         <div style={{ marginTop: "20px" }}>
//           <button
//             className="upload-button"
//             onClick={handleUploadFiles}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Save to AWS S3"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

// <************************ Version-4 ****************>

// import React, { useState, useRef } from "react";
// import AWS from "aws-sdk"; // AWS SDK for S3 integration
// import "./FileUpload.css";
// import uploadIcon from "./Group 23.png"; // Path to upload icon
// import videoIcon from "./movie.png"; // Path to video icon for file previews
// import Navbar from "./Navbar";
// import AddressForm from "./AddressForm"; // Import the AddressForm component

// function FileUpload() {
//   const [files, setFiles] = useState([]); // To hold selected files
//   const [address, setAddress] = useState(""); // To store the address input
//   const [uploading, setUploading] = useState(false); // To manage the upload state
//   const fileInputRef = useRef(null); // Ref for the file input element

//   // Configure AWS SDK for S3
//   const s3 = new AWS.S3({
//     accessKeyId: "aws-key", // Replace with your IAM Access Key
//     secretAccessKey: "secret-key", // Replace with your IAM Secret Key
//     region: "us-east-1", // Replace with your S3 bucket's region (e.g., "us-east-1")
//   });

//   // Handle file selection via drag-and-drop or file input
//   const handleFileSelect = (event) => {
//     event.preventDefault();

//     let selectedFiles;
//     if (event.dataTransfer) {
//       selectedFiles = event.dataTransfer.files; // Drag-and-drop files
//     } else {
//       selectedFiles = event.target.files; // File input selection
//     }

//     // Convert FileList to an array and update the state
//     const fileArray = Array.from(selectedFiles);
//     setFiles((prevFiles) => [...prevFiles, ...fileArray]);

//     // Reset file input to allow reselecting the same file
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };

//   // Remove a file from the selected files
//   const removeFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   // Trigger file input click for manual selection
//   const handleUploadButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Upload a file to AWS S3 and return its URL
//   const uploadFileToS3 = async (file) => {
//     const params = {
//       Bucket: "vaahannex", // Replace with your bucket name
//       Key: `uploads/${file.name}`, // Define the path inside the bucket
//       Body: file,
//       ACL: "public-read", // Optional: Allows public access to the file
//       ContentType: file.type, // Set the content type (e.g., video/mp4)
//     };

//     try {
//       const data = await s3.upload(params).promise();
//       console.log(`File uploaded successfully at ${data.Location}`);
//       return data.Location; // Return the file's public URL
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   };

//   const saveToGoogleSheets = async (videoURL) => {
//     const endpoint = "https://script.google.com/macros/s/AKfycbyGfsXW0Pqze9nV2Jl5SH_C1ckHM8SlQJHHa8TB_tykCh6gYRxEZEmq4JhydVVPJ50QyQ/exec";
  
//     const requestBody = {
//       videoURL,
//       address,
//     };
  
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         mode: "no-cors", // Enable cross-origin requests
//         body: JSON.stringify(requestBody),
//       });
  
//       // if (!response.ok) {
//       //   throw new Error("Failed to save data to Google Sheets");
//       // }
  
//       const responseData = await response.json();
//       console.log("Response from Google Sheets API:", responseData);
//     } catch (error) {
//       console.error("Error saving data to Google Sheets:", error);
//       throw error;
//     }
//   };
  

//   // Handle the upload process
//   const handleUploadFiles = async () => {
//     if (!address) {
//       alert("Please enter an address before uploading files.");
//       return;
//     }

//     setUploading(true);

//     try {
//       for (const file of files) {
//         // Upload the file to S3
//         const videoURL = await uploadFileToS3(file);

//         // Save the video URL and address to Google Sheets
//         await saveToGoogleSheets(videoURL);

//         console.log(`File ${file.name} uploaded and saved to Google Sheets successfully`);
//       }

//       alert("Files uploaded and address saved successfully!");
//     } catch (error) {
//       // console.error("Error uploading files:", error);
//       // alert("Failed to upload files. Please try again.");
//     } finally {
//       setUploading(false);
//       setFiles([]);
//       setAddress("");
//     }
//   };

//   return (
//     <div>
//       <header className="App-header">
//         <Navbar />
//       </header>
//       <main>
//         <div className="content">
//           <div className="content-wrap">
//             <div className="content-words">
//               <h2>Keeping the roads safe, and you safer!</h2>
//               <p>
//                 Upload a video of a pothole or manhole detected in your area and
//                 help us keep the roads safe for everyone!
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//       <div className="upload-container">
//         {files.length === 0 ? (
//           <div
//             className="drag-drop-box"
//             onDragOver={(event) => event.preventDefault()}
//             onDrop={handleFileSelect}
//             onClick={handleUploadButtonClick}
//           >
//             <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
//             <p>Drag & Drop Files here (.mov or .mp4)</p>
//           </div>
//         ) : (
//           <div className="main-content">
//             <div className="uploaded-content">
//               <div className="file-list">
//                 {files.map((file, index) => (
//                   <div key={index} className="file-item">
//                     <img src={videoIcon} alt="Video Icon" className="file-icon" />
//                     <span className="file-name">{file.name}</span>
//                     <button
//                       className="remove-button"
//                       onClick={() => removeFile(index)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="address-form-container">
//               <AddressForm onAddressChange={(newAddress) => setAddress(newAddress)} />
//             </div>
//           </div>
//         )}

//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".mov,.mp4"
//           multiple
//           style={{ display: "none" }}
//           onChange={handleFileSelect}
//         />

//         <div style={{ marginTop: "20px" }}>
//           <button
//             className="upload-button"
//             onClick={handleUploadFiles}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Save to AWS S3"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;





import React, { useState, useRef } from "react";
import "./FileUpload.css";
import uploadIcon from "./Group 23.png";
import videoIcon from "./movie.png";
import Navbar from "./Navbar";
import AddressForm from "./AddressForm"; // Import AddressForm

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [addressDetails, setAddressDetails] = useState(""); // To capture the full address
  const [uploading, setUploading] = useState(false); // To manage upload state
  const fileInputRef = useRef(null); // Ref for the file input element

  const saveToGoogleDriveAndSheets = async (file, addressDetails) => {
    const corsProxy = "https://cors-anywhere.herokuapp.com/"; // CORS proxy URL
    const endpoint =
      "https://script.google.com/macros/s/AKfycbw-to1EJcompeiHUiISLLV86B63ypRi-SfdliKB4sKt9KMtjUW9XEomFWwUyxOpzaZVCQ/exec"; // Replace with your Apps Script URL

    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const base64File = fileReader.result.split(",")[1]; // Extract Base64 part

        const requestBody = {
          videoFile: base64File,
          fileType: file.type,
          fileName: file.name,
          name: "abhishek",
          email: "abhishekkr1025@gmail.com",
          phone: "8375936641",
          ...addressDetails, // Spread user address details (name, phone, email, etc.)
        };
        //  console.log(...addressDetails);

        console.log(requestBody);
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify(requestBody),
          });

          // console.log(response);

          // if (!response.ok) {
          //   throw new Error("Failed to save data to Google Drive or Sheets");
          // }

          // const responseData = await response.json();
          console.log(`File ${file.name} saved successfully:`);
          // resolve(responseData);
        } catch (error) {
          console.log(error);
          console.error(`Error saving file ${file.name}:`, error);
          reject(error);
        }
      };

      fileReader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (event) => {
    event.preventDefault();

    let selectedFiles;
    if (event.dataTransfer) {
      selectedFiles = event.dataTransfer.files;
    } else {
      selectedFiles = event.target.files;
    }

    const fileArray = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...fileArray]);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadFiles = async () => {
    if (!addressDetails) {
      alert("Please fill in all required fields before uploading files.");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map((file) =>
        saveToGoogleDriveAndSheets(file, addressDetails)
      );

      await Promise.all(uploadPromises);

      alert("All files uploaded and saved successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setUploading(false);
      setFiles([]);
      setAddressDetails("");
    }
  };

  return (
    <div>
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <div className="content">
          <div className="content-wrap">
            <div className="content-words">
              <h2>Keeping the roads safe, and you safer!</h2>
              <p>
                Upload a video of a pothole or manhole detected in your area and
                help us keep the roads safe for all of us!
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="upload-container">
        {files.length === 0 ? (
          <div
            className="drag-drop-box"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleFileSelect}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
            <p>Drag & Drop Files here (.mov or .mp4)</p>
          </div>
        ) : (
          <div className="main-content">
            <div className="uploaded-content">
              <div className="file-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <img src={videoIcon} alt="Video Icon" className="file-icon" />
                    <span className="file-name">{file.name}</span>
                    <button
                      className="remove-button"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="address-form-container">
              {/* AddressForm component to capture user inputs */}
              <AddressForm onAddressChange={(details) => setAddressDetails(details)} />
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".mov,.mp4"
          multiple
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <div style={{ marginTop: "20px" }}>
          <button
            className="upload-button"
            onClick={handleUploadFiles}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;

import React from 'react';
import './Footer.css'; // Create this file for styling
import footerImage from './image 4.png'; // Adjust the path based on where you placed the image

function Footer() {
  return (
    <div className="footer">
      <img src={footerImage} alt="Footer" className="footer-image" />
    </div>
  );
}

export default Footer;

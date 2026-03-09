import React, { useEffect, useState } from "react";

const Footer = () => {

  return (
    <div className="footer">
      <div className="footer-item">
        <div>
          <h3 className="underline">
            Top 5 Rated Movies
          </h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <div>
          <h3 className="underline">
            5 Alltime Popular Movies
          </h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <div>
          <h3 className="underline">
            Pages
          </h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <div className="footer-item">
        <div className="footer-last">
          <button>Sign Up</button>
          <div className="footer-name-tag">
            <span className="footer-name">
              MovieSuggest <span className="left-border">|</span>
            </span>
            <span className="footer-tag"> The Streaming Suggest</span>
          </div>
          <div className="social-icons">
            <i class="fa-brands fa-square-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-tiktok"></i>
          </div>
          <p>Copyright © 2023 MovieSuggest</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-item">
        <div>
          <h3 className="underline">
            Өндөр үнэлгээтэй 5 кино
          </h3>
          <ul>
            <li>Бидний тухай</li>
            <li>Холбоо барих</li>
            <li>Анхааруулга</li>
            <li>Нууцлалын бодлого</li>
            <li>Үйлчилгээний нөхцөл</li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <div>
          <h3 className="underline">
            Хамгийн алдартай 5 кино
          </h3>
          <ul>
            <li>Бидний тухай</li>
            <li>Холбоо барих</li>
            <li>Анхааруулга</li>
            <li>Нууцлалын бодлого</li>
            <li>Үйлчилгээний нөхцөл</li>
          </ul>
        </div>
      </div>
      <div className="footer-item">
        <div>
          <h3 className="underline">
            Хуудаснууд
          </h3>
          <ul>
            <li>Бидний тухай</li>
            <li>Холбоо барих</li>
            <li>Анхааруулга</li>
            <li>Нууцлалын бодлого</li>
            <li>Үйлчилгээний нөхцөл</li>
          </ul>
        </div>
      </div>

      <div className="footer-item">
        <div className="footer-last">
          {/* Sign Up -> Бүртгүүлэх болгов */}
          <button>Бүртгүүлэх</button>
          <div className="footer-name-tag">
            <span className="footer-name">
              MovieSuggest <span className="left-border">|</span>
            </span>
            <span className="footer-tag"> Кино санал болгох платформ</span>
          </div>
          <div className="social-icons">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-tiktok"></i>
          </div>
          {/* Оныг 2026 болгож шинэчлэв */}
          <p>Зохиогчийн эрх © 2026 MovieSuggest</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

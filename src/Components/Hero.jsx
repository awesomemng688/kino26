import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="content">
        {/* Үндсэн гарчиг */}
        <h1 className="heading">
          Кино, телевизийн нэвтрүүлэг болон спортын цогц хөтөч
        </h1>
        {/* Тайлбар текст */}
        <p className="para">
          Шинэ, алдартай болон удахгүй гарах бүх төрлийн энтертайнмент контентыг 
          хаанаас үзэж болохыг MovieSuggest-ээс хайж олоорой.
        </p>
        <div className="btn">
          {/* Товчлуурууд */}
          <button className="yellow">Кино болон нэвтрүүлэг үзэх</button>
          <button className="transparent">Боломжууд</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});

  // API өгөгдөл татах функцийг useCallback-аар ороож, санах ойд хадгалах
  const getMovieDetail = useCallback(async (url) => {
    try {
      const movieDetail = await fetch(url);
      const allDetail = await movieDetail.json();
      setCurrentMovie(allDetail);
    } catch (error) {
      console.log("Дэлгэрэнгүй мэдээлэл авахад алдаа гарлаа:", error);
    }
  }, []);

  useEffect(() => {
    const API_KEY = "31d6a9af8af968f358a6c5cc9f67daaf";
    const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=mn-MN`;
    
    getMovieDetail(MOVIE_DETAIL_API);
    window.scrollTo(0, 0);
    
  }, [id, getMovieDetail]); 

  return (
    <div className="details-container">
      {/* Арын баннер хэсэг */}
      <div
        className="movie-banner-container"
        style={{
          background: currentMovie.backdrop_path 
            ? `url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')` 
            : "#1a1a1a",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '450px' // Баннерын өндөр
        }}
      ></div>

      <div className="movie-details-container">
        <div className="movie-detail-left">
          {currentMovie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
              alt={currentMovie.original_title || "poster"}
            />
          )}
        </div>
        <div className="movie-detail-right">
          <div className="title-category-para">
            <h1 className="movie-title">{currentMovie.original_title}</h1>
            <div className="movie-rating-release">
              <span className="movie-rating">
                Үнэлгээ: <i className="rating-star fa-solid fa-star"></i> {currentMovie.vote_average ? Math.round(currentMovie.vote_average * 10) / 10 : 0}
              </span>
              <span className="movie-release">Нээлт: {currentMovie.release_date}</span>
            </div>
            <div className="movie-genres">
              {currentMovie.genres &&
                currentMovie.genres.slice(0, 4).map((data) => (
                  <span key={data.id}>{data.name}</span>
                ))}
            </div>
            <p className="movie-description">{currentMovie.overview || "Тайлбар одоогоор алга байна."}</p>
          </div>
        </div>
      </div>

      {/* КИНО ТОГЛУУЛАГЧ ХЭСЭГ */}
      <div className="video-section">
        <h2 className="player-title">КИНО ҮЗЭХ 🍿</h2>
        <div className="iframe-wrapper">
          <iframe 
            src="https://vidoza.net/embed-mw4fnlbhv8zg.html" 
            frameBorder="0" 
            allowFullScreen
            title="Movie Player"
            // Доорх тохиргоонууд нь холболтын алдаанаас сэргийлнэ
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            allow="autoplay; encrypted-media; fullscreen"
          ></iframe>
        </div>
        <p className="dev-credit">Server Developer by: Awesome.!</p>
      </div>

      <style>{`
        .video-section {
          max-width: 1100px;
          margin: 50px auto;
          padding: 20px;
          text-align: center;
        }
        .player-title {
          color: #e50914;
          margin-bottom: 20px;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .iframe-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 харьцаа */
          height: 0;
          overflow: hidden;
          background: #000;
          border: 2px solid #333;
          border-radius: 12px;
          box-shadow: 0 0 25px rgba(229, 9, 20, 0.2);
        }
        .iframe-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .dev-credit {
          margin-top: 20px;
          font-size: 0.8rem;
          color: #555;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

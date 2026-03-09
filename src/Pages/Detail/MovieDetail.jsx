import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});

  const getMovieDetail = useCallback(async (url) => {
    try {
      const movieDetail = await fetch(url);
      const allDetail = await movieDetail.json();
      setCurrentMovie(allDetail);
    } catch (error) {
      console.log("Error fetching details:", error);
    }
  }, []);

  useEffect(() => {
    const API_KEY = "31d6a9af8af968f358a6c5cc9f67daaf";
    const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=mn-MN`;
    getMovieDetail(MOVIE_DETAIL_API);
    window.scrollTo(0, 0);
  }, [id, getMovieDetail]);

  return (
    <div className="details-page-wrapper" style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* 1. БАННЕР ХЭСЭГ */}
      <div className="banner-section" style={{
        height: "50vh",
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%), url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}></div>

      {/* 2. МЭДЭЭЛЛИЙН ХЭСЭГ (Responsive Container) */}
      <div className="content-container">
        <div className="movie-header">
          <div className="poster-box">
            <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="poster" />
          </div>
          <div className="info-box">
            <h1 className="title">{currentMovie.original_title}</h1>
            <div className="meta">
              <span className="rating">⭐ {currentMovie.vote_average?.toFixed(1)}</span>
              <span className="date">{currentMovie.release_date}</span>
            </div>
            <div className="genres">
              {currentMovie.genres?.map(g => <span key={g.id}>{g.name}</span>)}
            </div>
            <p className="overview">{currentMovie.overview}</p>
          </div>
        </div>

        {/* 3. ТОГЛУУЛАГЧ ХЭСЭГ */}
        <div className="player-section">
          <h2 className="watch-now-title">КИНО ҮЗЭХ 🍿</h2>
          <div className="iframe-container">
            <iframe 
              src={`https://vidsrc.to/embed/movie/${id}`} 
              frameBorder="0" 
              allowFullScreen
              allow="autoplay; fullscreen"
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation allow-fullscreen"
            ></iframe>
          </div>
          <p className="credit">Server Developer by: Awesome.!</p>
        </div>
      </div>

      <style>{`
        .content-container {
          max-width: 1200px;
          margin: -150px auto 0;
          padding: 0 20px 50px;
          position: relative;
          z-index: 5;
        }

        .movie-header {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          margin-bottom: 50px;
        }

        .poster-box img {
          width: 300px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
          border: 1px solid #333;
        }

        .info-box { flex: 1; }
        .title { font-size: 3rem; margin-bottom: 10px; }
        .meta { margin-bottom: 20px; font-weight: bold; color: #e50914; display: flex; gap: 20px; }
        .genres { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .genres span { background: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; }
        .overview { line-height: 1.6; color: #ccc; font-size: 1.1rem; }

        /* ТОГЛУУЛАГЧ */
        .player-section { margin-top: 40px; text-align: center; }
        .watch-now-title { color: #e50914; margin-bottom: 20px; letter-spacing: 2px; }
        .iframe-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          overflow: hidden;
          background: #111;
          border-radius: 12px;
        }
        .iframe-container iframe {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
        }

        /* 📱 ГАР УТАСНЫ ТОХИРГОО (Media Queries) */
        @media (max-width: 850px) {
          .movie-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: -100px;
          }
          .poster-box img { width: 200px; }
          .title { font-size: 1.8rem; }
          .content-container { margin-top: -80px; padding: 0 15px 40px; }
          .iframe-container { border-radius: 0; }
          .meta { justify-content: center; }
          .genres { justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

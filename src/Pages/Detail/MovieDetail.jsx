import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});

  const getMovieDetail = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentMovie(data);
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
    <div className="details-page-wrapper">
      {/* 1. БАННЕР ХЭСЭГ */}
      <div 
        className="banner-section" 
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), 
          url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`
        }}
      ></div>

      {/* 2. МЭДЭЭЛЛИЙН ХЭСЭГ */}
      <div className="content-container">
        <div className="movie-header">
          <div className="poster-box">
            {currentMovie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="poster" />
            )}
          </div>
          <div className="info-box">
            <h1 className="title">{currentMovie.original_title || currentMovie.title}</h1>
            <div className="meta">
              <span className="rating">⭐ {currentMovie.vote_average?.toFixed(1)} / 10</span>
              <span className="date">📅 {currentMovie.release_date}</span>
            </div>
            <div className="genres">
              {currentMovie.genres?.map(g => <span key={g.id}>{g.name}</span>)}
            </div>
            <p className="overview">{currentMovie.overview || "Тайлбар одоогоор алга."}</p>
          </div>
        </div>

        {/* 3. ТОГЛУУЛАГЧ ХЭСЭГ */}
        <div className="player-section">
          <h2 className="watch-now-title">КИНО ҮЗЭХ 🍿</h2>
          <div className="iframe-container">
            <iframe 
              // Build алдааг засах 'title' атрибут нэмэв
              title={`${currentMovie.title || 'Movie'} Player`}
              src={`https://vidsrc.to/embed/movie/${id}`} 
              frameBorder="0" 
              allowFullScreen={true}
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              // Аюулгүй байдал болон Fullscreen эрхүүд
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation allow-fullscreen"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
          <p className="credit">Server Developer by: Awesome.!</p>
        </div>
      </div>

      <style>{`
        .details-page-wrapper { background: #000; min-height: 100vh; color: #fff; overflow-x: hidden; }
        .banner-section { height: 60vh; background-size: cover; background-position: center; }
        
        .content-container { 
          max-width: 1200px; 
          margin: -200px auto 0; 
          padding: 0 20px 80px; 
          position: relative; 
          z-index: 10; 
        }

        .movie-header { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 60px; }
        .poster-box img { 
          width: 300px; 
          border-radius: 16px; 
          box-shadow: 0 15px 40px rgba(0,0,0,1); 
          border: 1px solid rgba(255,255,255,0.1); 
        }

        .info-box { flex: 1; }
        .title { font-size: 3.5rem; font-weight: 800; margin-bottom: 15px; text-shadow: 2px 2px 10px rgba(0,0,0,0.5); }
        .meta { margin-bottom: 25px; font-size: 1.1rem; display: flex; gap: 30px; font-weight: 600; color: #ffcc00; }
        .genres { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 25px; }
        .genres span { background: rgba(255,255,255,0.1); padding: 6px 18px; border-radius: 30px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.2); }
        .overview { line-height: 1.8; color: #ddd; font-size: 1.15rem; max-width: 900px; }

        .player-section { margin-top: 60px; text-align: center; border-top: 1px solid #222; padding-top: 50px; }
        .watch-now-title { color: #e50914; margin-bottom: 30px; font-size: 2rem; font-weight: bold; letter-spacing: 3px; }
        .iframe-container { 
          position: relative; 
          padding-bottom: 56.25%; 
          height: 0; 
          background: #000; 
          border-radius: 16px; 
          overflow: hidden; 
          box-shadow: 0 0 50px rgba(229, 9, 20, 0.2); 
        }
        .iframe-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .credit { margin-top: 30px; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 4px; }

        @media (max-width: 900px) {
          .movie-header { flex-direction: column; align-items: center; text-align: center; margin-top: -120px; gap: 30px; }
          .poster-box img { width: 220px; }
          .title { font-size: 2.2rem; }
          .meta { justify-content: center; font-size: 1rem; }
          .genres { justify-content: center; }
          .content-container { margin-top: -150px; }
          .overview { font-size: 1rem; }
          .iframe-container { border-radius: 0; margin: 0 -20px; } /* Утас дээр дэлгэц дүүргэнэ */
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

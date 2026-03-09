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
    <div className="details-container">
      {/* Background Banner */}
      <div
        className="movie-banner-container"
        style={{
          background: currentMovie.backdrop_path 
            ? `url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')` 
            : "#1a1a1a",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
                Rating: <i className="rating-star fa-solid fa-star"></i> {currentMovie.vote_average ? Math.round(currentMovie.vote_average * 10) / 10 : 0}
              </span>
              <span className="movie-release">Release: {currentMovie.release_date}</span>
            </div>
            <div className="movie-genres">
              {currentMovie.genres &&
                currentMovie.genres.slice(0, 4).map((data) => (
                  <span key={data.id}>{data.name}</span>
                ))}
            </div>
            <p className="movie-description">{currentMovie.overview || "No description available."}</p>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER SECTION (Mobile Responsive) */}
      <div className="video-section">
        <h2 className="player-title">WATCH MOVIE 🍿</h2>
        <div className="iframe-wrapper">
          <iframe 
            src={id === "1265609" 
              ? "https://vidoza.net/embed-mw4fnlbhv8zg.html" 
              : `https://vidsrc.to/embed/movie/${id}`} 
            frameBorder="0" 
            allowFullScreen
            title="Movie Player"
            referrerPolicy="origin"
            sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            allow="autoplay; encrypted-media; fullscreen"
          ></iframe>
        </div>
        <p className="dev-credit">Server Developer by: Awesome.!</p>
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        .movie-banner-container {
          height: 450px;
        }

        .movie-details-container {
          display: flex;
          max-width: 1200px;
          margin: -150px auto 0;
          padding: 20px;
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        .movie-detail-left img {
          width: 300px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* MOBILE OPTIMIZATION (Screens smaller than 768px) */
        @media (max-width: 768px) {
          .movie-banner-container {
            height: 250px;
          }
          .movie-details-container {
            flex-direction: column;
            align-items: center;
            margin-top: -100px;
            text-align: center;
          }
          .movie-detail-left img {
            width: 200px;
          }
          .movie-title {
            font-size: 1.8rem;
          }
          .movie-genres {
            justify-content: center;
          }
          .video-section {
            padding: 10px;
          }
          .player-title {
            font-size: 1.5rem;
          }
        }

        .video-section {
          max-width: 1100px;
          margin: 50px auto;
          text-align: center;
        }
        .iframe-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
        }
        .iframe-wrapper iframe {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
        }
        .dev-credit {
          margin-top: 20px;
          font-size: 0.8rem;
          color: #555;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

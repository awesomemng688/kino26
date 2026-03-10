import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});
  const [server, setServer] = useState("server1");

  const getMovieDetail = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentMovie(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }, []);

  useEffect(() => {
    const API_KEY = "31d6a9af8af968f358a6c5cc9f67daaf";
    const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=mn-MN`;
    getMovieDetail(MOVIE_DETAIL_API);
    window.scrollTo(0, 0);
  }, [id, getMovieDetail]);

  // Энд бид хамгийн тогтвортой серверүүдийг өөр өөр бүтцээр оруулав
  const servers = {
    server1: `https://vidsrc.me/embed/movie?tmdb=${id}`, // TMDB ID-аар хайх
    server2: `https://vidsrc.xyz/embed/movie?tmdb=${id}`, // Alternative XYZ
    server3: `https://player.autoembed.cc/embed/movie/${id}`, // Direct ID
    server4: `https://www.2embed.cc/embed/${id}` // Old stable embed
  };

  return (
    <div className="details-page-wrapper">
      <div 
        className="banner-section" 
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), 
          url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || ""}')`
        }}
      ></div>

      <div className="content-container">
        <div className="movie-header">
          <div className="poster-box">
            {currentMovie.poster_path && (
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="poster" />
            )}
          </div>
          <div className="info-box">
            <h1 className="title">{currentMovie.title || currentMovie.original_title}</h1>
            <div className="meta">
              <span>⭐ {currentMovie.vote_average?.toFixed(1)}</span>
              <span>📅 {currentMovie.release_date}</span>
            </div>
            <div className="genres">
              {currentMovie.genres?.map(g => <span key={g.id}>{g.name}</span>)}
            </div>
            <p className="overview">{currentMovie.overview || "Тайлбар одоогоор алга."}</p>
          </div>
        </div>

        <div className="player-section">
          <h2 className="watch-now-title">КИНО ҮЗЭХ 🍿</h2>
          
          {/* Сервер сонгох хэсэг - Хэрэв Media Unavailable гэвэл солиорой */}
          <div className="server-selector">
            <p>Хэрэв кино гарахгүй бол сервер сольж үзнэ үү:</p>
            <div className="btn-group">
                {Object.keys(servers).map((s, index) => (
                    <button 
                        key={s} 
                        className={server === s ? "active" : ""} 
                        onClick={() => setServer(s)}
                    >
                        Server {index + 1}
                    </button>
                ))}
            </div>
          </div>

          <div className="iframe-container">
            <iframe 
              title="Movie Player"
              src={servers[server]} 
              frameBorder="0" 
              allowFullScreen={true}
              allow="autoplay; encrypted-media; fullscreen"
              sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation allow-fullscreen"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
          <p className="credit">Server Developer by: Awesome.!</p>
        </div>
      </div>

      <style>{`
        .details-page-wrapper { background: #000; min-height: 100vh; color: #fff; }
        .banner-section { height: 60vh; background-size: cover; background-position: center; }
        .content-container { max-width: 1100px; margin: -180px auto 0; padding: 0 20px 80px; position: relative; z-index: 10; }
        .movie-header { display: flex; gap: 40px; margin-bottom: 50px; }
        .poster-box img { width: 280px; border-radius: 12px; box-shadow: 0 0 30px #000; }
        .info-box { flex: 1; text-align: left; }
        .title { font-size: 3rem; margin-bottom: 10px; }
        .meta { display: flex; gap: 20px; color: #ffcc00; margin-bottom: 20px; font-weight: bold; }
        .genres { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .genres span { background: #e50914; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
        .overview { color: #ddd; line-height: 1.6; font-size: 1.05rem; }

        .server-selector { margin-bottom: 25px; text-align: center; }
        .server-selector p { font-size: 0.9rem; color: #888; margin-bottom: 10px; }
        .btn-group { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .server-selector button { 
          background: #1a1a1a; border: 1px solid #333; color: white; padding: 10px 20px; 
          border-radius: 5px; cursor: pointer; transition: 0.2s; font-weight: bold;
        }
        .server-selector button.active { background: #e50914; border-color: #e50914; }
        .server-selector button:hover { background: #333; }

        .player-section { margin-top: 40px; padding-top: 40px; border-top: 1px solid #222; }
        .watch-now-title { margin-bottom: 20px; color: #e50914; letter-spacing: 2px; }
        .iframe-container { position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 8px; overflow: hidden; border: 2px solid #222; }
        .iframe-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .credit { margin-top: 30px; font-size: 0.7rem; color: #444; text-transform: uppercase; letter-spacing: 3px; }

        @media (max-width: 850px) {
          .movie-header { flex-direction: column; align-items: center; text-align: center; margin-top: -120px; }
          .poster-box img { width: 180px; }
          .title { font-size: 1.8rem; }
          .content-container { margin-top: -100px; }
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

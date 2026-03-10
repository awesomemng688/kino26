import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});
  // Сервер сонгох state (Хэрэв vidsrc ажиллахгүй бол өөрийг ашиглана)
  const [server, setServer] = useState("vidsrc_xyz");

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

  // Серверүүдийн жагсаалт
  const servers = {
    vidsrc_xyz: `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
    vidsrc_me: `https://vidsrc.me/embed/movie?tmdb=${id}`,
    autoembed: `https://player.autoembed.cc/embed/movie/${id}`
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
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt={currentMovie.title} />
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

        {/* ТОГЛУУЛАГЧ ХЭСЭГ */}
        <div className="player-section">
          <h2 className="watch-now-title">КИНО ҮЗЭХ 🍿</h2>
          
          {/* Сервер сонгох товчнууд - Хэрэв кино гарахгүй бол сольж үзнэ */}
          <div className="server-selector">
            <button className={server === "vidsrc_xyz" ? "active" : ""} onClick={() => setServer("vidsrc_xyz")}>Server 1</button>
            <button className={server === "vidsrc_me" ? "active" : ""} onClick={() => setServer("vidsrc_me")}>Server 2</button>
            <button className={server === "autoembed" ? "active" : ""} onClick={() => setServer("autoembed")}>Server 3</button>
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
        .content-container { max-width: 1200px; margin: -200px auto 0; padding: 0 20px 80px; position: relative; z-index: 10; }
        .movie-header { display: flex; gap: 40px; margin-bottom: 50px; }
        .poster-box img { width: 300px; border-radius: 16px; box-shadow: 0 10px 30px #000; }
        .info-box { flex: 1; text-align: left; }
        .title { font-size: 3.5rem; margin-bottom: 15px; }
        .meta { display: flex; gap: 20px; color: #ffcc00; font-weight: bold; margin-bottom: 20px; }
        .genres { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
        .genres span { background: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; }
        .overview { color: #ccc; line-height: 1.6; }

        /* Server Buttons */
        .server-selector { margin-bottom: 20px; display: flex; justify-content: center; gap: 10px; }
        .server-selector button { 
          background: #222; border: 1px solid #444; color: white; padding: 8px 20px; 
          border-radius: 5px; cursor: pointer; transition: 0.3s;
        }
        .server-selector button.active { background: #e50914; border-color: #e50914; }

        .player-section { margin-top: 50px; text-align: center; }
        .iframe-container { position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 12px; overflow: hidden; }
        .iframe-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .credit { margin-top: 20px; font-size: 0.8rem; color: #444; letter-spacing: 2px; }

        @media (max-width: 850px) {
          .movie-header { flex-direction: column; align-items: center; text-align: center; margin-top: -100px; }
          .poster-box img { width: 200px; }
          .title { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;

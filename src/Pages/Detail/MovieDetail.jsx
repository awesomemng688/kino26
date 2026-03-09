import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});

  // language=mn-MN болгож өөрчлөв
  const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN`;

  const getMovieDetail = useCallback(async (url) => {
    try {
      const movieDetail = await fetch(url);
      const allDetail = await movieDetail.json();
      setCurrentMovie(allDetail);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMovieDetail(MOVIE_DETAIL_API);
    window.scrollTo(0, 0);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  return (
    <div className="details-container">
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
                Үнэлгээ: <i className="rating-star fa-solid fa-star"></i> {currentMovie.vote_average ? Math.round(currentMovie.vote_average * 10) / 10 : 0}
              </span>
              <span className="movie-release">Нээлт: {currentMovie.release_date}</span>
            </div>
            <div className="movie-genres">
              {currentMovie.genres &&
                currentMovie.genres.slice(0, 4).map((data) => {
                  return <span key={data.id}>{data.name}</span>;
                })}
            </div>
            {/* Киноны тайлбар хэсэг */}
            <p className="movie-description">{currentMovie.overview || "Тайлбар одоогоор алга байна."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

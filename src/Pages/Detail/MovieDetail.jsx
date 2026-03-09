import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moviedetail.scss";

const MovieDetail = () => {
  const { category, id } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});

  const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=en-US&page=1`;

  async function getMovieDetail(url) {
    try {
      const movieDetail = await fetch(url);
      const allDetail = await movieDetail.json();
      setCurrentMovie(allDetail);
      console.log(currentMovie);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovieDetail(MOVIE_DETAIL_API);
    window.scrollTo(0, 0);
  }, [category, id]);

  return (
    <div className="details-container">
      <div
        className="movie-banner-container"
        style={{
          background: `url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`,
        }}
      ></div>
      <div className="movie-details-container">
        <div className="movie-detail-left">
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
            alt="img"
          />
        </div>
        <div className="movie-detail-right">
          <div className="title-category-para">
            <h1 className="movie-title">{currentMovie.original_title}</h1>
            <div className="movie-rating-release">
              <span className="movie-rating">Rating: <i className="rating-star fa-solid fa-star"></i> {Math.round(currentMovie.vote_average * 10)/10}</span>
              <span className="movie-release">Release: {currentMovie.release_date}</span>
            </div>
            <div className="movie-genres">
              {currentMovie.genres &&
                currentMovie.genres.slice(0, 4).map((data) => {
                  return <span>{data.name}</span>;
                })}
            </div>
            <p className="movie-description">{currentMovie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

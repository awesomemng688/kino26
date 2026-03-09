import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {

    const [data, setData] = useState([]);

    // API хэлийг монгол (mn-MN) болгож өөрчлөв
    const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1";

    const category = "now_playing";

    async function getData(url){
        try{
            const res = await fetch(url);
            const allData = await res.json();
            setData(allData.results);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData(API_URL);
        window.scrollTo(0, 0);
    }, [])

    const cards = data.map((movieData) => {
        return <Card
            key={movieData.id}
            id={movieData.id}
            poster={movieData.poster_path}
            title={movieData.original_title}
            rating={movieData.vote_average}
            release={movieData.release_date}
            />
    })

    return (
        <>
            <Carousel 
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    data && data.slice(0, 5).map(movieData => {
                        return(
                            <div className="carousel-container" key={movieData.id}>
                                <div className="carousel">
                                    <img src={`https://image.tmdb.org/t/p/original${movieData && movieData.backdrop_path}`} alt="Movie Banner" />
                                    <div className="movie-details">
                                        <div className="details-container">
                                            <h2 className="movie-title">{movieData ? movieData.original_title : ""}</h2>
                                            {/* Тайлбарыг монголоор харуулна */}
                                            <p className="movie-description">{movieData ? movieData.overview : ""}</p>
                                            <div className="action-btn">
                                                {/* Товчлуурыг монгол болгов */}
                                                <Link to={`/${category}/${movieData.id}`} className="btn watch-now">Үзэх</Link>
                                                <Link to={`/${category}/${movieData.id}`} className="btn watch-trailer">Трэйлер</Link>
                                            </div>
                                        </div>
                                        <div className="poster-container">
                                            <img src={`https://image.tmdb.org/t/p/original${movieData && movieData.poster_path}`} alt="Movie Poster" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </Carousel>
            {/* Гарчгийг монгол болгов */}
            <h1 className="sub-heading">ОДОО ГАРЧ БУЙ КИНОНУУД</h1>
            <div className="container">
                <br />
                <br />
                {cards}
            </div>
        </>
    )
}

export default Home;

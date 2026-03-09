import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    // Хэрэв true бол сайтыг "Тун удахгүй" горимд оруулна
    const isMaintenance = true; 

    const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1";
    const category = "now_playing";

    async function getData(url){
        try{
            const res = await fetch(url);
            const allData = await res.json();
            // Засвартай үед датаг хоосон болгох
            setData(isMaintenance ? [] : allData.results);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData(API_URL);
        window.scrollTo(0, 0);
    }, [])

    const cards = data && data.map((movieData) => {
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
            {isMaintenance ? (
                /* ТУН УДАХГҮЙ ХЭСЭГ */
                <div className="maintenance-hero">
                    <div className="maintenance-content">
                        <h1 className="main-title">AVENGERS MOVIE</h1>
                        <div className="divider"></div>
                        <h2 className="status-text">ТУН УДАХГҮЙ...</h2>
                        <p className="description">
                            Бид вэб сайтаа шинэчилж байна. Илүү олон сонирхолтой кино, 
                            хурдан тоглуулагчтайгаар эргэн ирэх болно.
                        </p>
                        <p className="developer-tag">Server Developer by: Awesome.!</p>
                    </div>
                </div>
            ) : (
                /* ХЭВИЙН ҮЕИЙН CAROUSEL */
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
                                                <p className="movie-description">{movieData ? movieData.overview : ""}</p>
                                                <div className="action-btn">
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
            )}

            {!isMaintenance && (
                <>
                    <h1 className="sub-heading">ОДОО ГАРЧ БУЙ КИНОНУУД</h1>
                    <div className="container">
                        <br /><br />
                        {cards}
                    </div>
                </>
            )}

            {/* CSS Загвар */}
            <style>{`
                .maintenance-hero {
                    height: 80vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://image.tmdb.org/t/p/original/mDfBhS3erZjuZAn6Q8oqH9o9GZ6.jpg');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
                .main-title {
                    font-size: 4rem;
                    font-weight: 900;
                    letter-spacing: -2px;
                    margin-bottom: 0;
                }
                .divider {
                    height: 4px;
                    width: 80px;
                    background: #e50914;
                    margin: 20px auto;
                }
                .status-text {
                    font-size: 2rem;
                    color: #e50914;
                    font-weight: bold;
                }
                .description {
                    max-width: 600px;
                    margin: 20px auto;
                    font-size: 1.2rem;
                    color: #ccc;
                }
                .developer-tag {
                    margin-top: 40px;
                    font-size: 0.8rem;
                    letter-spacing: 3px;
                    color: #666;
                    text-transform: uppercase;
                }
                @media (max-width: 768px) {
                    .main-title { font-size: 2.5rem; }
                    .status-text { font-size: 1.5rem; }
                }
            `}</style>
        </>
    )
}

export default Home;

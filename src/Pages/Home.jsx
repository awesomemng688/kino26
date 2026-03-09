import React, { useEffect, useState, useCallback } from "react";
import Card from "../Components/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    // false болгож сайтаа нээнэ
    const isMaintenance = false; 

    const category = "now_playing";

    const getData = useCallback(async () => {
        if (isMaintenance) return; // Maintenance үед fetch хийхгүй

        const API_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1";
        
        try {
            const res = await fetch(API_URL);
            const allData = await res.json();
            setData(allData.results || []);
        } catch (error) {
            console.log("Error fetching home data:", error);
        }
    }, [isMaintenance]);

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData]);

    return (
        <>
            {isMaintenance ? (
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
                <>
                    <Carousel 
                        showThumbs={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showStatus={false}
                        interval={5000} // Слайд солигдох хугацаа 5 сек
                    >
                        {data.slice(0, 6).map(movieData => (
                            <div className="carousel-container" key={movieData.id}>
                                <div className="carousel">
                                    <img src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} alt="Banner" />
                                    <div className="movie-details">
                                        <div className="details-container">
                                            <h2 className="movie-title">{movieData.original_title}</h2>
                                            <p className="movie-description">{movieData.overview || "Тайлбар одоогоор алга."}</p>
                                            <div className="action-btn">
                                                <Link to={`/movie/${movieData.id}`} className="btn watch-now">Үзэх</Link>
                                                <Link to={`/movie/${movieData.id}`} className="btn watch-trailer">Трэйлер</Link>
                                            </div>
                                        </div>
                                        <div className="poster-container">
                                            <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt="Poster" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>

                    <h1 className="sub-heading">ОДОО ГАРЧ БУЙ КИНОНУУД</h1>
                    <div className="container">
                        {data.map((movieData) => (
                            <Card
                                key={movieData.id}
                                id={movieData.id}
                                poster={movieData.poster_path}
                                title={movieData.original_title}
                                rating={movieData.vote_average}
                                release={movieData.release_date}
                            />
                        ))}
                    </div>
                </>
            )}
            {/* Таны өмнөх <style> хэсэг хэвээрээ байна */}
        </>
    );
}

export default Home;

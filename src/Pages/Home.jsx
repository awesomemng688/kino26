import React, { useEffect, useState, useCallback } from "react";
import Card from "../Components/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const isMaintenance = false;

    const getData = useCallback(async () => {
        if (isMaintenance) return;
        
        const API_KEY = "31d6a9af8af968f358a6c5cc9f67daaf";
        const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=mn-MN&page=1`;
        
        try {
            const res = await fetch(API_URL);
            const allData = await res.json();
            setData(allData.results || []);
        } catch (error) {
            console.error("Data fetch error:", error);
        }
    }, [isMaintenance]);

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [getData]);

    return (
        <div style={{ background: "#000", minHeight: "100vh" }}>
            {isMaintenance ? (
                <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    <h1>ЗАСВАРТАЙ БАЙНА</h1>
                </div>
            ) : (
                <>
                    <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} interval={5000}>
                        {data.slice(0, 5).map(movieData => (
                            <div key={movieData.id} className="carousel-container">
                                <img src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} alt="Banner" style={{ opacity: 0.6 }} />
                                <div className="movie-details" style={{ position: "absolute", bottom: "10%", left: "5%", textAlign: "left", color: "white" }}>
                                    <h2 style={{ fontSize: "3rem" }}>{movieData.original_title}</h2>
                                    <div style={{ marginTop: "20px" }}>
                                        <Link to={`/movie/${movieData.id}`} className="btn watch-now" style={{ padding: "10px 25px", background: "#e50914", color: "white", textDecoration: "none", borderRadius: "5px", marginRight: "10px" }}>Үзэх</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>

                    <h1 style={{ color: "#e50914", textAlign: "center", margin: "40px 0", fontSize: "2rem" }}>ОДОО ГАРЧ БУЙ КИНОНУУД</h1>
                    
                    <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
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
        </div>
    );
};

export default Home;

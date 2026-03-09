import React, { useEffect, useState, useCallback } from "react";
import Card from "../Components/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        const API_KEY = "31d6a9af8af968f358a6c5cc9f67daaf";
        const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=mn-MN&page=1`;
        
        try {
            const res = await fetch(API_URL);
            const allData = await res.json();
            setData(allData.results || []);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, []);

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [getData]);

    return (
        <div style={{ background: "#000", minHeight: "100vh", color: "white" }}>
            <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} interval={5000}>
                {data.slice(0, 5).map(movieData => (
                    <div key={movieData.id} style={{ position: "relative" }}>
                        <img 
                            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} 
                            alt={movieData.original_title} 
                            style={{ opacity: 0.5, maxHeight: "600px", objectFit: "cover" }} 
                        />
                        <div style={{ position: "absolute", bottom: "10%", left: "5%", textAlign: "left" }}>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{movieData.original_title}</h2>
                            <Link 
                                to={`/movie/${movieData.id}`} 
                                style={{ padding: "10px 30px", background: "#e50914", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}
                            >
                                ҮЗЭХ
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>

            <h1 style={{ color: "#e50914", textAlign: "center", margin: "40px 0", fontSize: "1.8rem", textTransform: "uppercase" }}>
                Одоо гарч буй кинонууд
            </h1>
            
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "25px", padding: "0 20px 50px" }}>
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
        </div>
    );
};

export default Home;

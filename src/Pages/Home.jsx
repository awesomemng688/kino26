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
        <div className="home-container" style={{ background: "#000", minHeight: "100vh", color: "white" }}>
            {/* Banner Carousel */}
            <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false} interval={5000}>
                {data.slice(0, 5).map(movieData => (
                    <div key={movieData.id} className="carousel-slide" style={{ position: "relative" }}>
                        <img 
                            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`} 
                            alt={movieData.original_title} 
                            style={{ opacity: 0.5, maxHeight: "600px", objectFit: "cover" }} 
                        />
                        <div className="carousel-text" style={{ position: "absolute", bottom: "15%", left: "5%", textAlign: "left", width: "90%" }}>
                            <h2 className="banner-title" style={{ fontSize: "2.5rem", marginBottom: "20px" }}>{movieData.original_title}</h2>
                            <Link 
                                to={`/movie/${movieData.id}`} 
                                className="watch-btn"
                                style={{ padding: "10px 30px", background: "#e50914", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}
                            >
                                ҮЗЭХ
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>

            <h1 className="section-title" style={{ color: "#e50914", textAlign: "center", margin: "40px 0", fontSize: "1.8rem", textTransform: "uppercase" }}>
                Одоо гарч буй кинонууд
            </h1>
            
            {/* Movie Grid List */}
            <div className="movie-grid" style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "center", 
                gap: "25px", 
                padding: "0 20px 50px" 
            }}>
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

            {/* RESPONSIVE CSS */}
            <style>{`
                /* Гар утасны тохиргоо (768px-ээс бага дэлгэцэнд) */
                @media (max-width: 768px) {
                    .banner-title {
                        font-size: 1.5rem !important; /* Гарчиг жижигсэх */
                        margin-bottom: 10px !important;
                    }
                    .watch-btn {
                        padding: 8px 20px !important;
                        font-size: 0.8rem;
                    }
                    .section-title {
                        font-size: 1.3rem !important;
                        margin: 20px 0 !important;
                    }
                    .movie-grid {
                        gap: 15px !important; /* Кинонуудын хоорондох зай багасах */
                        padding: 0 10px 30px !important;
                        display: grid !important; /* Flex-ийг Grid болгох */
                        grid-template-columns: repeat(2, 1fr); /* 2 эгнээ болгох */
                    }
                }

                /* Маш жижиг дэлгэцэнд (iPhone SE гэх мэт) */
                @media (max-width: 480px) {
                    .movie-grid {
                        grid-template-columns: repeat(2, 1fr); /* Хэвээрээ 2 эгнээ, гэхдээ зайг нь улам багасгаж болно */
                        gap: 10px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;

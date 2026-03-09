import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const { category } = useParams();
    const [movie, setMovie] = useState([]);
    // Түр хугацаанд киног хаах тохиргоо (true байвал Coming Soon харагдана)
    const isMaintenance = true; 

    const getCategoryName = (cat) => {
        switch(cat) {
            case "popular": return "Алдартай";
            case "top_rated": return "Өндөр үнэлгээтэй";
            case "upcoming": return "Төд удахгүй";
            case "now_playing": return "Одоо гарч буй";
            default: return "Алдартай";
        }
    }

    useEffect(() => {
        // Build алдаанаас сэргийлж API URL-ыг дотор нь зарлав
        const MOVIE_API = `https://api.themoviedb.org/3/movie/${category ? category : "popular"}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1`;

        async function getMovie(url){
            try{
                const movieData = await fetch(url);
                const allMovieData = await movieData.json();
                
                // Хэрэв засвартай байгаа бол датаг хоосон онооно
                setMovie(isMaintenance ? [] : allMovieData.results);
                window.scrollTo(0,0);
            }
            catch(error){
                console.log("Error fetching movies:", error);
            }
        }

        getMovie(MOVIE_API);
        
        // Cloudflare Build гацахаас сэргийлэх чухал мөр:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, isMaintenance]);

    const movieCard = movie && movie.length > 0 ? movie.map((prevData) => {
        return <Card
                key={prevData.id}
                id={prevData.id}
                poster={prevData.poster_path}
                title={prevData.original_title}
                rating={prevData.vote_average}
                release={prevData.release_date}
                />
    }) : null;
    
    return(
        <>
            <h1 className="sub-heading">{getCategoryName(category).toUpperCase()} КИНОНУУД</h1>
            <div className="container">
                {movie.length > 0 ? (
                    movieCard
                ) : (
                    <div className="coming-soon-wrapper">
                        <div className="coming-soon-content">
                            <h2>ТУН УДАХГҮЙ... 🍿</h2>
                            <p>Бид бүх киноны сангаа шинэчилж байна. Awesome.! баг ажиллаж байна.</p>
                            <div className="loader-bar"></div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .coming-soon-wrapper {
                    width: 100%;
                    min-height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: white;
                    background: rgba(20, 20, 20, 0.8);
                    border: 1px solid #333;
                    border-radius: 15px;
                    margin: 20px 0;
                    padding: 40px;
                }
                .coming-soon-content h2 {
                    font-size: 3rem;
                    color: #e50914;
                    margin-bottom: 15px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }
                .coming-soon-content p {
                    font-size: 1.2rem;
                    color: #bbb;
                }
                .loader-bar {
                    height: 4px;
                    width: 150px;
                    background: #e50914;
                    margin: 30px auto;
                    border-radius: 10px;
                    box-shadow: 0 0 10px #e50914;
                    animation: pulse 1.5s infinite ease-in-out;
                }
                @keyframes pulse {
                    0% { opacity: 0.3; width: 80px; }
                    50% { opacity: 1; width: 200px; }
                    100% { opacity: 0.3; width: 80px; }
                }
                @media (max-width: 768px) {
                    .coming-soon-content h2 { font-size: 2rem; }
                }
            `}</style>
        </>
    )
}

export default MovieList;

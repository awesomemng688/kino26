import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const { category } = useParams();
    const [movie, setMovie] = useState([]);
    // Түр хугацаанд киног хаах тохиргоо
    const isMaintenance = true; 

    const MOVIE_API = `https://api.themoviedb.org/3/movie/${category ? category : "popular"}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1`;

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
        async function getMovie(url){
            try{
                const movieData = await fetch(url);
                const allMovieData = await movieData.json();
                // Хэрэв засвартай байгаа бол датаг хоосон онооно
                setMovie(isMaintenance ? [] : allMovieData.results);
                window.scrollTo(0,0);
            }
            catch(error){
                console.log(error);
            }
        }
        getMovie(MOVIE_API);
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

            {/* CSS загвар - Үүнийг App.css эсвэл тусдаа файлд хийж болно */}
            <style>{`
                .coming-soon-wrapper {
                    width: 100%;
                    min-height: 300px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: white;
                    background: rgba(0,0,0,0.5);
                    border-radius: 15px;
                    margin: 20px 0;
                }
                .coming-soon-content h2 {
                    font-size: 2.5rem;
                    color: #e50914;
                    margin-bottom: 10px;
                }
                .loader-bar {
                    height: 4px;
                    width: 100px;
                    background: #e50914;
                    margin: 20px auto;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0% { opacity: 0.3; width: 50px; }
                    50% { opacity: 1; width: 150px; }
                    100% { opacity: 0.3; width: 50px; }
                }
            `}</style>
        </>
    )
}

export default MovieList;

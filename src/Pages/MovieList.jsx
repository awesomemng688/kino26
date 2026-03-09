import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    
    const {category} = useParams();
    const [movie, setMovie] = useState([]);

    // API URL дээр language=mn-MN нэмж, киноны тайлбарыг монголоор татахыг оролдоно
    const MOVIE_API = `https://api.themoviedb.org/3/movie/${category ? category : "popular"}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=mn-MN&page=1`;

    // Категорийн нэрийг монгол болгох функц
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
                setMovie(allMovieData.results);
                window.scrollTo(0,0);
            }
            catch(error){
                console.log(error);
            }
        }

        getMovie(MOVIE_API);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const movieCard = movie && movie.map((prevData) => {
        return <Card
                key={prevData.id}
                id={prevData.id}
                poster={prevData.poster_path}
                title={prevData.original_title}
                rating={prevData.vote_average}
                release={prevData.release_date}
                />
    })
    
    return(
        <>
            {/* Гарчиг болон текстийг монгол болгов */}
            <h1 className="sub-heading">{getCategoryName(category).toUpperCase()} КИНОНУУД</h1>
            <div className="container">
                {movieCard}
            </div>
        </>
    )
}

export default MovieList;

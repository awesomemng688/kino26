import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    
    const {category} = useParams();
    const [movie, setMovie] = useState([]);

    const MOVIE_API = `https://api.themoviedb.org/3/movie/${category? category: "popular"}?api_key=31d6a9af8af968f358a6c5cc9f67daaf&language=en-US&page=1`;

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

    useEffect(() => {
        
        getMovie(MOVIE_API);

    }, [category])

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
            <h1 className="sub-heading">{(category? category: "Popular").toUpperCase()} MOVIES</h1>
            <div className="container">
                {movieCard}
            </div>
        </>
    )
}

export default MovieList;
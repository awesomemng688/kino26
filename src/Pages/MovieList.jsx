import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const { category } = useParams();
    const [movie, setMovie] = useState([]);
    
    // Засварын горим
    const isMaintenance = false; 

    useEffect(() => {
        const warMachineData = [
            {
                id: "war-machine-2026", 
                poster_path: "/placeholder-war-machine-poster.jpg", 
                original_title: "War Machine (2026)",
                vote_average: 9.5,
                release_date: "2026-05-04"
            }
        ];

        if (!isMaintenance) {
            setMovie(warMachineData);
        } else {
            setMovie([]);
        }
        
        window.scrollTo(0, 0);
    }, [category, isMaintenance]);

    return (
        <div style={{ minHeight: "80vh", background: "#000", color: "#fff", paddingTop: "40px" }}>
            <h1 style={{ textAlign: "center", color: "#e50914", fontSize: "2.5rem" }}>
                ОНЦЛОХ КИНО: WAR MACHINE 2026
            </h1>
            <div style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}>
                {movie.length > 0 ? (
                    movie.map((prevData) => (
                        <Card
                            key={prevData.id}
                            id={prevData.id}
                            poster={prevData.poster_path}
                            title={prevData.original_title}
                            rating={prevData.vote_average}
                            release={prevData.release_date}
                        />
                    ))
                ) : (
                    <div style={{ textAlign: "center", padding: "100px" }}>
                        <h2>УУРХАЙД ЗАСВАРТАЙ БАЙНА...</h2>
                        <p>Awesome.! хөгжүүлэгч ажиллаж байна.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieList;

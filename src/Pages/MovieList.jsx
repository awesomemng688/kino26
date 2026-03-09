import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const { category } = useParams();
    const [movie, setMovie] = useState([]);
    
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

    // Build алдаанаас сэргийлж Style-ийг Object хэлбэрээр зарлав
    const styles = {
        page: {
            minHeight: "80vh",
            background: "#000",
            color: "white",
            paddingTop: "40px"
        },
        heading: {
            textAlign: "center",
            color: "#e50914",
            fontSize: "2.5rem",
            textShadow: "0 0 15px rgba(229, 9, 20, 0.4)",
            textTransform: "uppercase"
        },
        container: {
            display: "flex",
            justifyContent: "center",
            padding: "50px 0",
            minHeight: "60vh"
        }
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>ОНЦЛОХ КИНО: WAR MACHINE 2026</h1>
            <div style={styles.container}>
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

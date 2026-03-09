import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    const { category } = useParams();
    const [movie, setMovie] = useState([]);
    
    // Засварын горимыг унтрааж, зөвхөн War Machine-ыг харуулна
    const isMaintenance = false; 

    useEffect(() => {
        // War Machine 2026 киноны мэдээллийг гараар (Manual) оноож байна
        const warMachineData = [
            {
                id: "war-machine-2026", // Тусгай ID
                poster_path: "/placeholder-war-machine-poster.jpg", // TMDB дээрх постерын зам
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
    }, [category]);

    return (
        <>
            <h1 className="sub-heading">ОНЦЛОХ КИНО: WAR MACHINE 2026</h1>
            <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
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
                    <div className="coming-soon-wrapper">
                        <h2>УУРХАЙД ЗАСВАРТАЙ БАЙНА...</h2>
                        <p>Awesome.! хөгжүүлэгч ажиллаж байна.</p>
                    </div>
                )}
            </div>

            <style>{`
                .container {
                    min-height: 60vh;
                }
                .sub-heading {
                    text-align: center

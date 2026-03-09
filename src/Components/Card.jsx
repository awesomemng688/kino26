import { Link, useParams } from "react-router-dom";

const Card = (props) => {

    const { category } = useParams();
    
    return (
        <>
        <Link className="card" to={`/${category ? category : "now_playing"}/${props.id}`} >
            <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt="img" />
            <div className="rating">
                <i className="fa-solid fa-star"></i> {props.rating}
                {/* Release -> Нээлт болгож өөрчлөв */}
                <span>Нээлт:<br/>{props.release}</span>
                <br />
                <p className="title">{props.title}</p>
            </div>
            <div className="watch-trailer">
                {/* Watch Options -> Үзэх сонголтууд болгож өөрчлөв */}
                <button className="watch">
                    <i className="fas fa-video"></i> Үзэх сонголтууд
                </button>
                {/* Trailer -> Трэйлер болгож өөрчлөв */}
                <button className="trailer">
                    <i className="fa fa-play" aria-hidden="true"></i> Трэйлер
                </button>
             </div>
        </Link>
        </>
    )
}

export default Card;

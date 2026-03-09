import { Link, useParams } from "react-router-dom";

const Card = (props) => {

    const { category } = useParams();
    
    return (
        <>
        <Link className="card" to={`/${category? category : "now_playing"}/${props.id}`} >
            <img src={`https://image.tmdb.org/t/p/original${props.poster}`} alt="img" />
            <div className="rating">
                <i className="fa-solid fa-star"></i> {props.rating}
                <span>Release:<br/>{props.release}</span>
                <br />
                <p className="title">{props.title}</p>
            </div>
            <div className="watch-trailer">
                <button className="watch">
                    <i className="fas fa-video"></i> Watch Options
                </button>
                <button className="trailer">
                    <i className="fa fa-play" aria-hidden="true"></i> Trailer
                </button>
             </div>
        </Link>
        </>
    )
}

export default Card;
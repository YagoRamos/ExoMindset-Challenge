import Modal from '../UI/Modal';
import classes from './ShowDetails.module.css';
import parse from "html-react-parser";

const ShowDetails = (props) => {
    return (
        <Modal onClose={props.onCloseModal}>
            <h1>{props.showData.title}</h1>
            <div className={classes.cardcontainer}>
                <div className={classes.floatlayout}>
                    <div className={classes.cardimage}>
                        <img src={props.showData.originalImage} />
                        {!props.showData.thumbnail && <div className={classes.cardimagenotfound}>Image not found</div>}
                        <div className={classes.textcard}>
                            <div className={classes.cardattributes}>Premiered: {props.showData.premiered} {!props.showData.premiered && "N/A"}</div>
                            <div className={classes.cardattributes}>Rating: {props.showData.rating} {!props.showData.rating && "N/A"}</div>
                            <div className={classes.cardattributes}>Status: {props.showData.status} {!props.showData.status && "N/A"}</div>
                            {props.showData.genres.map((genre)=>{<div className={classes.cardattributes}>{genre}</div> })}
                            <div className={classes.genres}>Genres: {props.showData.genres.map((genre)=>{return <div className={classes.cardattributes}>{genre}</div> })}</div>
                            <div className={classes.carddesc}>
                                {props.showData.description && parse(props.showData.description)}
                                <div>{props.showData.description == null && "No description found for this show."}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseModal}>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ShowDetails;

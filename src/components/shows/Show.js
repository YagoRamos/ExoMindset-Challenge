import React from 'react';
import parse from "html-react-parser";
import classes from './Show.module.css';

const Show = (props) => {
    return (
        <li className={classes.show} id={props.id}>
            <div className={classes.cardcontainer}>
                <div className={classes.floatlayout}>
                    <div className={classes.cardimage}>
                        <img src={props.thumbnail} />
                        {!props.thumbnail && <div className={classes.cardimagenotfound}>Image not found</div>}
                        <div className={classes.textcard}>
                            <div className={classes.cardtitle}>{props.title}</div>
                            <div className={classes.carddesc}>
                                {props.description && parse(props.description)}
                                <div>{props.description == null && "No description found for this show."}</div>
                            </div>
                            <button onClick={() => props.onModalOpen(props.id)}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Show;
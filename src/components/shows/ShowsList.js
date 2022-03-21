import React from 'react';

import Show from './Show';
import classes from './ShowsList.module.css';

const ShowsList = (props) => {
  return (
    <ul className={classes['shows-list']}>
      {props.shows.map((show, i) => (
        <Show
          title={show.title}
          premiered={show.premiered}
          description={show.description}
          id={show.id}
          thumbnail={show.thumbnail}
          onModalOpen={props.onModalOpen}
        />
      ))}
    </ul>
  );
};

export default ShowsList;

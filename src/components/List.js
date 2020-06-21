import React from 'react';
import '../styles/ListStyles.css';
import Card from './ListCard';
import { CONTENT_TYPE, IMAGE_BASE_URL } from '../Constants';

const List = (props) =>  {
    const getCardsArray = () => {
        const cardsArray = props.data.map((info, idx) => (
            <Card
              key={idx}
              id={info.id}
              type={info.media_type || props.type}
              isSearchList={props.type == CONTENT_TYPE.SEARCH}
              name={info.title || info.name}
              description={info.overview || null}
              image={IMAGE_BASE_URL+(info.poster_path || info.profile_path)}
              character={info.character || null}
              date={info.release_date || info.first_air_date || null}/>
        ));
        return(cardsArray)
    }

    return(
        <div className={"list"}>
            {getCardsArray()}
        </div>
    )
}

export default List;
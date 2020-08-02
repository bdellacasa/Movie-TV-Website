import React from 'react';
import '../styles/ListStyles.css';
import Card from './ListCard';
import { CONTENT_TYPE, IMAGE_BASE_URL } from '../Constants';

const List = ({ data, type }) => {
    const getCardsArray = () => {
        const cardsArray = data.map((info, idx) => (
            <Card
                key={idx}
                id={info.id}
                type={info.media_type || type}
                isSearchList={type === CONTENT_TYPE.SEARCH}
                name={info.title || info.name}
                description={info.overview}
                image={IMAGE_BASE_URL + (info.poster_path || info.profile_path)}
                character={info.character}
                date={info.release_date || info.first_air_date} />
        ));
        return (cardsArray)
    }

    return (
        <div className={"list"}>
            {getCardsArray()}
        </div>
    )
}

export default List;
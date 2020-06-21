import React, { useState } from 'react';
import image_not_available from '../no_image.jpeg';
import { Redirect } from 'react-router-dom';
import '../styles/ListStyles.css';
import { CONTENT_TYPE } from '../Constants';

const ListCard = (props) => {
    const [toDetail, setToDetail] = useState(false);
    
    const handleClickEvent = () => {
       setToDetail(true);
    }

    const renderContent = () => {
        const date = props.date ? new Date(props.date).toDateString() : '';
        const text = props.type == CONTENT_TYPE.PERSON ? props.character || '' : date || '';
        return (
            <div>
                <p className={"list-card-title"}>{props.name}</p>
                <p className={"list-card-description"}>{text}</p>
            </div>
        )
    }
   
    const onImgError = (ev) => {
        ev.target.src = image_not_available;
    }

    if (toDetail && props.type !== CONTENT_TYPE.PERSON) {
        return <Redirect to={`/detail/${props.type}/${props.id}`} />
    } else {
        return(
            <div className={props.character ? "list-card-carousel" : "list-card"} onClick={handleClickEvent}>
                <img onError={onImgError} className={props.character ? "list-card-carousel-image" : "list-card-image"} src={props.image}/>
                {renderContent()}
            </div>
        )
    }
}

export default ListCard;
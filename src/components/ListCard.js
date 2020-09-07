import React, { useState } from 'react';
import image_not_available from '../no_image.jpeg';
import { Redirect } from 'react-router-dom';
import '../styles/ListStyles.css';
import { CONTENT_TYPE } from '../Constants';

const ListCard = ({ id, date, type, character, name, image }) => {
  const [toDetail, setToDetail] = useState(false);

  const handleOnClick = () => {
    setToDetail(true);
  }

  const renderContent = () => {
    const _date = date ? new Date(date).toDateString() : '';
    const text = type === CONTENT_TYPE.PERSON ? character || '' : _date || '';
    return (
      <div>
        <p className={"list-card-title"}>{name}</p>
        <p className={"list-card-description"}>{text}</p>
      </div>
    )
  }

  const onImgError = (ev) => {
    ev.target.src = image_not_available;
  }

  if (toDetail && type !== CONTENT_TYPE.PERSON) {
    return <Redirect to={`/detail/${type}/${id}`} />
  } else {
    return (
      <div className={character ? "list-card-carousel" : "list-card"} onClick={handleOnClick}>
        <img onError={onImgError} className={character ? "list-card-carousel-image" : "list-card-image"} src={image} alt="" />
        {renderContent()}
      </div>
    )
  }
}

export default ListCard;
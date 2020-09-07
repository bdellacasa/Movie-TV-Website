import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/CarouselStyles.css';
import { CONTENT_TYPE, IMAGE_BASE_URL, mobile, tablet } from '../Constants';
import image_not_available from '../no_image.jpeg';
import Card from '../components/ListCard';

const placeholderItem = <div style={{ height: 300, width: 200, borderRadius: '2em', background: '#EEE' }} />;

const Carousel = (props) => {
  const [items, setItems] = useState([]);
  const [showButton, setShowButton] = useState(true);
  let slider = useRef(null);

  const maxScreen = !(mobile || tablet);

  const {
    data,
    indexCarousel,
    cardsPerSlide,
    type,
    name,
    dots,
    slidesToScroll,
  } = props;

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        let items = createItems();
        setItems(items);
        setShowButton(!indexCarousel ? maxScreen && data.length > cardsPerSlide : maxScreen);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data])

  const onImgError = (ev) => {
    ev.target.src = image_not_available;
  }

  const homeItems = () => {
    let date;
    return data.map((item, idx) => {
      date = new Date(item.release_date || item.first_air_date);
      return (
        <div key={idx} className={"carousel-home-item"}>
          <Link className={"carousel-nav"} style={{ textDecoration: 'none' }} to={`detail/${type}/${item.id}`}>
            <img onError={onImgError} src={IMAGE_BASE_URL + item.poster_path} className={"carousel-item-image"} alt="" />
            <div className={"carousel-item-text-container"}>
              <p style={{ fontWeight: 'bold' }}>{item.title || item.name}</p>
              <p>{date.toDateString()}</p>
            </div>
          </Link>
        </div>
      )
    })
  }

  const castItems = () => {
    return data.map((info, idx) => {
      return (
        <div key={idx} className={"carousel-item"}>
          <Card
            id={info.id}
            type={info.media_type || type}
            isSearchList={type === CONTENT_TYPE.SEARCH}
            name={info.title || info.name}
            description={info.overview}
            image={IMAGE_BASE_URL + (info.poster_path || info.profile_path)}
            character={info.character}
            date={info.release_date || info.first_air_date} />
        </div>
      )
    });
  }

  const createItems = () => {
    return indexCarousel ? homeItems() : castItems();
  }

  const prev = () => {
    slider.slickPrev()
  }

  const next = () => {
    slider.slickNext()
  }

  const renderPlaceholders = () => {
    const items = [...Array(cardsPerSlide)].fill(placeholderItem);
    return (
      <div className={"home-carousel"}>
        <p className={"carousel-title"}>{name}</p>
        <div style={{ display: 'flex', flexDirection: 'row', width: '70vw', justifyContent: 'space-between', marginLeft: '100px' }}>
          {items}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    let settings = {
      dots,
      infinite: false,
      speed: 500,
      slidesToShow: data.length < cardsPerSlide ? data.length : cardsPerSlide,
      slidesToScroll,
      draggable: false,
      arrows: false
    };

    return (
      <div className={indexCarousel ? "home-carousel" : "cast-carousel"}>
        <p className={"carousel-title"}>{name}</p>
        <div className={"carousel-container"}>
          {showButton && <button className={"carousel-button"} onClick={prev}>{"<"}</button>}
          <Slider ref={Ref => slider = Ref} {...settings} style={{ width: '80%' }}>
            {items}
          </Slider>
          {showButton && <button className={"carousel-button"} onClick={next}>{">"}</button>}
        </div>
      </div>
    );
  }

  return (items.length > 0 ? renderContent() : renderPlaceholders())
}

export default Carousel;
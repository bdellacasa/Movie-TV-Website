import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/CarouselStyles.css';
import { CONTENT_TYPE, IMAGE_BASE_URL, minScreen } from '../Constants';
import image_not_available from '../no_image.jpeg';
import Card from '../components/ListCard';

const placeholderItem = <div style={{ height: 300, width: 200, borderRadius: '2em', background: '#EEE' }} />;

const Carousel = (props) => {
  const [items, setItems] = useState([]);
  const [showButton, setShowButton] = useState(true);
  let slider = useRef(null);

  useEffect(() => {
      if (!!props.data ) {
        setTimeout(() => {
          let items = createItems();
          setItems(items);
          setShowButton(!props.indexCarousel ? !minScreen && props.data.length > props.cardsPerSlide : !minScreen);
        }, 100);
      }
  }, [props.data])

  const onImgError = (ev) => {
    ev.target.src = image_not_available;
  }

  const homeItems = () => {
    let date;
    return props.data.map((item, idx) => {
      date = new Date(item.release_date || item.first_air_date);
      return(
          <div key={idx} className={"carousel-home-item"}>
             <Link className={"carousel-nav"} style={{textDecoration: 'none'}} to={`detail/${props.type}/${item.id}`}>
                <img onError={onImgError} src={IMAGE_BASE_URL+item.poster_path} className={"carousel-item-image"}/>
                <div className={"carousel-item-text-container"}>
                    <p style={{fontWeight: 'bold'}}>{item.title || item.name}</p>
                    <p>{date.toDateString()}</p>
                </div>
              </Link>
          </div>
      )
    })
  }

  const castItems = () => {
      return props.data.map((info, idx) => {
        return(
          <div key={idx} className={"carousel-item"}>
              <Card
                id={info.id}
                type={info.media_type || props.type}
                isSearchList={props.type == CONTENT_TYPE.SEARCH}
                name={info.title || info.name}
                description={info.overview || null}
                image={IMAGE_BASE_URL+(info.poster_path || info.profile_path)}
                character={info.character || null}
                date={info.release_date || info.first_air_date || null}/>
          </div>
      )});
  }

  const createItems = () => {
      return props.indexCarousel ? homeItems() : castItems(); 
  }

  const prev = () => {
    slider.slickPrev()
  }

  const next = () => {
    slider.slickNext()
  }

  const renderPlaceholders = () => {
    const items = [...Array(props.cardsPerSlide)].fill(placeholderItem);
    return (
      <div className={"carousel"}>
        <p className={"carousel-title"}>{props.name}</p>
        <div style={{display: 'flex', flexDirection: 'row', width: '70vw', justifyContent: 'space-between', marginLeft: '100px'}}>
          {items}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    let settings = {
      dots: props.dots,
      infinite: false,
      speed: 500,
      slidesToShow: props.data.length < props.cardsPerSlide ? props.data.length : props.cardsPerSlide,
      slidesToScroll: props.slidesToScroll,
      draggable: false,
      arrows: false
    };

    return (
      <div className={"carousel"}>
        <p className={"carousel-title"}>{props.name}</p>
        <div className={"carousel-container"}>
          {showButton && <button className={"carousel-button"} onClick={prev}>{"<"}</button>}
          <Slider ref={Ref => slider = Ref} {...settings} style={{width: '80%'}}>
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
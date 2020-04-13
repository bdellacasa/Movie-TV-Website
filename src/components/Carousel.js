import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import ClientService from '../services/ClientService';
import '../styles/CarouselStyles.css';
import image_not_available from '../no_image.jpeg';

const IMAGE_BASE = ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE;

const placeholderItem = <div style={{ height: 300, width: 200, borderRadius: '2em', background: '#EEE' }} />;
export default class Carousel extends Component {
  constructor(props) {
      super(props)
      this.state = {
          items: []
      }
      this.prev = this._prev.bind(this);
      this.next = this._next.bind(this);
  }

  componentDidUpdate(prevProps) {
      if((prevProps.data !== this.props.data) && (!!this.props.data)) {
        setTimeout(() => {
            const items = this.createItems();
            this.setState({
              items: items,
            })
        }, 100);
      }
  }

  onImgError(ev){
    ev.target.src = image_not_available;
  }

  createItems = () => {
      let date;
      return this.props.data.map((item, idx) => {
        date = new Date(item.release_date || item.first_air_date);
        return(
            <div key={idx} className={"carousel-item"}>
               <Link className={"carousel-nav"} style={{textDecoration: 'none'}} to={`detail/${this.props.type}/${item.id}`}>
                  <img onError={this.onImgError} src={IMAGE_BASE+item.poster_path} className={"carousel-item-image"}/>
                  <div className={"carousel-item-text-container"} onClick={() => this.setState({ navigate: true, id: item.id })}>
                      <p style={{fontWeight: 'bold'}}>{item.title || item.name}</p>
                      <p>{date.toDateString()}</p>
                  </div>
                </Link>
            </div>
        )
      })
  }

  _prev() {
    this.slider.slickPrev()
  }

  _next() {
    this.slider.slickNext()
  }

  renderPlaceholders() {
    const items = [...Array(this.props.cardsPerSlide)].fill(placeholderItem);
    return (
      <div className={"carousel-container"}>
        <p className={"carousel-title"}>{this.props.name}</p>
        <div style={{display: 'flex', flexDirection: 'row', width: '70vw', justifyContent: 'space-between', marginLeft: '100px'}}>
          {items}
        </div>
      </div>
    );
  }

  renderContent(items) {
    let settings = {
      dots: this.props.dots,
      infinite: false,
      speed: 500,
      slidesToShow: this.props.cardsPerSlide,
      slidesToScroll: this.props.slidesToScroll,
      draggable: false
    };
    return (
      <div className={"carousel-container"}>
        <p className={"carousel-title"}>{this.props.name}</p>
        <div style={{display: 'flex', flexDirection: 'row', width: '80vw'}}>
          <button className={"carousel-button"} style={{marginRight: '20px'}} onClick={this.prev}>{"<"}</button>
          <Slider ref={Ref => this.slider = Ref} {...settings} style={{width: '80%'}}>
            {items}
          </Slider>
          <button className={"carousel-button"} style={{marginLeft: '20px'}} onClick={this.next}>{">"}</button>
        </div>
      </div>
    );
  }

  render() {
    const {
      items,
    } = this.state;
    return (items.length > 0 ? this.renderContent(items) : this.renderPlaceholders())
  }












  
}
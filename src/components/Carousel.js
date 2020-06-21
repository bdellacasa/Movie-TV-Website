import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import '../styles/CarouselStyles.css';
import { CONTENT_TYPE, IMAGE_BASE_URL, minScreen } from '../Constants';
import image_not_available from '../no_image.jpeg';
import Card from '../components/ListCard';

const placeholderItem = <div style={{ height: 300, width: 200, borderRadius: '2em', background: '#EEE' }} />;
export default class Carousel extends Component {
  constructor(props) {
      super(props)
      this.state = {
          items: [],
          showButton: true
      }
      this.prev = this._prev.bind(this);
      this.next = this._next.bind(this);
  }

  componentDidMount() {
    if (!!this.props.data) {
      setTimeout(() => {
          const items = this.createItems();
          this.setState({
            items: items,
          })

          this.setState({
            showButton: !this.props.indexCarousel ? !minScreen && this.props.data.length > this.props.cardsPerSlide : !minScreen
          })
      }, 100);
    }
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

  homeItems = () => {
    let date;
    return this.props.data.map((item, idx) => {
      date = new Date(item.release_date || item.first_air_date);
      return(
          <div key={idx} className={"carousel-home-item"}>
             <Link className={"carousel-nav"} style={{textDecoration: 'none'}} to={`detail/${this.props.type}/${item.id}`}>
                <img onError={this.onImgError} src={IMAGE_BASE_URL+item.poster_path} className={"carousel-item-image"}/>
                <div className={"carousel-item-text-container"} onClick={() => this.setState({ navigate: true, id: item.id })}>
                    <p style={{fontWeight: 'bold'}}>{item.title || item.name}</p>
                    <p>{date.toDateString()}</p>
                </div>
              </Link>
          </div>
      )
    })
  }

  castItems = () => {
      return this.props.data.map((info, idx) => {
        return(
          <div key={idx} className={"carousel-item"}>
              <Card
                id={info.id}
                type={info.media_type || this.props.type}
                isSearchList={this.props.type == CONTENT_TYPE.SEARCH}
                name={info.title || info.name}
                description={info.overview || null}
                image={IMAGE_BASE_URL+(info.poster_path || info.profile_path)}
                character={info.character || null}
                date={info.release_date || info.first_air_date || null}/>
          </div>
      )});
  }

  createItems = () => {
      return this.props.indexCarousel ? this.homeItems() : this.castItems(); 
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
      <div className={"carousel"}>
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
      slidesToShow: this.props.data.length < this.props.cardsPerSlide ? this.props.data.length : this.props.cardsPerSlide,
      slidesToScroll: this.props.slidesToScroll,
      draggable: false,
      arrows: false
    };

    return (
      <div className={"carousel"}>
        <p className={"carousel-title"}>{this.props.name}</p>
        <div className={"carousel-container"}>
          {this.state.showButton && <button className={"carousel-button"} onClick={this.prev}>{"<"}</button>}
          <Slider ref={Ref => this.slider = Ref} {...settings} style={{width: '80%'}}>
            {items}
          </Slider>
          {this.state.showButton && <button className={"carousel-button"} onClick={this.next}>{">"}</button>}
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
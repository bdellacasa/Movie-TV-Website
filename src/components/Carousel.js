import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import '../styles/CarouselStyles.css';
import ClientService from '../services/ClientService';

const IMAGE_BASE = ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE;

export default class Carousel extends Component {
  constructor(props) {
      super(props)
      this.state = {
          items: [],
          activeItemIndex: 0
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

  createItems = () => {
      let date;
      return this.props.data.map((item, idx) => {
        date = new Date(item.release_date || item.first_air_date);
        return(
            <div key={idx} className={"carousel-item"}>
                <Link className={"carousel-nav"} style={{textDecoration: 'none'}} to={`detail/${this.props.type}/${item.id}`}>
                  <img alt="" src={IMAGE_BASE+item.poster_path} className={"carousel-item-image"}/>
                  <div>
                     <p style={{fontWeight: 'bold'}}>{item.title}</p>
                     <p>{date.toDateString()}</p>
                  </div>
                </Link>
            </div>
        )
      })
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      items,
    } = this.state;

    return (
        <div className={"carousel-container"}>
            <p className={"carousel-title"}>{this.props.name}</p>
            <ItemsCarousel
                placeholderItem={<div style={{ height: 300, width: 200, borderRadius: '2em', background: '#EEE' }} />}
                enablePlaceholder={true}
                numberOfPlaceholderItems={3}
                numberOfCars={3}
                slidesToScroll={2}
                chevronWidth={100}
                outsideChevron={true}
                showSlither={false}
                firstAndLastGutter={false}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={value => this.setState({ activeItemIndex: value })}
                rightChevron={'>'}
                leftChevron={'<'}
            >
                {items}
            </ItemsCarousel>
      </div>
    );  
  }
} 
import React, { Component } from 'react';
import '../styles/ListStyles.css';
import Card from './ListCard';
import ClientService from '../services/ClientService';

const IMAGE_BASE_URL = ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE;
export default class List extends Component {

    getCardsArray() {
        const cardsArray = this.props.data.map((info, idx) => (
            <Card
              key={idx}
              id={info.id}
              type={info.type || this.props.type}
              name={info.title || info.name}
              description={info.overview || null}
              image={IMAGE_BASE_URL+(info.poster_path || info.profile_path)}
              character={info.character || null}/>
        ));
        return(cardsArray)
    }

    render() {
        return(
            <div className={"list"}>
                {this.getCardsArray()}
            </div>
        )
    }
}
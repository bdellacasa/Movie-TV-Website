import React, { Component } from 'react';
import '../styles/ListStyles.css';
import Card from './ListCard';
import ClientService from '../services/ClientService';
import { CONTENT_TYPE } from '../Constants';

const IMAGE_BASE_URL = ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE;
export default class List extends Component {

    getCardsArray() {
        const cardsArray = this.props.data.map((info, idx) => (
            <Card
              key={idx}
              id={info.id}
              type={info.media_type || this.props.type}
              isSearchList={this.props.type == CONTENT_TYPE.SEARCH}
              name={info.title || info.name}
              description={info.overview || null}
              image={IMAGE_BASE_URL+(info.poster_path || info.profile_path)}
              character={info.character || null}
              date={info.release_date || info.first_air_date || null}/>
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
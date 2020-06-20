import React, { Component } from 'react';
import image_not_available from '../no_image.jpeg';
import { Redirect } from 'react-router-dom';
import '../styles/ListStyles.css';
import { CONTENT_TYPE } from '../Constants';
export default class ListCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            toDetail: false
        }
    }
    
    handleClickEvent() {
       this.setState({
           toDetail: true
       })
    }

    renderPeopleText() {
        return (
            <div>
                <p className={"list-card-title"}>{this.props.name}</p>
                {this.props.character && <p>{this.props.character}</p>}
            </div>
        )
    }

    renderContentText() {
        const date = this.props.date ? new Date(this.props.date).toDateString() : '';
        const text = this.props.type !== CONTENT_TYPE.PERSON ? this.props.character || date : '';
        return (
            <div>
                <p className={"list-card-title"}>{this.props.name}</p>
                <p className={"list-card-description"}>{text}</p>
            </div>
        )
    }
   
    onImgError(ev){
        ev.target.src = image_not_available;
    }

    render() {
        if ((this.state.toDetail) && this.props.type !== CONTENT_TYPE.PERSON) {
            return <Redirect to={`/detail/${this.props.type}/${this.props.id}`} />
        }
        return(
            <div className={"list-card"} onClick={() => this.handleClickEvent()}>
                <img onError={this.onImgError} className={"list-card-image"} src={this.props.image}/>
                {this.renderContentText()}
            </div>
        )
    }
}
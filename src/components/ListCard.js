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
        return (
            <div>
                <p className={"list-card-title"} style={{ fontSize: '1.2em', marginTop: 0, textAlign: 'start', marginLeft: '10px' }}>{this.props.name}</p>
                <p className={"list-card-description"}>{this.props.description}</p>
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
        const isContentCard = this.props.type !== CONTENT_TYPE.PERSON; //Movie or tv card
        const typeDependantStyle = isContentCard ? {
            flexDirection: 'row',
            paddingBottom: 0,
            marginLeft: 0   
        } : 
        //people or search list card
        !this.props.isSearchList ?
            {
                flexDirection: 'column',
                paddingBottom: '48vh',
                marginLeft: '80px'
            } : {
                flexDirection: 'column',
                paddingBottom: 0,
                marginLeft: 0
            };

        return(
            <div className={"list-card"} style={typeDependantStyle} onClick={() => this.handleClickEvent()}>
                <img onError={this.onImgError} className={"list-card-image"} alt="" src={this.props.image}/>
                {isContentCard 
                    ? this.renderContentText()
                    : this.renderPeopleText()
                }
            </div>
        )
    }
}
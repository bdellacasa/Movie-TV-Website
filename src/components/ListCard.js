import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ListStyles.css';
import { CONTENT_TYPE } from '../Constants';

export default class ListCard extends Component {

    render() {
        const typeDependantDirection = (this.props.type == CONTENT_TYPE.PEOPLE || this.props.type == CONTENT_TYPE.SEARCH) ? 'column' : 'row';
        return(
            <div className={"list-card"} style={{flexDirection: typeDependantDirection }}>
                <img alt="" src={this.props.image}/>
                {this.props.type !== CONTENT_TYPE.PEOPLE && this.props.type !== CONTENT_TYPE.SEARCH ? 
                <div>
                    <p className={"list-card-title"} style={{ fontSize: 20 }}>{this.props.name}</p>
                    <p className={"list-card-description"}>{this.props.description.substring(0,200) + "..."}</p>
                </div> :
                <p className={"list-card-title"}>{this.props.name}</p>}
            </div>
        )
    }
}
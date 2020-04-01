import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icons/film.png';
import { CONTENT_TYPE } from '../Constants';

export default class Header extends Component {

    render() {
        return(
            <header className="header">
                <div className="header-content-container">
                    <Link style={{alignSelf: 'center'}} to="/">
                        <img src={Logo} className={"logo"}/>
                    </Link>
                    <div className="header-text-container">
                        <Link style={{ textDecoration: 'none' }} to={'/list/'+CONTENT_TYPE.MOVIES}>
                            <p className="header-font">Movies</p>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={'/list/'+CONTENT_TYPE.SERIES}>
                            <p className="header-font">Series</p>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={'/list/'+CONTENT_TYPE.PEOPLE}>
                            <p className="header-font">People</p>
                        </Link>
                    </div>
                </div>
            </header>
        )
    }

}
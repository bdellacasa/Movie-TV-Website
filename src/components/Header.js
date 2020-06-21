import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icons/film.png';
import { CONTENT_TYPE } from '../Constants';

const Header = () => {
    return(
        <header className="header">
            <div className="header-content-container">
                <Link className={"header-logo-nav"} to="/">
                    <img src={Logo} className={"logo"}/>
                </Link>
                <div className="header-text-container">
                    <Link className={"header-link-nav"} style={{ textDecoration: 'none' }} to={`/list/${CONTENT_TYPE.MOVIES}`}>
                        <p className="header-font">Movies</p>
                    </Link>
                    <Link className={"header-link-nav"} style={{ textDecoration: 'none' }} to={`/list/${CONTENT_TYPE.TV}`}>
                        <p className="header-font">Series</p>
                    </Link>
                    <Link className={"header-link-nav"} style={{ textDecoration: 'none' }} to={`/list/${CONTENT_TYPE.PERSON}`}>
                        <p className="header-font">People</p>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;
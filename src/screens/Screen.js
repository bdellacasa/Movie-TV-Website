import React from 'react';
import '../styles/ScreenStyles.css';
import Header from '../components/Header';
import Logo from '../icons/logo-moviedb.svg';

const Screen = (props) => {
  return (
    <div className="screen">
      <Header/>
      <div className={"screen-content"}>
        {props.content}
      </div>
      <footer className={"screen-footer"}>
        <p>
            Powered by
        </p>
        <img src={Logo} className={"logo"} style={{marginLeft: 15}}/>
      </footer>
    </div>
  );
}

export default Screen;
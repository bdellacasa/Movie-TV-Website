import React from 'react';
import '../styles/HeroStyles.css';
import Search from './Search';

const Hero = (props) => {
    return(
      <div className={"hero-background"} style={{backgroundImage: `url(${props.imageUrl})`, width: window.innerWidth}}>
        <div className={"hero-content-container"}>
          <p className={"hero-text"}>Welcome!</p>
          <p className={"hero-text"}>Millions of movies, TV shows and people to discover. Explore now.</p>
          <div className={"hero-search-container"}>
            <Search/>
          </div>
        </div>
      </div>
    )
}

export default Hero;
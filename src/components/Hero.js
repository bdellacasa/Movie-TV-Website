import React from 'react';
import '../styles/HeroStyles.css';
import Search from './Search';

const Hero = () => {
    const style = {
      'width': window.innerWidth * 0.7,
      'height': window.innerHeight * 0.6,
      'alignSelf': 'center'
    }
    
    return(
      <div style={style}>
        <div className={"hero-content-container"}>
          <p className={"hero-text"}>Welcome!</p>
          <p className={"hero-text"}>Millions of movies, TV shows and people to discover. Explore now.</p>
          <div style={{marginTop: 150, marginLeft: style.width * 0.1}}>
            <Search/>
          </div>
        </div>
        <img src={`https://www.elgoldigital.com/wp-content/uploads/1571675881_015450_1571675923_noticia_normal.jpg`} style={style}/>
      </div>
    )
}

export default Hero;
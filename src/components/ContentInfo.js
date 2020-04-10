import React from 'react';
import '../styles/ContentInfoStyles.css';

const ContentInfo = (props) => {
    return(
      <div className={"content-info-background"} style={{backgroundImage: `url(${props.backdropUrl})`}}>
        <div className={"content-info-container"}>
            <img className={"content-info-image"} src={props.posterUrl}/>
            <div className={"content-info-text"}>
                <p className={"content-info-title"}>{props.title}</p>
                <p className={"content-info-tagline"}>{props.tagline}</p>
                <p style={{fontSize: '20px', fontWeight: 'bold' }}>General</p>
                <p className={"content-info-description"}>{props.description}</p>
            </div>
        </div>
      </div>
    )
}

export default ContentInfo;
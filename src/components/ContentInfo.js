import React from 'react';
import '../styles/ContentInfoStyles.css';

const ContentInfo = (props) => {
  const { backdropUrl, posterUrl, title, tagline, description } = props;
  return (
    <div className={"content-info-background"} style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className={"content-info-container"}>
        <img className={"content-info-image"} src={posterUrl} alt="" />
        <div className={"content-info-text"}>
          <p className={"content-info-title"}>{title}</p>
          <p className={"content-info-tagline"}>{tagline}</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>General</p>
          <p className={"content-info-description"}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentInfo;
import React from 'react';
import YouTube from 'react-youtube';
import { mobile, tablet } from '../Constants';

const VideoPlayer = ({ videoId }) => {
  const opts = mobile ? {
    height: '320',
    width: '330'
  } :
    tablet ? {
      height: '500',
      width: '500'
    } :
      {
        height: '720',
        width: '1280'
      };


  return (
    <YouTube videoId={videoId} opts={opts} />
  );
};

export default VideoPlayer;
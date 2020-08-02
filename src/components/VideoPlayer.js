import React from 'react';
import YouTube from 'react-youtube';
import { minScreen } from '../Constants';

const VideoPlayer = ({ videoId }) => {
    const opts = minScreen ?  {
        height: '320',
        width: '330'
    } :
    {
        height: '720',
        width: '1280'
    };

    
    return (
        <YouTube videoId={videoId} opts={opts}/>
    );
};

export default VideoPlayer;
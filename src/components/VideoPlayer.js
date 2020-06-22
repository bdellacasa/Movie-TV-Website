import React from 'react';
import YouTube from 'react-youtube';
import { minScreen } from '../Constants';

const VideoPlayer = (props) => {
    const opts = minScreen ?  {
        height: '320',
        width: '340'
    } :
    {
        height: '720',
        width: '1280'
    };

    
    return (
        <YouTube videoId={props.videoId} opts={opts}/>
    );
};

export default VideoPlayer;
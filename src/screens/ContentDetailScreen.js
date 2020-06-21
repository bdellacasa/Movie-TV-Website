import React, { useState, useEffect } from 'react';
import ClientService from '../services/ClientService';
import Screen from './Screen';
import ContentInfo from '../components/ContentInfo';
import { CONTENT_TYPE, sizeScreenCarouselProps } from '../Constants';
import Carousel from '../components/Carousel';

/** Screen detail for movies and series */
const ContentDetailScreen = (props) => {
    const [content, setContent] = useState(undefined);
    const [cast, setCast] = useState(undefined);

    useEffect(() => {
        if (!content && !cast) {
            getData();
        }
    },[content, cast])

    const fetchData = async(id, _type) => {
        let content, credit, cast = undefined;
        if (_type === CONTENT_TYPE.MOVIES) {
            [content, credit] = await Promise.all([ClientService.getMovieDetail(id), ClientService.getMovieCredit(id)]);
        } else if (_type == CONTENT_TYPE.TV){
            [content, credit] = await Promise.all([ClientService.getTVDetail(id), ClientService.getTVCredit(id)]);
        }
  
        if (_type !== CONTENT_TYPE.PERSON && credit) {
            cast = credit.cast.map(c => {
                return {
                    id: c.id,
                    character: c.character,
                    name: c.name,
                    profile_path: c.profile_path
                }
            })
        }
        setContent(content);
        setCast(cast);
    }

    //path = /detail/contentType/id
    const getData = () => {
        const path = props.location.pathname.split("/");
        fetchData(path[3], path[2]);
    }

    const renderCast = () => {
        return (
            <div style={{marginTop: '30px'}}>
                <Carousel 
                    data={cast}
                    name={"Cast"}
                    cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
                    slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
                    dots={sizeScreenCarouselProps.dots} 
                    type={CONTENT_TYPE.PERSON}
                    indexCarousel={false} />
            </div>
        )
    }
    
    
    const renderContent = () => {
        return(
            <div>
                {content && <ContentInfo
                    id={content.id}
                    title={content.title || content.original_name}
                    tagline={content.tagline}
                    description={content.overview}
                    releaseDate={content.release_date}
                    backdropUrl={ClientService.IMAGE_BASE_URL+ClientService.BACKDROP_SIZE+content.backdrop_path}
                    posterUrl={ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE+content.poster_path}
                    genres={content.genres}
                    ranking={content.vote_average}
                />}
                {cast && renderCast()}
            </div>
        )
    }

    return (
        <Screen
            content={
                renderContent()
            }
        />
    );
}

export default ContentDetailScreen;
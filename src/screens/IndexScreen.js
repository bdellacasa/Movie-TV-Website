import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { CONTENT_TYPE } from '../Constants';

const sizeScreenDependantProps = window.matchMedia("(max-width: 420px)").matches ? 
    {
        cardsPerSlide: 2,
        slidesToScroll: 1,
        dots: false
    } :
    {
        cardsPerSlide: 5,
        slidesToScroll: 3,
        dots: true
    };
export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carouselPopularMovies: [],
            carouselMoviesTopRated: [],
            carouselMoviesUpcoming: [],
            carouselPopularTV: [],
            carouselTVTopRated:[],
            carouselTVAiringToday: [],
            heroImageUrl: undefined
        }
    }

    async fetchCarouselsContent() {
        const [popularMovies, moviesTopRated, moviesUpcoming, popularTV, TVTopRated, TVAiringToday] = await Promise.all([ClientService.getMoviePopular(), ClientService.getMovieTopRated(), ClientService.getMovieUpcoming(), ClientService.getTVPopular(), ClientService.getTVTopRated(), ClientService.getTVAiringToday()]);

        this.setState({
            carouselPopularMovies: !!popularMovies ? popularMovies.results : [],
            carouselMoviesTopRated: !!moviesTopRated ? moviesTopRated.results : [],
            carouselMoviesUpcoming: !!moviesUpcoming ? moviesUpcoming.results : [],
            carouselPopularTV: !!popularTV ? popularTV.results : [],
            carouselTVTopRated: !!TVTopRated ? TVTopRated.results : [],
            carouselTVAiringToday: !!TVAiringToday ? TVAiringToday.results : [],
            heroImageUrl: !!popularMovies 
                ?  `${ClientService.IMAGE_BASE_URL}${ClientService.BACKDROP_SIZE}${popularMovies.results[Math.floor(Math.random() * popularMovies.results.length)].backdrop_path}`
                : ""
        })
    }

    componentDidMount() {
        this.fetchCarouselsContent();
        
    }
    

    renderContent() {
        return(
            <div>
                <Hero imageUrl={this.state.heroImageUrl}/>
                <Carousel 
                    data={this.state.carouselPopularMovies}
                    name={"Popular Movies"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots} 
                    type={CONTENT_TYPE.MOVIES} />
                <Carousel 
                    data={this.state.carouselMoviesTopRated}
                    name={"Movies top rated"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots} 
                    type={CONTENT_TYPE.MOVIES} />
                <Carousel 
                    data={this.state.carouselMoviesUpcoming}
                    name={"Movies upcoming"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots}
                    type={CONTENT_TYPE.MOVIES}/>
                <Carousel 
                    data={this.state.carouselPopularTV}
                    name={"Popular TV"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots} 
                    type={CONTENT_TYPE.TV}/>
                <Carousel 
                    data={this.state.carouselTVTopRated}
                    name={"TV top rated"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots} 
                    type={CONTENT_TYPE.TV}/>
                <Carousel 
                    data={this.state.carouselTVAiringToday}
                    name={"TV airing today"}
                    cardsPerSlide={sizeScreenDependantProps.cardsPerSlide}
                    slidesToScroll={sizeScreenDependantProps.slidesToScroll}
                    dots={sizeScreenDependantProps.dots} 
                    type={CONTENT_TYPE.TV}/>
            </div>
        )
    }

    render() {
        return (
            <Screen
                content={
                    this.renderContent()
                }
            />
        );
   }
}
import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { CONTENT_TYPE } from '../Constants';

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carouselPopularMovies: [],
            carouselMoviesUpcoming: [],
            carouselPopularSeries: [],
            heroImageUrl: undefined
        }
    }

    async fetchCarouselsContent() {
        const [popularMovies, moviesUpcoming, popularSeries] = await Promise.all([ClientService.getMoviePopular(), ClientService.getMovieUpcoming(), ClientService.getTVPopular()]);

        this.setState({
            carouselPopularMovies: !!popularMovies ? popularMovies.results : [],
            carouselMoviesUpcoming: !!moviesUpcoming ? moviesUpcoming.results : [],
            carouselPopularSeries: !!popularSeries ? popularSeries.results : [],
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
                <Carousel data={this.state.carouselPopularMovies} name={"Popular Movies"} type={CONTENT_TYPE.MOVIES} />
                <Carousel data={this.state.carouselMoviesUpcoming} name={"Movies upcoming"} type={CONTENT_TYPE.MOVIES}/>
                <Carousel data={this.state.carouselPopularSeries} name={"Popular Series"} type={CONTENT_TYPE.TV}/>
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
import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carouselPopularMovies: [],
            carouselMoviesUpcoming: [],
            carouselPopularSeries: []
        }
    }

    getPopularMovies = async () => {
        const result = await ClientService.getMoviePopular();
        return result.results;
    }

    getMoviesUpcoming = async () => {
        const result = await ClientService.getMovieUpcoming();
        return result.results;
    }

    getTVPopular = async () => {
        const result = await ClientService.getTVPopular();
        return result.results;
    }

    async fetchCarouselsContent() {
        const [popularMovies, moviesUpcoming, popularSeries] = await Promise.all([this.getPopularMovies(), this.getMoviesUpcoming(), this.getTVPopular()]);

        this.setState({
            carouselPopularMovies: popularMovies,
            carouselMoviesUpcoming: moviesUpcoming,
            carouselPopularSeries: popularSeries
        })
    }

    componentDidMount() {
        this.fetchCarouselsContent();
        
    }

    renderContent() {  
        return(
            <div>
                <Hero/>
                <Carousel data={this.state.carouselPopularMovies} name={"Popular Movies"}/>
                <Carousel data={this.state.carouselMoviesUpcoming} name={"Movies upcoming"}/>
                <Carousel data={this.state.carouselPopularSeries} name={"Popular Series"}/>
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
import React, { useState, useEffect } from 'react';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { CONTENT_TYPE, sizeScreenCarouselProps } from '../Constants';

const Index = () => {
  const [carouselPopularMovies, setCarouselPopularMovies] = useState([]);
  const [carouselMoviesTopRated, setCarouselMoviesTopRated] = useState([]);
  const [carouselMoviesUpcoming, setCarouselMoviesUpcoming] = useState([]);
  const [carouselPopularTV, setCarouselPopularTV] = useState([]);
  const [carouselTVTopRated, setCarouselTVTopRated] = useState([]);
  const [carouselTVAiringToday, setCarouselTVAiringToday] = useState([]);
  const [heroImageUrl, setHeroImageUrl] = useState(undefined);

  useEffect(() => {
    if (!carouselPopularMovies.length) {
      fetchCarouselsContent();
    }
  }, [carouselPopularMovies])

  const fetchCarouselsContent = async () => {
    const [popularMovies, moviesTopRated, moviesUpcoming, popularTV, TVTopRated, TVAiringToday] = await Promise.all([ClientService.getMoviePopular(), ClientService.getMovieTopRated(), ClientService.getMovieUpcoming(), ClientService.getTVPopular(), ClientService.getTVTopRated(), ClientService.getTVAiringToday()]);
    setCarouselPopularMovies(!!popularMovies ? popularMovies.results : []);
    setCarouselMoviesTopRated(!!moviesTopRated ? moviesTopRated.results : []);
    setCarouselMoviesUpcoming(!!moviesUpcoming ? moviesUpcoming.results : []);
    setCarouselPopularTV(!!popularTV ? popularTV.results : []);
    setCarouselTVTopRated(!!TVTopRated ? TVTopRated.results : []);
    setCarouselTVAiringToday(!!TVAiringToday ? TVAiringToday.results : []);
    setHeroImageUrl(!!popularMovies
      ? `${ClientService.IMAGE_BASE_URL}${ClientService.BACKDROP_SIZE}${popularMovies.results[Math.floor(Math.random() * popularMovies.results.length)].backdrop_path}`
      : "");
  }

  const renderContent = () => {
    return (
      <div>
        <Hero imageUrl={heroImageUrl} />
        <Carousel
          data={carouselPopularMovies}
          name={"Popular Movies"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.MOVIES}
          indexCarousel={true} />
        <Carousel
          data={carouselMoviesTopRated}
          name={"Movies top rated"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.MOVIES}
          indexCarousel={true} />
        <Carousel
          data={carouselMoviesUpcoming}
          name={"Movies upcoming"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.MOVIES}
          indexCarousel={true} />
        <Carousel
          data={carouselPopularTV}
          name={"Popular TV"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.TV}
          indexCarousel={true} />
        <Carousel
          data={carouselTVTopRated}
          name={"TV top rated"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.TV}
          indexCarousel={true} />
        <Carousel
          data={carouselTVAiringToday}
          name={"TV airing today"}
          cardsPerSlide={sizeScreenCarouselProps.cardsPerSlide}
          slidesToScroll={sizeScreenCarouselProps.slidesToScroll}
          dots={sizeScreenCarouselProps.dots}
          type={CONTENT_TYPE.TV}
          indexCarousel={true} />
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

export default Index;
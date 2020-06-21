import ClientService from '../src/services/ClientService';

export const IMAGE_BASE_URL = ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE;

export const CONTENT_TYPE = {
    MOVIES: "movie",
    TV: "tv",
    PERSON: "person",
    SEARCH: "search"
}

export const minScreen = window.matchMedia("(max-width: 420px)").matches;

export const sizeScreenCarouselProps = minScreen ? 
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


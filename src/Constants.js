import ClientService from '../src/services/ClientService';

export const IMAGE_BASE_URL = ClientService.IMAGE_BASE_URL + ClientService.POSTER_SIZE;

export const CONTENT_TYPE = {
  MOVIES: "movie",
  TV: "tv",
  PERSON: "person",
  SEARCH: "search"
}

export const mobile = window.matchMedia("(max-width: 690px)").matches;

export const tablet = window.matchMedia("(max-width: 1280px)").matches;

let carouselValues;

if (mobile) {
  carouselValues = {
    cardsPerSlide: 2,
    slidesToScroll: 1,
    dots: false
  }
} else if (tablet) {
  carouselValues = {
    cardsPerSlide: 3,
    slidesToScroll: 1,
    dots: false
  }
} else {
  carouselValues = {
    cardsPerSlide: 5,
    slidesToScroll: 3,
    dots: true
  }
}


export const sizeScreenCarouselProps = carouselValues;


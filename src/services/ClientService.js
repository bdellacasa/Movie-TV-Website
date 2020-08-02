import { Component } from 'react';
import { API_KEY } from '../config';

const otherParams = {
    headers: {
        "content-type":"application/json; charset=UTF-8"
    },
    method: "GET"
}

const API_URL = 'https://api.themoviedb.org/3';

class ClientServiceImpl extends Component {
    
    constructor(props) {
        super(props)
        
        this.IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
        this.BACKDROP_SIZE = 'w1280';
        this.POSTER_SIZE = 'w500';
    }

    get = async (URL, page = 1, query = null) => {
        let url = API_URL+URL+"?api_key="+API_KEY+"&page="+page;
        if (!!query) {
            url+="&query="+query;
        }
        return fetch(url, otherParams)
        .then(result => {
            if (result.status !== '404') {
                console.log("GET "+url+" OK");
                return result.json();
            } else {
                console.log("ERROR GET "+url+" ", result.status)
                return null;
            }
        })
        .catch(error => { 
            console.log("ERROR GET "+url+" ", error)
            return null;
        })
    }

    getMoviePopular = (page) => {
        return this.get("/movie/popular", page);
    }

    getMovieTopRated = (page) => {
        return this.get("/movie/top_rated", page)
    }

    getMovieUpcoming = (page) => {
        return this.get("/movie/upcoming", page)
    }

    getMovieVideos = (id) => {
        return this.get(`/movie/${id}/videos`);
    }

    getTVLatest = (page) => {
        return this.get("/tv/latest", page)
    }

    getTVLatest = (page) => {
        return this.get("/tv/latest", page)
    }

    getTVAiringToday = (page) => {
        return this.get("/tv/airing_today", page)
    }

    getTVPopular = (page) => {
        return this.get("/tv/popular", page)
    }

    getTVTopRated = (page) => {
        return this.get("/tv/top_rated", page)
    }

    getPopularPeople = (page) => {
        return this.get("/person/popular", page);
    }

    getMovieDetail = (id) => {
        return this.get(`/movie/${id}`);
    }

    getTVDetail = (id) => {
        return this.get(`/tv/${id}`);
    }

    getMovieCredit = (id) => {
        return this.get(`/movie/${id}/credits`);
    }

    getTVCredit = (id) => {
        return this.get(`/tv/${id}/credits`);
    }

    getTVVideos = (id) => {
        return this.get(`/tv/${id}/videos`);
    }

    searchItem = async (query, page) => {
        return this.get("/search/multi", page, query).then( result => {
            return result;
        });
    }

}

const ClientService = new ClientServiceImpl();

export default ClientService;
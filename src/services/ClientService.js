import React, { Component } from 'react';

import { API_URL } from '../config';
import { API_KEY } from '../config';

const otherParams = {
    headers: {
        "content-type":"application/json; charset=UTF-8"
    },
    method: "GET"
}

class ClientServiceImpl extends Component {
    
    constructor(props) {
        super(props)
        
        this.IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w1280';
    }

    get = async (URL, page = 1, query = null) => {
        let url = API_URL+URL+"?api_key="+API_KEY+"&page="+page;
        if (!!query) {
            url+="&query="+query;
        }
        return fetch(url, otherParams)
        .then(result => {
            console.log("GET "+url+" OK");
            return result.json();
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

    getMovieUpcoming= (page) => {
        return this.get("/movie/upcoming", page)
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

    searchItem = async (query, page) => {
        return this.get("/search/multi", page, query).then( result => {
            return result;
        });
    }

    getPopularPeople = (page) => {
        return this.get("/person/popular", page);
    }
}

const ClientService = new ClientServiceImpl();

export default ClientService;
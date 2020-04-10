import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import Screen from './Screen';
import ContentInfo from '../components/ContentInfo';
import { CONTENT_TYPE } from '../Constants';
import List from '../components/List';

/** Screen detail for movies and series */

export class ContentDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: undefined,
            content: undefined,
            cast: undefined
        }
    }

    async fetchData(id, type) {
        let content, credit, cast = undefined;
        if (type === CONTENT_TYPE.MOVIES) {
            [content, credit] = await Promise.all([ClientService.getMovieDetail(id), ClientService.getMovieCredit(id)]);
        } else if (type == CONTENT_TYPE.TV){
            [content, credit] = await Promise.all([ClientService.getTVDetail(id), ClientService.getTVCredit(id)]);
        }

        if (type !== CONTENT_TYPE.PERSON) {
            cast = credit.cast.map(c => {
                return {
                    id: c.id,
                    character: c.character,
                    name: c.name,
                    profile_path: c.profile_path
                }
            })
        }

        this.setState({
            type: type,
            content: content,
            cast: cast
        })
    }

    //path = /detail/contentType/id
    getData() {
        const path = this.props.location.pathname.split("/");
        this.fetchData(path[3], path[2]);
    }
    
    componentDidMount() {
       this.getData();
    }

    componentDidUpdate() {
        this.getData();
    }

    renderCast() {
        return (
            <div style={{paddingLeft: '10vw', marginTop: '30px'}}>
                <p className={"content-info-cast-title"}>Cast</p>
                <List data={this.state.cast} type={CONTENT_TYPE.PERSON}/>
            </div>
        )
    }
    
    
    renderContent() {
        return(
            <div>
                {this.state.content && <ContentInfo
                    id={this.state.content.id}
                    title={this.state.content.title || this.state.content.original_name}
                    tagline={this.state.content.tagline}
                    description={this.state.content.overview}
                    releaseDate={this.state.content.release_date}
                    backdropUrl={ClientService.IMAGE_BASE_URL+ClientService.BACKDROP_SIZE+this.state.content.backdrop_path}
                    posterUrl={ClientService.IMAGE_BASE_URL+ClientService.POSTER_SIZE+this.state.content.poster_path}
                    genres={this.state.content.genres}
                    ranking={this.state.content.vote_average}
                />}
                {this.state.cast && this.renderCast()}
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
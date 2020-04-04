import React, { Component } from 'react';
import { CONTENT_TYPE } from '../Constants';
import Search from '../components/Search';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import List from '../components/List';

export class ListScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: undefined,
            data: []
        }
    }

    getContent() {
        const path = this.props.location.pathname.split("/");
        const type = path[1] === CONTENT_TYPE.SEARCH ? path[1] : path[2];
        switch (type) {
            case CONTENT_TYPE.MOVIES:
                ClientService.getMoviePopular().then(result => {
                    this.setState({
                        type: type,
                        data: result.results
                    })
                });
                break;
            case CONTENT_TYPE.SERIES:
                ClientService.getTVPopular().then(result => {
                    this.setState({
                        type: type,
                        data: result.results
                    })
                });
                break;
            case CONTENT_TYPE.PEOPLE:
                ClientService.getPopularPeople().then(result => {
                    this.setState({
                        type: type,
                        data: result.results
                    })
                });
                break;
            case CONTENT_TYPE.SEARCH: 
                this.searchItem(path[3])
            default:
                break;
        }
    }

    componentDidMount() {
        this.getContent();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getContent();
        }
    }

    searchItem = async (query) => {
        ClientService.searchItem(query, 1)
          .then(results => {
            if (!!results) {
                this.setState({
                    data: results.results,
                    type: CONTENT_TYPE.SEARCH                     
                })
            }
        })
    }

    renderContent() {
        return(
            <div>
                {this.state.type == CONTENT_TYPE.SEARCH && <Search/>}
                <List data={this.state.data} type={this.state.type}/>
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
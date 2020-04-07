import React, { Component } from 'react';
import { CONTENT_TYPE } from '../Constants';
import '../styles/PaginatorStyles.css';
import Search from '../components/Search';
import ClientService from '../services/ClientService';
import Screen from '../screens/Screen';
import List from '../components/List';
import Paginator from '../components/Paginator';
export class ListScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: undefined,
            data: [],
            totalPages: 0
        }
    }

    updateContent(type, result) {
        if (!!result) {
            this.setState({
                type: type,
                data: result.results,
                totalPages: result.total_pages
            })
        } else {
            this.setState({
                type: type,
                data: [],
                totalPages: 0
            })
        }
    }

    async getContent(page) {
        let result;
        const path = this.props.location.pathname.split("/");
        const type = path[1] === CONTENT_TYPE.SEARCH ? path[1] : path[2];
        switch (type) {
            case CONTENT_TYPE.MOVIES:
                result = await ClientService.getMoviePopular(page);
                break;
            case CONTENT_TYPE.TV:
                result = await ClientService.getTVPopular(page);
                break;
            case CONTENT_TYPE.PERSON:
                result = await ClientService.getPopularPeople(page);
                break;
            case CONTENT_TYPE.SEARCH: 
                result = await this.searchItem(path[3], page)
            default:
                break;
        }
        this.updateContent(type, result, page)
    }

    componentDidMount() {
        this.getContent(1);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getContent(1);
        }
    }

    searchItem = async (query, page) => {
        const result = await ClientService.searchItem(query, page);
        return result;
    }

    renderContent() {
        return(
            <div style={{ alignContent: 'center' }}>
                {this.state.type == CONTENT_TYPE.SEARCH && <Search/>}
                {this.state.data && <List data={this.state.data} type={this.state.type}/>}
                {!!this.state.data && this.state.data.length > 0 && <Paginator totalPages={this.state.totalPages} maxPagesToShow={20} paginate={page => this.getContent(page)}/>}
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
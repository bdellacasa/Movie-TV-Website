import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ClienteService from '../services/ClientService';
import SearchIcon from '../icons/search-24px.svg';
import { CONTENT_TYPE } from '../Constants';

export default class Search extends Component {
  state = {
    query: '',
    toResults: false
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  }

  handleOnKeyPress = (event) => {
    if (event.charCode == '13'){
        // Enter pressed
        this.setState({
            toResults: true
        });
    }
  }

  render() {
    if (this.state.toResults === true) {
      return <Redirect to={`/list/search/${this.state.query}`} />
    }
    return (
        <div className={"search-container"}>
            <img className={"search-icon"} src={SearchIcon}/>
            <form>
                <input
                    id={"search_form"}
                    className={"search-form"}
                    placeholder="Search for movie, serie or person..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleOnKeyPress}
                />
            </form>
        </div>
    )
  }
}
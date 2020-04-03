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

  navigate() {
    if (this.state.query.length > 0) {
      this.setState({
        toResults: true
      });
    }
  }

  handleOnKeyPress = (event) => {
    if (event.charCode == '13'){
        // Enter pressed
        this.navigate();
    }
  }

  render() {
    if (this.state.toResults === true) {
      return <Redirect to={`/list/search/${this.state.query}`} />
    }
    return (
        <div className={"search-container"}>
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
            <button className={"search-button"} onClick={() => this.navigate()}>Search</button>
        </div>
    )
  }
}
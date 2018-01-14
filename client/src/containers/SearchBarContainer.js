import React, { Component } from 'react';
import { SearchBar } from "../components/SearchBar";

class SearchBarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: ""
        }
    }

    updateKeywords(keywords) {
        this.setState({keywords});
    }

    performSearch() {
        this.props.requestJson(this.state.keywords);
    }

    render() {
        return (
            <SearchBar
                performSearch={this.performSearch.bind(this)}
                updateKeywords={this.updateKeywords.bind(this)}
            />
        )
    }
}

export default SearchBarContainer;
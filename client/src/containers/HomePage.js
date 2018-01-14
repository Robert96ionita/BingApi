import React, { Component } from 'react';
import SearchBarContainer from './SearchBarContainer';
import {Item} from "../components/Item";
import {NavBar} from "../components/NavBar";

import { requestFactory } from "../api/RequestFactory";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                results: []
            },
            likedShows: []
        }
    }

    requestJson(query) {
        fetch('http://localhost:5000/api/search/shows?name=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        }).then((result) => {
            return result.json();
        }).then((result) => {
            this.setState({search: result});
            console.log(this.state.search);
        });
    }

    like(id) {
        requestFactory.likeShow(1, id).then(res => {
            let newLikedShows = this.state.likedShows;
            newLikedShows.push(id);
            this.setState({likedShows: newLikedShows});
        });
    }

    render() {
        let searchResults = [];
        for (const result of this.state.search.results) {
            searchResults.push(<div key={result.id}>
                <Item
                    name={result.name}
                    rating={result.rating}
                    id={result.id}
                    posterPath={result.posterPath}
                    summary={result.summary}
                    liked={this.state.likedShows.includes("" + result.id, 0)}
                    like={this.like.bind(this)}/>
                </div>
            );
        }

        return (
            <div>
                <NavBar/>
                <div className={"search-bar-container"}>
                    <SearchBarContainer requestJson={this.requestJson.bind(this)}/>
                </div>
                <div className={"search-results"}>
                    {searchResults.length > 0 &&
                        searchResults
                    }
                </div>
            </div>
        );
    }
}

export default HomePage;
import React, { Component } from 'react';
import {NavBar} from "../components/NavBar";
import { requestFactory } from "../api/RequestFactory";
import {Item} from "../components/Item";

class FavouritesPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.getShows(1).then(async res => {
            await this.setStateAsync({shows: res});
        })
    }

    async getShows(userid) {
        return await requestFactory.getFavouriteShows(userid , async res => {
            let shows = [];
            for (let show of res) {
                requestFactory.getShow(show.showId, async res => {
                    shows.push(res);
                });
            }

            return shows;
        });
    }

    render() {
        console.log(this.state.shows);
        if (this.state.shows.length > 0) {
            let searchResults = [];
            for (const result of this.state.shows) {
                searchResults.push(<div key={result.id}>
                        <Item
                            name={result.name}
                            rating={result.rating}
                            id={result.id}
                            posterPath={result.posterPath}
                            summary={result.summary}
                            liked={true}/>
                    </div>

                );
            }

            return (
                <div>
                    <NavBar/>
                    <div className={"search-results"}>
                        {searchResults.length > 0 &&
                            searchResults
                        }
                    </div>
                </div>
            );
        } else {

            return (
                <div>
                    <NavBar/>
                    <div className={"search-results"}>
                        <strong>No favourites yet...</strong>
                    </div>
                </div>
            )
        }
    }

}

export default FavouritesPageContainer;
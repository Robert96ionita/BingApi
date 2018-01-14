import React, { Component } from 'react';
import { history } from '../api/history';

import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { PrivateRoute } from '../security/PrivateRoutes';

import HomePage from '../containers/HomePage';
import FavouritesPageContainer from "../containers/FavouritesPageContainer";
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { RegisterPageContainer } from '../containers/RegisterPageContainer';

import '../style/App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"main"}>
                <div className="jumbotron">
                    <div className="container">
                        <div className="col-sm-8 col-sm-offset-2">
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path='/' component={HomePage} />
                                    <PrivateRoute path='/favourites' component={FavouritesPageContainer} />
                                    <Route path="/login" component={LoginPageContainer} />
                                    <Route path="/register" component={RegisterPageContainer} />
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(App);
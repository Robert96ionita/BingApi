import React from 'react';

export function NavBar(props) {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"></button>
                    <span className="navbar-brand" href="#">BingoSearch</span>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/favourites">Favourites</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href=""><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
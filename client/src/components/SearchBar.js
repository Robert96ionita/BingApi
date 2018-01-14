import React from 'react';

export function SearchBar(props) {
    return (
        <div align={'center'} className={'form-inline search-bar'}>
            <div><h1>Search for any tv-series!</h1></div>
            <div className={'form-group'}>
                <div className="inner-addon right-addon">
                    <i className="glyphicon glyphicon-search"/>
                    <input
                        type="text"
                        className="form-control"
                        onChange={event => props.updateKeywords(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' ? props.performSearch() : null}
                    />
                </div>
            </div>
        </div>
    )
}
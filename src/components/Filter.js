// Filter.js

import React, { Component } from 'react';


class Filter extends Component {

    showList() {
        let listFilter = document.getElementsByTagName('aside');
        if(listFilter[0]) {
            listFilter[0].classList.add('open')
        }  
    }

    render = () => {

        const { handleQuery } = this.props;

        return (
            <nav className="navbar">
                <div className="navbar-header">
                    <h1 tabIndex="0" className="site-name">Discover Japan</h1>
                    <div className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <input 
                                aria-label = "Input to filter places:"
                                className = "form-control" 
                                id = "search-input" 
                                type = "search"  
                                placeholder = "click here to filter"
                                autoComplete= "Input to filter places"
                                tabIndex = "1"
                                onChange = {(event) => handleQuery(event.target.value)}
                                onFocus = {() => this.showList()}
                                />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Filter;
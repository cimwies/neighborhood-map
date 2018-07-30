// ListFilter.js

import React, { Component } from 'react';


class ListFilter extends Component {

    closeList() {
        let listFilter = document.getElementsByTagName('aside');
        listFilter[0].classList.remove('open')
    }

    setMarker(place) {
        place.populateInfoWindow(place.marker, place.props.largeInfowindow)
    }

    handlerKeyPress(event, location) {
        if (event.key === " " || event.key === "Enter") {
            // Prevent the default action to stop scrolling when space is pressed
            event.preventDefault();
            this.setMarker(location);
        }
    }

    render = () => {

        const { locationsGoogle } = this.props;

        return (
            <aside className="list-wrapper" >
                <button aria-label="Close button of filter list"  id="close-btn" className="close-list-wrapper-btn" onClick={() => this.closeList()}>
                </button>
                <h2 className="places">List of favorite places</h2>
                <div className="list-wrapper-content">
                    <ul tabIndex="0" role="tablist" aria-label="List of beautiful places" className="list-of-places">
                        {locationsGoogle.filter( location => location.marker.visible === true).map((location, index) => (
                            <li tabIndex = "0" 
                                role = "button" 
                                key = {index} 
                                onKeyPress = {(event) => this.handlerKeyPress(event, location)}                                  
                                onClick = {(e) => this.setMarker(location)}
                                >
                                {location.props.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        );
    }
}

export default ListFilter;
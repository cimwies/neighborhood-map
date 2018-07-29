// App.js

import React, { Component } from 'react';
import './css/stylesheet.css';
import { GoogleApiWrapper } from 'google-maps-react'; 
import * as locations from './data/locations';
import MapContainer from './components/MapContainer';
import Filter from './components/Filter';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationsGoogle: []
        }
        this.markersGoogle = [];
        this.onChangeMarker = this.onChangeMarker.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
    }

    onChangeMarker(marker) {
        this.markersGoogle.push(marker);
        if(this.markersGoogle.length === locations.locations.length) {
            this.setState({locationsGoogle: this.markersGoogle})
        }
    }

    handleQuery(query) {
        let result = this.state.locationsGoogle.map( location => {
            let matched = location.props.name.toLowerCase().indexOf(query) >= 0;
            if (location.marker) {
                location.marker.setVisible(matched);
            }
            return location;
        })
        this.setState({ locationsGoogle: result });   
    }

    render = () => {

        return (
            <div className="App">
                <Filter handleQuery={this.handleQuery} />
                <MapContainer 
                  google={this.props.google}
                  onChangeMarker={this.onChangeMarker}
                  locationsGoogle={this.state.locationsGoogle} />
            </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxdeJwMi4t0vRJ9caA3W5okHasUWracC4',
})(App)
// Map.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyles from '../data/mapStyles';
import * as constants from '../data/constants';
import * as locations from '../data/locations';
import Marker from './Marker';


class Map extends Component {

    componentDidMount() { 
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const divMapElement = ReactDOM.findDOMNode(mapRef);

            //setup the Map
            const { lat, lng } = constants.neighborhood;
            const center = new maps.LatLng(lat, lng);
            const mapObj = Object.assign({}, {
                  center: center,
                  zoom: mapStyles.zoom,
                  styles: mapStyles.styles,
                  mapTypeControl: mapStyles.mapTypeControl
            })
            
            //inst. the map            
            this.map = new maps.Map(divMapElement, mapObj);
            //unique instance of Bounds
            this.bounds = new google.maps.LatLngBounds();
            //unique instance of infoWindow
            this.largeInfowindow = new google.maps.InfoWindow();

            //resize the map 
            checkSizeWindow(window);
            maps.event.addDomListener(window, 'resize', function(e) {
                checkSizeWindow(e.currentTarget)
            });

            function checkSizeWindow(objWindow){
                if(objWindow.innerWidth < 475) {
                    divMapElement.style.height = 'calc(100vh - 53px)';
                } else {
                    divMapElement.style.height = 'calc(100vh - 53px)';
                }
            }

            //force the update here to get this.map filled         
            this.forceUpdate();
        } else {
            console.log('Ops! We cant access Google Maps API for now!')
            let mapContainerElemt = document.querySelector('.main-container');
            mapContainerElemt.innerHTML = '<div class="error-msg">Ops! We cant access Google Maps API for now! </div>'
        }
    }

    render = () => {

        const style = {
            width: '100%',
            height: '100vh'
          }

        const { onChangeMarker } = this.props;

        return (
            <div ref='map' style={style} className="main-container" >
                Loading map...
                {locations.locations.map( (location, index) => (
                    <Marker   
                        key = {index} 
                        google = {this.props.google}
                        map = {this.map}
                        name = {location.name}
                        position ={location.coordinates} 
                        bounds = {this.bounds}
                        largeInfowindow = {this.largeInfowindow}
                        onChangeMarker = {onChangeMarker} 
                        icon = {location.icon}
                        thumbnailSource = {location.thumbnailSource}
                        source = {location.source}
                        wikipedia = {location.wikipedia}
                        wikipediaSource = {location.wikipediaSource}
                        />
                ))}
            </div>
        );
    }
}

export default Map;
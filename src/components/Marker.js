// Marker.js
// https://transform.now.sh/

import { Component } from 'react';
import PropTypes from 'prop-types';


class Marker extends Component {


    componentDidUpdate(prevProps) {

        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }


    renderMarker = () => {

        if (this.marker) {
            this.marker.setMap(null);
        }

        let { map, google, position, bounds, largeInfowindow, onChangeMarker, icon } = this.props;
          
        let pos = position;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position,
            icon: icon
        };

        this.marker = new google.maps.Marker(pref);
        const marker = this.marker;

        // Create an onclick event to open the large infowindow at each marker.
        let self = this;
        marker.addListener('click', function() {
            self.populateInfoWindow(this, largeInfowindow);
        });

        onChangeMarker(this);

        bounds.extend(marker.position);
        map.fitBounds(bounds); 
    }


    populateInfoWindow(marker, infowindow, name) {

        // Prevent opening a window of an already selected marker .
        if (infowindow.marker !== marker) {

            const { map, google, bounds, name, thumbnailSource, source, wikipedia, wikipediaSource } = this.props;

            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 700);

            infowindow.setContent('Loading...');

            fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${wikipediaSource.replace(/\s/g, '_')}&exintro=1`, {
                headers: {
                    'Origin': 'https://cimwies.github.io/',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(response => response.json())
            .then(response => {
                let wikiData = '';
                let element = response.query.pages[Object.keys(response.query.pages)[0]];
                wikiData = element.extract;
                addWikiInfos(wikiData)
            })     
            .catch(error => requestError(error, 'wikipedia'));


            function addWikiInfos(wikiData) {
           
                let htmlResult = '';

                if (wikiData) {  

                    htmlResult =  '<div class="infowindow-content"><h4>' + name + '</h4>' +
                                  '<img src="' + thumbnailSource + '" alt="preview thumbnail of ' + name + '" tabIndex="0" />' +
                                  '<p class="flex">' +
                                  '<a href="' + wikipedia + '" target="_blank" title="Link to Wikipedia Website">to Wikipedia</a>' +
                                  '<a href="' + source + '" target="_blank" title="Link to ' + name + ' Website">to Website</a>' +
                                  '</p>' +
                                  '<hr />' +
                                  '<h4 tabIndex="0">Infos</h4>' +
                                  '<div tabIndex="0">' + wikiData + '<div/>' +
                                  '<p class="wiki-info">Information provided by Wikipedia</p></div>';
                } else {

                    htmlResult =  '<div class="infowindow-content"><h4>' + name + '</h4>' +
                                  '<img src="' + thumbnailSource + '" alt="preview thumbnail of ' + name + '" tabIndex="0" />' +
                                  '<p class="flex">' +
                                  '<a href="' + source + '" target="_blank"> to Website</a>' +
                                  '</p>' +
                                  '<hr />' +
                                  '<h4 tabIndex="0">Infos</h4>' +
                                  '<div tabIndex="0"><p class="wiki-warning">Sorry - Unfortunately, no information was returned from Wikipedia.</p><div/>';
                }                  
                   
                infowindow.setContent(htmlResult);
            }
            
            //if Error in Request
            function requestError(error, part) {
                console.log(error);
                infowindow.setContent(`<div class="infowindow-content"><h4>  ${name} </h4>
                                      <img src="${thumbnailSource}" alt="preview thumbnail of ${name}" tabIndex="0" />
                                      <p class="flex">
                                      <a href="${source}" target="_blank">to Website</a>
                                      </p>
                                      <hr />
                                      <h4 tabIndex="0">Infos</h4>
                                      <div tabIndex="0"><p class="wiki-warning">Unfortunately, no information was returned from Wikipedia.</p><div/>`);
            }            
            
            infowindow.marker = marker;
    
            // Make sure that the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });

            infowindow.open(map, marker);
            map.fitBounds(bounds);
            map.panTo(marker.getPosition());
            map.panBy(0, -200);
        }
    }


    render = () => {
        return null;   
    }
}

export default Marker;

Marker.propTypes = {
    map: PropTypes.object
}   





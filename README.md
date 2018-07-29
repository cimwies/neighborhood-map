# Neighborhood Map: Discover Japan

Udacity FEND Nanodegree Program - Project #8

## Table of Contents

* Specification
* How to view
* Souces used in code
* Info material

### Specification

Neighborhood Map: Discover Japan is a single page application featuring a Google map of interesting places in Japan. Each place is shown by default with an individual maker. There is a marker type for historcal towns, for zen garden, for temples and for bamboo gardens. Clicking on one of the markers will open the Google InfoWindow containing information about that place.

The InfoWindow content includes:

* Title of place
* A thumnbail image
* If available a link to the Wikipedia Website
* A link to the Website
* A Wikipedia excerpt using the Wikipedia API

Filtering the stored places is possible using the filter function. It will show a list of either all available places or the ones that match the typed text.

### How to view

#### Development mode

1. Clone the repo using this command:

```sh
git clone https://github.com/cimwies/myreads.git
```

2. Install
* Dependencies: [Node.js](https://nodejs.org/en/) v0.12.7 or above
* Then checkout the project and run:

```sh
npm install
```

3. Running

```sh
npm start
```

4. Using the app

With your server running, visit the site: `http://localhost:3000`, and discover some intersting places in Japan.

PLEASE NOTE: The service workers for this app will only cache the site when it is in production mode.

#### Production Mode

1. First run the command

```sh
npm run build
```

2. Navigate to the build directory and run a localhost server. If you have Python 2.x installed you can run the Python Simple Server like this.

```sh
python -m SimpleHTTPServer 8080
```

For Python 3.x, the command is:

```sh
-m http.server 8080
```

3. Navigate to http://localhost:8000 in your browser


### Sources used in Code

* [React JavaScript library](https://reactjs.org/)
* [GoogleMaps API](https://cloud.google.com/maps-platform/)
* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
* [module: prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html)
* [module: google-maps-react](https://www.npmjs.com/package/google-maps-react)
* [module: react-router-dom](https://www.npmjs.com/package/react-router-dom)





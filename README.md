# portal-js

####***CURRENTLY BEING REFACTORED TO USE ES6 FEATURES***

This library intends to make it easier to work with the [ArcGIS REST API](http://www.arcgis.com/apidocs/rest/)
by providing several different classes and utilities for working with content and users in [ArcGIS Online](http://www.arcgis.com/home/) and [Portal for ArcGIS](http://www.esri.com/software/arcgis/portal-for-arcgis).

This library is using the new syntax and [capabilities in ES 2015](https://github.com/lukehoban/es6features). 

#### Using Gulp to build the library
This project uses [Gulp](http://gulpjs.com/) to translate the javascript to ES5 for browser compatibility and to compile the library into an AMD compatibile format.
  * Download and install [node.js](http://nodejs.org/).
  * [Fork and clone](https://help.github.com/articles/fork-a-repo/) this project.
  * Go to the project folder in your terminal or command prompt and run `npm install`. (This should automatically download the project's dependencies, including Gulp).
  * Run `gulp build` at the command line.
  * An optimized build of the app will be generated in the `build` folder.

#### Using the built library in your app


```javascript
require(["portal/portal"], function (portal) {

      var myPortal = new portal.Portal({
        url: "https://www.arcgis.com/"
      });
      
      // do stuff with myPortal
      
});   
```
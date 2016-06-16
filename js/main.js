// Smooth Scroll config after the page is ready
$(document).ready(function(){
	var nav= $('.navbar-fixed-top');

	$(window).scroll(function(){
		var scroll =  $(window).scrollTop();
		if(scroll>=900){
			nav.addClass('effect');
		}else{
			nav.removeClass('effect');
		}
	});

});

// Work around for fixing the collapsible menu not closing after selecting the list item ( courtesy:Stack Over Flow)
 $(document).on('click', function(event){
      var $clickedOn = $(event.target),
          $collapsableItems = $('.collapse'),
          isToggleButton = ($clickedOn.closest('.navbar-toggle').length == 1),
          isLink = ($clickedOn.closest('a').length == 1),
          isOutsideNavbar = ($clickedOn.parents('.navbar').length === 0);

      if( (!isToggleButton && isLink) || isOutsideNavbar ) {
        $collapsableItems.each(function(){
          $(this).collapse('hide');
        });
      }
    });


var map;    // declares a global map variable


/*
nitializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: false
  };

  /* 
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js. 
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


 

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.name;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name,
      animation:google.maps.Animation.DROP
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    
    google.maps.event.addListener(marker, 'click', function() {
       infoWindow.open(map,marker);
       map.setZoom(8);
       map.setCenter(marker.getPosition());
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings 
  locations =       ["TVS Lakshmi Matriculation Higher Secondary School , Madurai",
                     "Thiagarajar Engineering College ,Madurai ",
                     "Global Education Center Infosys , Mysore",
                     "Infosys Limited , Sholinganallur ,Chennai",
                     "Infosys Limited , Mahindra City , Chennai ",
                     "BNSF Railways Head Quarters , Fortworth",
                     "Maximus ,Austin"];

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});


 

// SmoothScroll configuration
smoothScroll.init({
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    callback: function ( toggle, anchor ) {} // Function to run after scrolling
});
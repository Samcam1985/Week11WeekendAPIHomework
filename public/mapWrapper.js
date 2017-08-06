var MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords, 
    zoom: zoom
  });
  this.markers = [];
}

MapWrapper.prototype = {
  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      name: coords.name,
      description: coords.description
    });

    var contentString = '<div><strong>'+ marker.name + '</strong></div><span>'+ marker.description +'</span>'

    var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            marker.addListener('click', function() {
              infowindow.open(this.googleMap, marker);

            });

    this.markers.push(marker);

      },



      addClickEvent: function(){
        google.maps.event.addListener(this.googleMap, 'click', function(event) {
          var position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          this.addMarker(position);

        }.bind(this));
      },
     
      hogwartsExpressMarker: function() {
        this.googleMap.setCenter({lat: 51.5322, lng: -0.1240});
      }

  

    }
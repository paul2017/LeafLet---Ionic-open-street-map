/**
 * Created by gkopevski on 11/10/14.
 */
angular.module('app').controller('MapsController',
 [ '$scope','$window', 
 function ($scope, $window) {

   // $scope.menu = JSON.parse(localStorage.getItem("menu"));

    $scope.markers = [];
   // $scope.height = $window.innerHeight;
   // $scope.width = $window.innerWidth;
   // $scope.center = {};
   // var defaultLat = ,
    //    defaultLng = ;
		
	 $scope.center = {
            lat: 6.5997,
            lng: 3.3566,
            zoom: 12
        };
		
     $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          //markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };
 //   navigator.geolocation.getCurrentPosition(onSuccessGeoLocation, onErrorGeolocation, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
 /**     $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 15;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };
    function onSuccessGeoLocation(position) {
        $scope.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 15
        };
        showOurCurrentLocation();
      //  loadPharmacy();
    }

    function onErrorGeolocation(error) {
        logDebug("Error getting geolocation: " + JSON.stringify(error));
        $scope.center = {
            lat: defaultLat,
            lng: defaultLng,
            zoom: 15
        };
        showOurCurrentLocation();
      //  loadPharmacy();
    }

    function loadPharmacy(){
        $scope.Pharmacy = dssService.getVenuesByCategory($scope.center.lat, $scope.center.lng, dssService.categories.Pharmacy).then(
            function (success) {
                success.data.response.groups[0].items.forEach(function (place) {
                    $scope.markers.push({
                        lat: place.venue.location.lat,
                        lng: place.venue.location.lng,
                        message: place.venue.name
                    });
                });
            },
            function (error) {
            });
    } */

    function showOurCurrentLocation() {
        $scope.markers.push({
            lat: $scope.center.lat,
            lng: $scope.center.lng,
            message: "Our current location"
        });
    } 
}]);
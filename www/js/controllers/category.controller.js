; (function () {

    angular.module('app')
        .controller('CategoryController', CategoryController);

    function CategoryController($scope, category, POI, CONSTANTS, $state, $stateParams, $ionicLoading, $log, leafletData) {
        this.$scope = $scope;
        this.$ionicLoading = $ionicLoading;
        this.leafletData = leafletData;
        this.POI = POI;
        this.$log = $log;
        this.category = category;
        this.topResults = [];
        this.results = [];
        this.defaults = CONSTANTS.MAP_DEFAULTS;
        this.center = null;
        this.userIcon = CONSTANTS.MAP_DEFAULTS.userIcon;
        this.load();
        this.buildMarkers();
        $scope.$watch('_ctrl.name', function (name) {
            this.search(name);
            if (name === '')
                this.buildMarkers();
        }.bind(this));
        //$state.go('dashboard.category.list', {}, { location: 'replace' });
    };

    CategoryController.prototype.load = function () {
        var that = this;

        this.$ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });

        return this.POI
            .top10(this.category.id)
            .then(function (data) {
                var apply = function () {
                    that.topResults = data;
                };
                if (!that.$scope.$$phase) {
                    that.$scope.$apply(apply);
                } else {
                    apply();
                }
            })
            .then(function () {
                that.$ionicLoading.hide();
                that.buildMarkers();
            })
            .catch(function (err) {
                that.$log.error(err);
                that.$ionicLoading.show({
                    template: 'Cannot load data',
                    duration: 1000 * 3
                });
            });
    };

    CategoryController.prototype.search = function (name) {
        if (!name || name.length < 3) {
            this.results = [];
            return;
        }

        this.searching = true;

        return this.POI
            .search(name)
            .then(function (data) {
                this.results = data;
            }.bind(this))
            .catch(function (err) {
                this.$ionicLoading.show({
                    template: err.message || JSON.stringify(err),
                    duration: 1000 * 3
                });
            }.bind(this))
            .then(function () {
                this.searching = false;
                this.buildMarkers();
            }.bind(this));
    };

    CategoryController.prototype.buildMarkers = function () {
        this.markers = this.name ? this.results : this.topResults;
        // save owner location
        var onwerLoc = null;
        if (this.markers.length > 0) {
            onwerLoc = { lat: this.markers[0].slatitude || 0, lng: this.markers[0].slongitude || 0 };
        }

        this.markers = this.markers.map(function (item) {
            return {
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude),
                message: item.name,
                focus: true,
                draggable: false
            };
        });

        // add to marker owner location
        if (onwerLoc)
            this.markers.push(angular.extend(onwerLoc, {
                icon: this.userIcon,
                message: 'You',
                focus: true,
                draggable: false
            }));

        this.center = this.adjustPosition(this.markers);
        return this.markers;
    };

    CategoryController.prototype.adjustPosition = function (places) {
        var lat = 0, lng = 0;

        if (places.length == 0) {
            return null;
        }

        for (var i = 0; i < places.length; i++) {
            lat += places[i].lat;
            lng += places[i].lng;
        }

        lat = lat / places.length;
        lng = lng / places.length;



        return { lat: lat, lng: lng, zoom: 10 };
    };

    CategoryController.$inject = ['$scope', 'category', 'POI', 'CONSTANTS', '$state', '$stateParams', '$ionicLoading', '$log', 'leafletData'];






    // angular.module('app').controller('MapController',
    //   [ '$scope',
    //     '$cordovaGeolocation',
    //     '$stateParams',
    //     '$ionicModal',
    //     '$ionicPopup',
    //     function(
    //       $scope,
    //       $cordovaGeolocation,
    //       $stateParams,
    //       $ionicModal,
    //       $ionicPopup
    //       ) {

    //       /**
    //        * Once state loaded, get put map on scope.
    //        */
    //       $scope.$on("$stateChangeSuccess", function() {

    //         $scope.locations = [
    //     {
    //       name : "Washington D.C., USA",
    //       lat : 38.8951100,
    //       lng : -77.0363700
    //     },
    //     {
    //       name : "London, England",
    //       lat : 51.500152,
    //       lng : -0.126236
    //     },
    //     {
    //       name : "Paris, France",
    //       lat : 48.864716,
    //       lng : 2.349014
    //     },
    //     {
    //       name : "Moscow, Russia",
    //       lat : 55.752121,
    //       lng : 37.617664
    //     },
    //     {
    //       name : "Rio de Janeiro, Brazil",
    //       lat : -22.970722,
    //       lng : -43.182365
    //     },
    //     {
    //       name : "Sydney, Australia",
    //       lat : -33.865143,
    //       lng : 151.209900
    //     }

    //   ];
  
    //         $scope.newLocation;

    //         if(!InstructionsService.instructions.newLocations.seen) {

    //           var instructionsPopup = $ionicPopup.alert({
    //             title: 'Add Locations',
    //             template: InstructionsService.instructions.newLocations.text
    //           });
    //           instructionsPopup.then(function(res) {
    //             InstructionsService.instructions.newLocations.seen = true;
    //             });

    //         }

    //         $scope.map = {
    //           defaults: {
    //             tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    //             maxZoom: 18,
    //             zoomControlPosition: 'bottomleft'
    //           },
    //           markers : {},
    //           events: {
    //             map: {
    //               enable: ['context'],
    //               logic: 'emit'
    //             }
    //           }
    //         };

    //         $scope.goTo(0);

    //       });

    //       var Location = function() {
    //         if ( !(this instanceof Location) ) return new Location();
    //         this.lat  = "";
    //         this.lng  = "";
    //         this.name = "";
    //       };

    //       $ionicModal.fromTemplateUrl('templates/addLocation.html', {
    //         scope: $scope,
    //         animation: 'slide-in-up'
    //       }).then(function(modal) {
    //           $scope.modal = modal;
    //         });

    //       /**
    //        * Detect user long-pressing on map to add new location
    //        */
    //       $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
    //         $scope.newLocation = new Location();
    //         $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
    //         $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
    //         $scope.modal.show();
    //       });

    //       $scope.saveLocation = function() {
    //         LocationsService.savedLocations.push($scope.newLocation);
    //         $scope.modal.hide();
    //         $scope.goTo(LocationsService.savedLocations.length - 1);
    //       };

    //       /**
    //        * Center map on specific saved location
    //        * @param locationKey
    //        */
    //       $scope.goTo = function(locationKey) {

    //         var location = LocationsService.savedLocations[locationKey];

    //         $scope.map.center  = {
    //           lat : location.lat,
    //           lng : location.lng,
    //           zoom : 12
    //         };

    //         $scope.map.markers[locationKey] = {
    //           lat:location.lat,
    //           lng:location.lng,
    //           message: location.name,
    //           focus: true,
    //           draggable: false
    //         };

    //       };

    //       /**
    //        * Center map on user's current position
    //        */
    //       $scope.locate = function(){

    //         $cordovaGeolocation
    //           .getCurrentPosition()
    //           .then(function (position) {
    //             $scope.map.center.lat  = position.coords.latitude;
    //             $scope.map.center.lng = position.coords.longitude;
    //             $scope.map.center.zoom = 15;

    //             $scope.map.markers.now = {
    //               lat:position.coords.latitude,
    //               lng:position.coords.longitude,
    //               message: "You Are Here",
    //               focus: true,
    //               draggable: false
    //             };

    //           }, function(err) {
    //             // error
    //             console.log("Location error!");
    //             console.log(err);
    //           });

    //       };

    //     }]);

})();
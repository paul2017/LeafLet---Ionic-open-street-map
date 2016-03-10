; (function () {

	angular.module('app')
		.controller('SearchController', SearchController);

	function SearchController($scope, POI, $state, $stateParams, $ionicLoading, $cordovaLaunchNavigator, $log) {
		this.$scope = $scope;
		this.POI = POI;
		this.$log = $log;
		this.$ionicLoading = $ionicLoading;
		this.$cordovaLaunchNavigator = $cordovaLaunchNavigator;
		this.results = [];

		$scope.$watch('_ctrl.name', function (name) {
			this.search(name)
		}.bind(this));
	};

	SearchController.prototype.search = function (name) {
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
			}.bind(this));
	};

	SearchController.prototype.open = function (current) {
		var destination = [current.latitude, current.longitude];
		var start = [current.slatitude, current.slongitude];

		this.$cordovaLaunchNavigator.navigate(destination, start)
			.then(function () {
				this.$log.log('Navigator launched');
			}.bind(this), function (err) {
				this.$log.error(err);
				this.$ionicLoading.show({
					template: 'Cannot launch navigator',
					duration: 1000 * 3
				});
			}.bind(this));
	};

	SearchController.$inject = ['$scope', 'POI', '$state', '$stateParams', '$ionicLoading', '$cordovaLaunchNavigator', '$log'];

})();
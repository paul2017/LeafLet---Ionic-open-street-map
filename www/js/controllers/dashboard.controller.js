; (function () {

	angular.module('app')
		.controller('DashboardController', ['CONSTANTS', 'POI', '$ionicLoading', function (CONSTANTS, POI, $ionicLoading) {
			this.categories = CONSTANTS.CATEGORIES;

			this.checkin = function () {
				$ionicLoading.show({
					template: '<ion-spinner></ion-spinner>'
				});

				return POI
					.checkin()
					.then(function (data) {
						
						$ionicLoading.show({
							template: data.message || (data.ok ? 'Check In successfully saved' : 'Checkin Fails'),
							duration: 1000 * 3
						});

					})
					.catch(function (err) {
						$ionicLoading.show({
							template: err.message || JSON.stringify(err),
							duration: 1000 * 3
						});
					});
			};
		}]);
})();
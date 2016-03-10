; (function () {

	angular.module('app')
		.controller('LocationController', ['CONSTANTS', 'POI', '$state', '$ionicLoading', function (CONSTANTS, POI, $state, $ionicLoading) {
			this.categories = CONSTANTS.CATEGORIES;

			this.save = function () {
				if (!this.outlet || !this.stname || !this.stno || !this.segment) {
					$ionicLoading.show({
						template: 'All fields mandatory',
						duration: 1000 * 3
					});
					return;
				}

				$ionicLoading.show({
					template: '<ion-spinner></ion-spinner>'
				});

				POI
					.location({
						outlet: this.outlet,
						stname: this.stname,
						stno: this.stno,
						segment: this.segment.id || this.segment
					})
					.then(function (data) {
						if (!data.ok)
							console.log(data);
						$ionicLoading.show({
							template: data.message || (data.ok ? 'New location successfully saved' : 'New Location Fails'),
							duration: 1000 * 3
						});
						$state.go('dashboard.categories');
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
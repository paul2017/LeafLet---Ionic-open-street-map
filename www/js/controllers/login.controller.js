; (function () {

	angular.module('app')
		.run(['$rootScope', '$state', 'UserService', function ($rootScope, $state, UserService) {

			$rootScope.$on('$locationChangeSuccess', function (e) {
				if (UserService.isLoggedIn()) {
					//todo	
				}
			});

		}])
		.controller('LoginController', LoginController)


	function LoginController($scope, $rootScope, $state, UserService, $ionicLoading, $log) {
		this.$ionicLoading = $ionicLoading;
		this.$log = $log;
		this.$rootScope = $rootScope;
		$scope.submit = this.submit.bind(this, $scope, $state, UserService);
		UserService.logout();
		/** reset **/
		$scope.username = '';
		$scope.password = '';
		$scope.hasServerError = false;
	}

	LoginController.prototype.submit = function ($scope, $state, UserService, valid, username, password) {
		if (!valid)
			return false;

		$scope.hasServerError = false;

		this.$ionicLoading.show({
			template: '<ion-spinner></ion-spinner>'
		});

		UserService.login(username, password)
			.then(function (res) {
				if (res) {
					this.$rootScope.username = username;					
					$state.go('dashboard.categories');
				} else {
					$scope.hasServerError = true;
				}
			}.bind(this))
			.then(function () {
				this.$ionicLoading.hide();
			}.bind(this))
			.catch(function (err) {
				this.$log.error(err);
				this.$ionicLoading.show({
					template: err.message || JSON.stringify(err),
					duration: 1000 * 3
				});
			}.bind(this))


		return false;
	};

	LoginController.$inject = ['$scope', '$rootScope', '$state', 'UserService', '$ionicLoading', '$log'];

})();
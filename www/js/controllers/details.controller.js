; (function () {

	angular.module('app')
		.controller('DetailsController', DetailsController);

	function DetailsController(current, CONSTANTS, UserService, POI, $cordovaLaunchNavigator, $ionicLoading, $log) {
		this.location = current;
        this.options = CONSTANTS.COMMENT_OPTIONS;
        this.POI = POI;
        this.UserService = UserService;
        this.$ionicLoading = $ionicLoading;

		this.open = function () {
			var destination = [current.latitude, current.longitude];
			var start = [current.start.latitude, current.start.longitude];

			$cordovaLaunchNavigator.navigate(destination, start).then(function () {
				$log.log('Navigator launched');
			}, function (err) {
				$log.error(err);
				$ionicLoading.show({
					template: 'Cannot launch navigator',
					duration: 1000 * 3
				});
			});
		};			
	};
    
    DetailsController.prototype.submit = function(valid, comment){
        if(!valid)
            return;
            
        var post = {
          username: this.UserService.currentUser(),
          gid: this.location.gid,
          name: this.location.name,
          comment: comment.value
        };
        
        console.log(post);
        
        this.$ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
        
        this.POI.postComment(post)
            .then(function (data) {
                this.$ionicLoading.show({
                    template: data.message || 'Comment successfully saved',
                    duration: 1000 * 3
                });
            }.bind(this))
            .catch(function (err) {
                this.$log.error(err);
                this.$ionicLoading.show({
                    template: 'Cannot load data',
                    duration: 1000 * 3
                });
            }.bind(this));
        
        return false;
    };


	DetailsController.$inject = ['current', 'CONSTANTS', 'UserService', 'POI', '$cordovaLaunchNavigator', '$ionicLoading', '$log'];
})();
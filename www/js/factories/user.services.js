; (function () {
	/**
	 * username: Wumi
	 * pass: 112233445566
	 */
	angular.module('app')
		.factory('UserService', ['$rootScope', '$fetch', '$window', 'CONSTANTS', function ($rootScope, $fetch, $window, CONSTANTS) {

			var srv = {
				login: function (username, password) {
					srv.logout();

					return $fetch
						.json(CONSTANTS.LOGIN_URL, {
							method: 'POST',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							body: 'userbase_username=' + username + '&userbase_password=' + password
						})
						.then(function (data) {
							if (data && data.site_session && data.checksum) {
                                //verify reponse
                                var checksum = sha256(CONSTANTS.KEY  + data.site_session);
                                if(data.checksum!==checksum){
                                    return false;
                                }
                                
								$window.localStorage.setItem('session', data.site_session);
								$window.localStorage.setItem('username', username);
								return true;
							}
							return false;
						});
				},
				isLoggedIn: function () {
					return !!$window.localStorage.session;
				},
				logout: function () {
					$window.localStorage.removeItem('session');
					$window.localStorage.removeItem('username');
				},
				currentUser: function () {
					return $window.localStorage.getItem('username');
				}
			};

			return srv;
		}]);
})();
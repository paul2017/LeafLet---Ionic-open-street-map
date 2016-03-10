; (function () {

	angular.module('app')
		.factory('$fetch', ['$window', '$q', '$state', 'CONSTANTS', function ($window, $q, $state, CONSTANTS) {
			// hot fix
			$window.Promise = $window.Promise ? $window.Promise : $q;

			var srv = {
				raw: function (input, init) {
					/**
					 * inject auth and device data
					 *  */
					init = angular.extend({}, init);
					init.headers = angular.extend({ 'X-User-Agent': CONSTANTS.X_USER_AGENT }, init.headers);

					if ($window.localStorage.session) {
						init.headers.Cookie = CONSTANTS.SESSION_KEY + '=' + $window.localStorage.session;
					}
					
					/** make request */
					return cordovaFetch(input, init)
						.then(function (response) {
							if (response.status === '401' || response.status === 401) {
								$window.localStorage.removeItem('session');
								$state.go('login');
								return $q.reject(response);
							}
							return response;
						});
				},
				json: function (url, ops) {
					return srv.raw(url, ops)
						.then(function (response) {
							if (angular.isString(response.statusText) && /^\s*(\{|\[)/.test(response.statusText)) {
								return angular.fromJson(response.statusText || {});
							} else if (angular.isObject(response.statusText)) {
								return response.statusText;
							}
							return {};
						});
				}
			};
			return srv;
		}]);
})();
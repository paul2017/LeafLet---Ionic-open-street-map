; (function () {

	angular.module('app')
		.factory('POI', ['CONSTANTS', '$fetch', 'UserService', '$cordovaGeolocation', '$q', function (CONSTANTS, $fetch, UserService, $cordovaGeolocation, $q) {
			var srv = {
				top10: function (categoryId) {
					var url = CONSTANTS.LOC_URL + '?type=' + categoryId;

					return $cordovaGeolocation
						.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
						.then(function (position) {
							url += '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
							return $fetch.json(url)
								.then(function (data) {
									if (Array.isArray(data)) {
										return data.map(function (item) {
											item.distance = srv.distance(position.coords.latitude, position.coords.longitude, item.latitude, item.longitude, 'K');
											item.slatitude = position.coords.latitude;
											item.slongitude = position.coords.longitude;
											return item;
										});
									}
									return $q.reject('Cannot load data');
								});
						});
				},
				distance: function (lat1, lon1, lat2, lon2, unit) {
					var radlat1 = Math.PI * lat1 / 180
					var radlat2 = Math.PI * lat2 / 180
					var radlon1 = Math.PI * lon1 / 180
					var radlon2 = Math.PI * lon2 / 180
					var theta = lon1 - lon2
					var radtheta = Math.PI * theta / 180
					var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
					dist = Math.acos(dist)
					dist = dist * 180 / Math.PI
					dist = dist * 60 * 1.1515
					if (unit == "K") { dist = dist * 1.609344 }
					if (unit == "N") { dist = dist * 0.8684 }
					return dist
				},
				search: function (name) {
					var url = CONSTANTS.SEARCH_URL + '?name=' + name;

					return $cordovaGeolocation
						.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
						.then(function (position) {
							url += '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
							return $fetch.json(url)
								.then(function (data) {
									if (Array.isArray(data)) {
										return data.map(function (item) {
											item.distance = srv.distance(position.coords.latitude, position.coords.longitude, item.latitude, item.longitude, 'K');
											item.slatitude = position.coords.latitude;
											item.slongitude = position.coords.longitude;
											return item;
										});
									}
									return $q.reject('Cannot load data');
								});
						});
				},
				checkin: function () {

					return $cordovaGeolocation
						.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
						.then(function (position) {
							if (!UserService.currentUser()) {
								return { ok: false, message: 'Please login again' };
							}

							return $fetch
								.json(CONSTANTS.CHECKIN_URL, {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									body: 'username=' + UserService.currentUser() + '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude
								});
						});
				},
				location: function (params) {
					return $cordovaGeolocation
						.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
						.then(function (position) {
							if (!UserService.currentUser()) {
								return { ok: false, message: 'Please login again' };
							}
							params.lat = position.coords.latitude;
							params.lon = position.coords.longitude;
							params.username = UserService.currentUser();

							var body = Object.keys(params)
								.map(function (key) {
									return key + '=' + encodeURIComponent(params[key]);
								})
								.join('&');

							return $fetch
								.json(CONSTANTS.NEWLOC_URL, {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									body: body
								});
						});
				},
                postComment:function(data){
                    var body = Object.keys(data).map(function(key){
                        return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
                    }).join('&');
                    
                    return $fetch
								.json(CONSTANTS.COMMENT_URL, {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									body: body
								});
                }
			};

			return srv;
		}]);
})();
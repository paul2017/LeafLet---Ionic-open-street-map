; (function () {

    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('login', {
                    cache: false,
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                })
			/**
			 * dashboard
			 */
                .state('dashboard', {
                    url: '/dashboard',
                    abstract: true,
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: '_dashboard'
                })

                .state('dashboard.categories', {
                    url: '/categories',
                    views: {
                        'content': {
                            templateUrl: 'views/categories.html'
                        }
                    }
                })
                .state('dashboard.location', {
                    cache: false,
                    url: '/location',
                    views: {
                        'content': {
                            templateUrl: 'views/location.html',
                            controller: 'LocationController',
                            controllerAs: '_ctrl'
                        }
                    }
                })
                .state('dashboard.category', {
                    url: '/categories/:id',
                    views: {
                        'content': {
                            templateUrl: 'views/category.html',
                            controller: 'CategoryController',
                            controllerAs: '_ctrl'
                        }
                    },
                    resolve: {
                        category: function (CONSTANTS, $stateParams) {
                            var category = (CONSTANTS.CATEGORIES || []).filter(function (item) {
                                return (item.id + '').toLowerCase() === ($stateParams.id + '').toLowerCase();
                            })[0];
                            return category || {};
                        }
                    }
                })
                // .state('dashboard.category', {
                //     url: '/categories/:id',
                //     views: {
                //         'content': {
                //             templateUrl: 'views/category-parent.html',
                //             controller: 'CategoryController',
                //             controllerAs: '_ctrl'
                //         }
                //     },
                //     resolve: {
                //         category: function (CONSTANTS, $stateParams) {
                //             var category = (CONSTANTS.CATEGORIES || []).filter(function (item) {
                //                 return (item.id + '').toLowerCase() === ($stateParams.id + '').toLowerCase();
                //             })[0];
                //             return category || {};
                //         }
                //     }
                // })
                // .state('dashboard.category.list', {
                //     url: '/list',
                //     views: {
                //         'viewtype': {
                //             templateUrl: 'views/category-list.html'
                //         }
                //     }
                // })
                // .state('dashboard.category.map', {
                //     url: '/list',
                //     views: {
                //         'viewtype': {
                //             templateUrl: 'views/category-map.html'
                //         }
                //     }
                // })
                // .state('dashboard.map', {
                //     url: '/map',
                //     views: {
                //         'content': {
                //             templateUrl: 'views/map.html',
                //             controller: 'MapController',
                //             controllerAs: '_ctrl'
                //         }
                //     }
                // })
                .state('dashboard.search', {
                    url: '/search',
                    views: {
                        'content': {
                            templateUrl: 'views/search.html',
                            controller: 'SearchController',
                            controllerAs: '_ctrl'
                        }
                    }
                })

                .state('dashboard.details', {
                    url: '/details/:name/:gid/:latitude :longitude/:distance/:slatitude :slongitude',
                    views: {
                        'content': {
                            templateUrl: 'views/details.html',
                            controller: 'DetailsController',
                            controllerAs: '_ctrl'
                        }
                    },
                    resolve: {
                        current: function ($stateParams) {
                            return {
                                name: $stateParams.name,
                                latitude: $stateParams.latitude,
                                longitude: $stateParams.longitude,
                                distance: $stateParams.distance,
                                gid: $stateParams.gid,
                                start: {
                                    latitude: $stateParams.slatitude,
                                    longitude: $stateParams.slongitude
                                }
                            };
                        }
                    }
                });

            // .state('tabs.home', {
            // 	url: '/home',
            // 	views: {
            // 		'home': {
            // 			templateUrl: 'views/home.html',
            // 			controller: 'HomeController'
            // 		}
            // 	}
            // })
            // .state('tabs.maps', {
            // 	url: '/maps',
            // 	views: {
            // 		'maps': {
            // 			templateUrl: 'views/maps.html',
            // 			controller: 'MapsController'
            // 		}
            // 	}
            // })
            // .state('tabs', {
            // 	url: '/tabs',
            // 	abstract: true,
            // 	templateUrl: 'views/tabs.html'
            // });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('login');

        })
        .run(function (UserService, $state) {
            if (UserService.isLoggedIn()) {
                $state.go('dashboard.categories');
            }
        });
})();
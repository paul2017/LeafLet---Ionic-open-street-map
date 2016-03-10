/**
 * Created by gkopevski on 11/10/14.
 */
angular.module('app').controller('HomeController',
[ '$scope',
 function ($scope) {


    $scope.menu = [
        {
            "name":"Home",
            "link":"home"
        },
        {
            "name":"Maps",
            "link":"maps"
        }
    ];
    localStorage.setItem("menu",JSON.stringify($scope.menu));
    $scope.menu = JSON.parse(localStorage.getItem("menu"));

}]);
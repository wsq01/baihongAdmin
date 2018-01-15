angular.module('app').directive('appDistrict',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/districts.html'
    }
}])
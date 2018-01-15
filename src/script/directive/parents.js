angular.module('app').directive('appParents',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/parents.html'
    }
}]);

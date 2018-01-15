angular.module('app').directive('appRecords',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/records.html'
    }
}]);
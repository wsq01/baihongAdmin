angular.module('app').directive('appGartens',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/gartens.html'
    }
}])
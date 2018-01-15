angular.module('app').directive('appCategory',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/category.html'
    }
}])

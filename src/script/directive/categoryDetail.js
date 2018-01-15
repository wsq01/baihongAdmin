angular.module('app').directive('appCategoryDetail',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/categoryDetail.html'
    }
}])

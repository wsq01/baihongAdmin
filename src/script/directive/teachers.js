angular.module('app').directive('appTeachers',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/teachers.html'
    }
}]);

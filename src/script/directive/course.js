angular.module('app').directive('appCourse',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/course.html'
  }
}])

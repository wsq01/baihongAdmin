angular.module('app').directive('appStudents',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/students.html'
  }
}])

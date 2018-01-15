angular.module('app').directive('appGrade',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/grade.html'
  }
}])

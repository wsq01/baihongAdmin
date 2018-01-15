angular.module('app').directive('appClass',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/class.html'
  }
}])

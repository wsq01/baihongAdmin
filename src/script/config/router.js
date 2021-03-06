angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('users', {
    url: '/students',
    templateUrl: 'view/students.html',
    controller: 'studentsCtrl'
  }).state('class', {
    url: '/class',
    templateUrl: 'view/class.html',
    controller: 'classCtrl'
  }).state('teachers', {
      url: '/teachers',
      templateUrl: 'view/teachers.html',
      controller: 'teachersCtrl'
  }).state('managers', {
      url: '/managers',
      templateUrl: 'view/managers.html',
      controller: 'managersCtrl'
  }).state('course', {
    url: '/course',
    templateUrl: 'view/course.html',
    controller: 'courseCtrl'
  }).state('gartens', {
    url: '/gartens',
    templateUrl: 'view/gartens.html',
    controller: 'gartensCtrl'
  }).state('district', {
      url: '/district',
      templateUrl: 'view/districts.html',
      controller: 'districtCtrl'
  }).state('grade', {
    url: '/grade',
    templateUrl: 'view/grade.html',
    controller: 'gradeCtrl'
  }).state('reset', {
    url: '/reset',
    templateUrl: 'view/reset.html',
    controller: 'resetCtrl'
  }).state('category', {
      url: '/category',
      templateUrl: 'view/category.html',
      controller: 'categoryCtrl'
  }).state('categoryDetail', {
      url: '/categoryDetail',
      templateUrl: 'view/categoryDetail.html',
      controller: 'categoryDetailCtrl'
  }).state('parents', {
      url: '/parents',
      templateUrl: 'view/parents.html',
      controller: 'parentsCtrl'
  }).state('records', {
      url: '/records',
      templateUrl: 'view/records.html',
      controller: 'recordsCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'view/login.html',
    controller: 'loginCtrl'
  });
  $urlRouterProvider.otherwise('login');
}])

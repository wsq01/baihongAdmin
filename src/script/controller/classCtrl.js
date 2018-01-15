angular.module('app').controller('classCtrl', ['$http', '$scope', 'locals', 'NgTableParams','getClass', function($http, $scope, locals, NgTableParams,getClass) {
  var userInfo = locals.getObject('userInfo');
  var sid = userInfo.sid,uid = window.localStorage.getItem('uid');
  $scope.classList=getClass.classList;
  //获取
  $scope.getData = function() {
    $scope.classList.success(function(data) {
      console.log(data);
      $scope.building = data.classes;
      $scope.isShowFilter=false;
      $scope.dataTable = new NgTableParams({
        page: 1,
        count: 15
      }, {
        counts: [15, 20, 30],
        dataset: $scope.building
      });
    });
  };
  $scope.getData();
  $scope.showFilters=function () {
      if($scope.isShowFilter==false){
          $scope.isShowFilter=true;
      }else{
          $scope.isShowFilter=false;
      }
  };
  // 添加****
  $scope.add = function() {
    $scope.add_sure = function() {
      $http({
        method: "post",
        url: "../db/class.php",
        data: {
          sid: sid,
          cmd: "add",
          name: $scope.addItem.name,
          gid: $scope.addItem.gid
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(data) {
          return $.param(data);
        }
      }).success(function(data) {
        console.log(data);
        if(data.errno=="1"){
            $scope.getData();
            $('#add').modal('hide');
        }else{
          alert("添加失败！")
        }

      });
    };
  };
  // 修改****
  $scope.change = function(item) {
    $scope.buildingItem = item;
    var s_name = $scope.buildingItem.name,
      s_gid = $scope.buildingItem.gid;
    $scope.change_sure = function() {
      $http({
        method: "post",
        url: "../db/class.php",
        data: {
          sid: sid,
          cmd: "edit",
          id: $scope.buildingItem.id,
          name: $scope.buildingItem.name,
          gid: $scope.buildingItem.gid
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(data) {
          return $.param(data);
        }
      }).success(function(data) {
        console.log(data);
        $('#changeModal').modal('hide')
      });
    };
    $scope.change_cancel = function() {
      $scope.buildingItem.name = s_name;
      $scope.buildingItem.gid = s_gid;
      $('#changeModal').modal('hide');
    };
  };
  // 删除****
  $scope.delete = function(item) {
    $scope.buildingItem = item;
    $scope.delete_sure = function() {
      $http({
        method: "post",
        url: "../db/class.php",
        data: {
          sid: sid,
          cmd: "del",
          id: $scope.buildingItem.id
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(data) {
          return $.param(data);
        }
      }).success(function(data) {
        console.log(data);
        $scope.getData();
        $('#deleteModal').modal('hide');
      });
    };
  };
}]);

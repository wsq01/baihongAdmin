angular.module('app').controller('loginCtrl', ['$http', '$scope','$state','locals', function($http, $scope,$state,locals){
  $scope.enter=function(event){
    var keycode = window.event?event.keyCode:event.which;
    if(keycode==13){
        if($("#t_username").val()!=''&&$("#t_password").val()!=''){
            var pwd=md5(md5($("#t_password").val())),
                mobile=$("#t_username").val();
            $http({
                method: "post",
                url: "../../db/teacher.php",
                data: {
                    cmd:"login",
                    mobile:mobile,
                    pwd:pwd,
                    manager:'1'
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function(data) {return $.param(data);}
            }).success(function(data){
                console.log(data);
                if(data.errno=="1"){
                    $scope.permission(data.sid,data.uid);
                    locals.setObject('userInfo',data);
                    $state.go('users');
                }else{
                    alert("账号或密码不正确，请重新输入！")
                }
            })
        }
    }
    event.stopPropagation();
  };
  $scope.submit=function(){
    var pwd=md5(md5($("#t_password").val())),
        mobile=$("#t_username").val();
      $http({
        method: "post",
        url: "../db/teacher.php",
        data: {
          cmd:"login",
          mobile:mobile,
          pwd:pwd,
          manager:'1'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(data) {return $.param(data);}
      }).success(function(data){
        console.log(data);
        if(data.errno=="1"){
            $scope.permission(data.sid,data.uid);
            locals.setObject('userInfo',data);
            $state.go('users');
        }else{
            alert("账号或密码不正确，请重新输入！")
        }
      })
  };
  $scope.permission=function(sid,uid){
      $http({
          method: "post",
          url: "../db/teacher.php",
          data: {
              sid: sid,
              cmd: "get_list",
              manager: '1',
              id:uid
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function (data) {
              return $.param(data);
          }
      }).success(function (data) {
          console.log(data);
          if(data.errno=="1"){
              var per=data.managers[0].type;
              locals.set('permission',per);
          }
      });
  }
}]);

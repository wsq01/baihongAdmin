angular.module('app').controller('parentsCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../user_db/user.php",
            data: {
                sid: sid,
                cmd: "get_list",
                num:999
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data)
            var users=[];
            for(var i=0;i<data.users.length;i++){
                if(data.users[i].mobile){
                    users.push(data.users[i]);
                }
            }
            $scope.user=users;
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.user
            })
        });
    };
    $scope.getData();
    $scope.showFilters = function () {
        if ($scope.isShowFilter == false) {
            $scope.isShowFilter = true;
        } else {
            $scope.isShowFilter = false;
        }
    };
    // 添加****
    $scope.add = function() {
        $scope.add_sure = function() {
            $http({
                method: "post",
                url: "../db/student.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name,
                    gendor: $scope.addItem.gendor,
                    class:$scope.addItem.class
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
    // 删除****
    $scope.delete = function(item) {
        $scope.userItem = item;
        $scope.delete_sure = function() {
            $http({
                method: "post",
                url: "../db/user.php",
                data: {
                    sid: sid,
                    cmd: "del",
                    id: $scope.userItem.id
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
    //修改****
    $scope.change = function (item) {
        $scope.userItem = item;
        var s_class = $scope.userItem.class,
            s_gendor=$scope.userItem.gendor,
            s_name = $scope.userItem.name;
        $scope.change_sure = function () {
            $http({
                method: "post",
                url: "../db/student.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.userItem.id,
                    class: $scope.userItem.class,
                    name: $scope.userItem.name,
                    gendor:$scope.userItem.gendor
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                console.log(data);
                $('#changeModal').modal('hide');
            });
        };
        $scope.change_cancel = function () {
            $scope.userItem.gendor = s_gendor;
            $scope.userItem.name = s_name;
            $scope.userItem.class=s_class;
            $('#changeModal').modal('hide')
        };
    };
}]);

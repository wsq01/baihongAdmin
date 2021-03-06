angular.module('app').controller('managersCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo'),
        sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../db/teacher.php",
            data: {
                sid: sid,
                cmd: "get_list",
                manager: '1'
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data);
            $scope.user = data.managers;
            turnVendor();
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.user
            });
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
    //修改****
    $scope.change = function (item) {
        $scope.userItem = item;
        var s_pwd = $scope.userItem.password,
            s_status = $scope.userItem.status,
            s_type = $scope.userItem.type;
        $scope.change_sure = function () {
            if (s_pwd == $scope.userItem.password) {
                $http({
                    method: "post",
                    url: "../db/teacher.php",
                    data: {
                        sid: sid,
                        cmd: "edit_manager",
                        id: $scope.userItem.id,
                        pwd: $scope.userItem.password,
                        status: $scope.userItem.status,
                        type: $scope.userItem.type
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                }).success(function (data) {
                    $scope.getData();
                    $('#changeModal').modal('hide');
                });
            } else {
                $http({
                    method: "post",
                    url: "../db/teacher.php",
                    data: {
                        sid: sid,
                        cmd: "edit_manager",
                        id: $scope.userItem.id,
                        pwd: md5(md5($scope.userItem.password)),
                        status: $scope.userItem.status,
                        type: $scope.userItem.type
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                }).success(function (data) {
                    $scope.getData();
                    $('#changeModal').modal('hide');
                });
            }
        };
        $scope.change_cancel = function () {
            $scope.userItem.status=s_status;
            $scope.userItem.type=s_type;
            $('#changeModal').modal('hide');
        };
    };
    //删除
    $scope.delete = function (item) {
        $scope.userItem =item;
        $scope.delete_sure = function () {
            $http({
                method: 'post',
                url: '../db/teacher.php',
                data: {
                    sid: sid,
                    cmd: 'del',
                    id: $scope.userItem.id
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function () {
                $scope.getData();
                $('#deleteModal').modal('hide');
            })
        };
    };
    //添加管理员**********
    $scope.addAdmin = function () {
        $scope.add_sure = function () {
            var pwd = md5(md5($scope.addItem.pwd)),
                t_status = $("#t_status input[type='radio']:checked").val();
            $http({
                method: "post",
                url: "../db/teacher.php",
                data: {
                    sid: sid,
                    cmd: "add_manager",
                    mobile: $scope.addItem.mobile,
                    name: $scope.addItem.name,
                    pwd: pwd,
                    status: t_status,
                    type: "1"
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                console.log(data);
                $('#addAdmin').modal('hide').find('input').val('');
                if (data.errno == "1") {
                    $scope.getData();
                } else {
                    alert(data.errmsg);
                }
            });
        };
    };
    function turnVendor() {
        for (var i = 0; i < $scope.user.length; i++) {
            var vendorid = $scope.user[i].vendorid;
            http(i, vendorid);
        }
    };
    function http(i, vendorid) {
        $http({
            method: "post",
            url: "../db/teacher.php",
            data: {
                sid: sid,
                cmd: "vendor_list",
                id: vendorid
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            if(data.vendors){
                $scope.user[i].turnVendor = data.vendors[0].company;
            }
        })
    }
}]);

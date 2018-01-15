angular.module('app').controller('gradeCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo'),
        sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../db/grade.php",
            data: {
                sid: sid,
                cmd: 'get'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data);
            $scope.school = data.grades;
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.school
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
    $scope.add = function () {
        $scope.add_sure = function () {
            $http({
                method: "post",
                url: "../db/grade.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name,
                    kid: $scope.addItem.kid
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                $scope.getData();
                $('#add').modal('hide');
            });
        };
    };
    //修改****
    $scope.change = function (item) {
        $scope.schoolItem = item;
        var s_name = $scope.schoolItem.name,
            s_kid = $scope.schoolItem.kid;
        $scope.change_sure = function () {
            $http({
                method: "post",
                url: "../db/grade.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.schoolItem.id,
                    name: $scope.schoolItem.name,
                    kid: $scope.schoolItem.kid
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                console.log(data);
            });
            $('#changeModal').modal('hide');
        };
        $scope.change_cancel = function () {
            $scope.schoolItem.name = s_name;
            $scope.schoolItem.kid = s_kid;
            $('#changeModal').modal('hide');
        };
    };
    // 删除
    $scope.delete = function (item) {
        $scope.schoolItem = item;
        $scope.delete_sure = function () {
            $http({
                method: "post",
                url: "../db/grade.php",
                data: {
                    sid: sid,
                    cmd: "del",
                    id: $scope.schoolItem.id
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                console.log(data);
                $scope.getData();
                $('#deleteModal').modal('hide');
            });
        };
    };
}]);

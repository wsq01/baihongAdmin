angular.module('app').controller('recordsCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../user_db/wxsu_pic.php",
            data: {
                sid: sid,
                cmd: "get"
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data);
            $scope.user=data.images;
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
        $scope.isShowFilter = $scope.isShowFilter == false;
    };
    //修改****
    $scope.change = function (item) {
        $scope.userItem = item;
        var s_class = $scope.userItem.assess,
            s_gendor=$scope.userItem.gendor,
            s_name = $scope.userItem.name;
        $scope.change_sure = function () {
            $http({
                method: "post",
                url: "../db/wxsu_pic.php",
                data: {
                    sid: sid,
                    cmd: "wx_edit",
                    id: $scope.userItem.id,
                    student: $scope.userItem.student,
                    user:$scope.userItem.user,
                    descript:$scope.userItem.descript
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            }).success(function (data) {
                console.log(data);
                $http({
                    method: "post",
                    url: "../db/wxsu_pic.php",
                    data: {
                        sid: sid,
                        cmd: "edit",
                        id: $scope.userItem.id,
                        status:'2'
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                }).success(function (data) {
                    console.log(data);
                    $('#changeModal').modal('hide');
                });
                // $('#changeModal').modal('hide');
            });
        };
        $scope.change_cancel = function () {
            $scope.userItem.gendor = s_gendor;
            $scope.userItem.name = s_name;
            $scope.userItem.assess=s_class;
            $('#changeModal').modal('hide')
        };
    };
}]);

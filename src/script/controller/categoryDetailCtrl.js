angular.module('app').controller('categoryDetailCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    $scope.dataLength=0
    //获取
    $scope.getData = function() {
        $http({
            method: "post",
            url: "http://washer.mychaochao.cn/db/childedu/db/category.php",
            data: {
                sid: sid,
                cmd: 'get_detail',
                start:$scope.dataLength,
                num:999
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(data) {
            console.log(data);
            if(data.errno=='1'){
                $scope.building = data.details;
                $scope.isShowFilter=false;
                $scope.dataTable = new NgTableParams({
                    page: 1,
                    count: 15
                }, {
                    counts: [15, 20, 30],
                    dataset: $scope.building
                });
                if(data.details.length==100){
                    $scope.dataLength+=100;
                    $scope.getMore();
                }
            }
        });
    };
    $scope.getData();
    $scope.showFilters=function () {
        $scope.isShowFilter==false?$scope.isShowFilter=true:scope.isShowFilter=false;
    };
    $scope.getGrades = function() {
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
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(data) {
            console.log(data);
            $scope.grades = data.grades;

        });
    };
    $scope.getMore=function(){
        $http({
            method: "post",
            url: "http://washer.mychaochao.cn/db/childedu/db/category.php",
            data: {
                sid: sid,
                cmd: 'get_detail',
                start:$scope.dataLength
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(data1) {
                return $.param(data1);
            }
        }).success(function(data1) {
            var x=$scope.building.concat(data1.details)
            $scope.building=x;
        })
    }
    $scope.getGrades();
    // 添加****
    $scope.add = function() {
        $scope.add_sure = function() {
            $http({
                method: "post",
                url: "../db/category.php",
                data: {
                    sid: sid,
                    cmd: "add_detail",
                    name: $scope.addItem.name,
                    cate:$scope.addItem.cate
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
            s_cate = $scope.buildingItem.cate;
        $scope.change_sure = function() {
            $http({
                method: "post",
                url: "../db/category.php",
                data: {
                    sid: sid,
                    cmd: "edit_detail",
                    id: $scope.buildingItem.id,
                    name: $scope.buildingItem.name,
                    cate:$scope.buildingItem.cate
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
            $scope.buildingItem.cate=s_cate;
            $('#changeModal').modal('hide');
        };
    };
    // 删除****
    $scope.delete = function(item) {
        $scope.buildingItem = item;
        $scope.delete_sure = function() {
            $http({
                method: "post",
                url: "../db/category.php",
                data: {
                    sid: sid,
                    cmd: "del_detail",
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
    $scope.getFirstCateByGid=function(id,$event){
        $event.preventDefault();
        $http({
            method: "post",
            url: "../db/category.php",
            data: {
                sid: sid,
                cmd: "get",
                gid:id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(data) {
                return $.param(data);
            }
        }).success(function(data) {
            console.log(data);
            $scope.firstCategory=data.categorys;
            $scope.isShowFilter=false;
        });
    }
}]);

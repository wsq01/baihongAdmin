angular.module('app').controller('teachersCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../db/teacher.php",
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
            console.log(data);
            $scope.user=data.teachers;
            $scope.getdistrictsData();
            $scope.getschoolsData();
            $scope.getClassData();
            $scope.getGradesData();
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
                url: "../db/teacher.php",
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
    // 获取地区
    $scope.getdistrictsData = function () {
        $http({
            method: "post",
            url: "../db/district.php",
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
            $scope.districts = data.districts;
            for(var i=0;i<$scope.user.length;i++){
                for(var j=0;j<$scope.districts.length;j++){
                    if($scope.user[i].city==$scope.districts[j].id){
                        $scope.user[i].city_name=$scope.districts[j].name;
                    }
                }
            }
        });
    };
    // 获取学校
    $scope.getschoolsData = function () {
        $http({
            method: "post",
            url: "../db/gartens.php",
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
            $scope.schools = data.kidergartens;
            for(var i=0;i<$scope.user.length;i++){
                for(var j=0;j<$scope.schools.length;j++){
                    if($scope.user[i].city==$scope.schools[j].id){
                        $scope.user[i].school_name=$scope.schools[j].name;
                    }
                }
            }
        });
    };
    //获取班级
    $scope.getClassData = function() {
        $http({
            method: "post",
            url: "../db/class.php",
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
            $scope.classes = data.classes;
            for(var i=0;i<$scope.user.length;i++){
                for(var j=0;j<$scope.classes.length;j++){
                    if($scope.user[i].city==$scope.classes[j].id){
                        $scope.user[i].class_name=$scope.classes[j].name;
                    }
                }
            }
        });
    };
    // 获取年级
    $scope.getGradesData = function () {
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
            $scope.grades = data.grades;
            for(var i=0;i<$scope.user.length;i++){
                for(var j=0;j<$scope.grades.length;j++){
                    if($scope.user[i].city==$scope.grades[j].id){
                        $scope.user[i].grade_name=$scope.grades[j].name;
                    }
                }
            }
        });
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
                url: "../db/teacher.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.userItem.id,
                    status: $scope.userItem.status
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

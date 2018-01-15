angular.module('app',['ui.router','ngAnimate','ngTable'])

angular.module('app').controller('categoryCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    //获取
    $scope.getData = function() {
        $http({
            method: "post",
            url: "../db/category.php",
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
            $scope.building = data.categorys;
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
    $scope.getGrades();
    // 添加****
    $scope.add = function() {
        $scope.add_sure = function() {
            $http({
                method: "post",
                url: "../db/category.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name,
                    gid:$scope.addItem.gid
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
            s_gid=$scope.buildingItem.gid;
        $scope.change_sure = function() {
            $http({
                method: "post",
                url: "../db/category.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.buildingItem.id,
                    name: $scope.buildingItem.name,
                    gid:$scope.buildingItem.gid
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
            $scope.buildingItem.gid=s_gid;
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
            $scope.building=data.categorys;
            $scope.isShowFilter=false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.building
            });
        });
    }
}]);

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
    // $scope.getFirstCategory = function() {
    //     $http({
    //         method: "post",
    //         url: "../db/category.php",
    //         data: {
    //             sid: sid,
    //             cmd: 'get'
    //         },
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         transformRequest: function(data) {
    //             return $.param(data);
    //         }
    //     }).success(function(data) {
    //         console.log(data);
    //         $scope.firstCategory = data.categorys;
    //
    //     });
    // };
    // $scope.getFirstCategory();
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
    // $scope.getSecondCategory=function(id,$event){
    //     $event.preventDefault();
    //     $http({
    //         method: "post",
    //         url: "../db/category.php",
    //         data: {
    //             sid: sid,
    //             cmd: "get_detail",
    //             cate:id
    //         },
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         transformRequest: function(data) {
    //             return $.param(data);
    //         }
    //     }).success(function(data) {
    //         console.log(data);
    //         $scope.secondCategory=data.details;
    //         $scope.isShowFilter=false;
    //         $scope.dataTable = new NgTableParams({
    //             page: 1,
    //             count: 15
    //         }, {
    //             counts: [15, 20, 30],
    //             dataset: $scope.secondCategory
    //         });
    //     });
    // }
}]);

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

angular.module('app').controller('courseCtrl', ['$http', '$scope', 'locals', 'NgTableParams','$compile', function ($http, $scope, locals, NgTableParams,$compile) {
    var userInfo = locals.getObject('userInfo'),
        sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取信息
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../db/course.php",
            data: {
                sid: sid,
                cmd: 'get',
                name_audio:'1'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data);
            $scope.course = data.courses;
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.course
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
    // 添加****
    $scope.add = function () {
        $scope.uploadqAudios=[];
        $('#t_img').click(function () {
            $('#t_img').on('change',function (e) {
                $scope.uploadFile=e.target.files[0];
            });
        });
        $scope.add_sure = function () {
            console.log($scope.uploadFile);
            var questions=[],subjectAudios=[],questionAudios=[];
            $("#questions input[type='text']").each(function(){
               questions.push($(this).val())
            });
            $("#questions input[type='file']").each(function(index,element){
                console.log(element.files[0]);
                $scope.uploadAudio(element.files[0]);
                questionAudios.push(element.files[0].name)
            });
            if($scope.uploadFile){
                subjectAudios.push($scope.uploadFile.name);
                console.log(subjectAudios);
                $scope.uploadAudio($scope.uploadFile);
            }
            console.log(questionAudios);
            $http({
                method: "post",
                url: "../db/course.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name,
                    target: $scope.addItem.target,
                    problem:$scope.addItem.problem,
                    gid:$scope.addItem.gid,
                    questions:questions,
                    name_audio:'1',
                    audio_names:subjectAudios,
                    question_audio:'',
                    question_names:questionAudios
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
                $('#add').modal('hide');
            });
        };
    };
    $scope.uploadAudio=function(file){
        $http({
            method: "post",
            url: "../db/oss.php",
            data: {
                sid: sid,
                cmd: "get_auth"
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            // console.log(data);
            var client = new OSS.Wrapper({
                region: data.region,
                accessKeyId: data.id,
                accessKeySecret:data.key,
                bucket:data.bucket
            });
            client.multipartUpload("upload/"+file.name, file).then(function (result){
                console.log(result);
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    // 修改*****
    $scope.change = function (item) {
        if(item.question){
            item.questions=JSON.parse(item.question);
        }
        $scope.courseItem = item;
        var s_name = $scope.courseItem.name,
            s_target=$scope.courseItem.target,
            s_problem=$scope.courseItem.problem,
            s_class = $scope.courseItem.gid;

        $('#t_subAudio').click(function () {
            $('#t_subAudio').on('change',function (e) {
                $scope.changeFile=e.target.files[0];
            });
        });

        $scope.change_sure = function () {
            var question=[],changeAudios=[],changeAudio=[];
            $('#addques input').each(function(){
                question.push($(this).val())
            });
            if($scope.changeFile){
                changeAudio.push($scope.changeFile.name);
                console.log(changeAudio);
                $scope.uploadAudio($scope.changeFile);
            }
            $("#changeQuestion input[type='file']").each(function(index,element){
                console.log(element.files[0]);
                if(element.files[0]){
                    $scope.uploadAudio(element.files[0]);
                    changeAudios.push(element.files[0].name)
                }
            });

            $http({
                method: "post",
                url: "../db/course.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.courseItem.id,
                    name: $scope.courseItem.name,
                    problem:$scope.courseItem.problem,
                    target:$scope.courseItem.target,
                    gid: $scope.courseItem.gid,
                    // questions:question,
                    // name_audio:'1',
                    // audio_names:changeAudio,
                    // question_audio:'',
                    // question_names:changeAudios
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
            $scope.courseItem.name = s_name;
            $scope.courseItem.gid = s_class;
            $scope.courseItem.target=s_target;
            $scope.courseItem.problem=s_problem;
            $('#changeModal').modal('hide');
        };
    };
    // 删除
    $scope.delete = function (item) {
        $scope.courseItem = item;
        $scope.delete_sure = function () {
            $http({
                method: "post",
                url: "../db/course.php",
                data: {
                    sid: sid,
                    cmd: "del",
                    id: $scope.courseItem.id
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
    $scope.add_question=function(){
        var html="<label class='col-sm-3 control-label'>问题:</label><div class='col-sm-8'><input type='text' class='form-control'></div><label class='col-sm-3 control-label'>问题语音:</label><div  class='col-sm-8'><input type='file' class='form-control'></div>";
        var template = angular.element(html);
        var mobileDialogElement = $compile(template)($scope);
        angular.element("#questions").append(mobileDialogElement);
    };
    $scope.add_question2=function(){
        var html="<label class='col-sm-3 control-label'>问题:</label><div class='col-sm-8'><input type='text' class='form-control'></div><label class='col-sm-3 control-label'>问题语音:</label><div  class='col-sm-8'><input type='file' class='form-control'></div>";
        var template = angular.element(html);
        var Element = $compile(template)($scope);
        angular.element("#addques").append(Element);
    }
}]);

angular.module('app').controller('districtCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo'),
        sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
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
            $scope.district = data.districts;
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.district
            });
        });
    };
    $scope.getData();
    $scope.showFilters = function () {
        $scope.isShowFilter = $scope.isShowFilter == false;
    };
    // 添加****
    $scope.add = function () {
        $scope.add_sure = function () {
            $http({
                method: "post",
                url: "../db/district.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name
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
                $('#add').modal('hide');
            });
        };
    };
    // 修改****
    $scope.change = function (item) {
        $scope.districtItem = item;
        var s_name = $scope.districtItem.name;
        $scope.change_sure = function () {
            $http({
                method: "post",
                url: "../db/district.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.districtItem.id,
                    name: $scope.districtItem.name
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
        $scope.check_cancel = function () {
            $scope.districtItem.name = s_name;
            $('#changeModal').modal('hide');
        };
    };
    //删除
    $scope.delete = function (item) {
        $scope.districtItem = item;
        $scope.delete_sure = function () {
            $http({
                method: "post",
                url: "../db/district.php",
                data: {
                    sid: sid,
                    cmd: "del",
                    id: $scope.districtItem.id
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

angular.module('app').controller('gartensCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo'),
        sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
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
            $scope.district = data.kidergartens;
            $scope.isShowFilter = false;
            $scope.dataTable = new NgTableParams({
                page: 1,
                count: 15
            }, {
                counts: [15, 20, 30],
                dataset: $scope.district
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
    // 添加****
    $scope.add = function () {
        $scope.add_sure = function () {
            $http({
                method: "post",
                url: "../db/gartens.php",
                data: {
                    sid: sid,
                    cmd: "add",
                    name: $scope.addItem.name,
                    city:$scope.addItem.city
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
                $('#add').modal('hide');
            });
        };
    };
    // 修改****
    $scope.change = function (item) {
        $scope.districtItem = item;
        var s_name = $scope.districtItem.name;
        $scope.change_sure = function () {
            $http({
                method: "post",
                url: "../db/gartens.php",
                data: {
                    sid: sid,
                    cmd: "edit",
                    id: $scope.districtItem.id,
                    name: $scope.districtItem.name,
                    city:$scope.districtItem.city
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
        $scope.check_cancel = function () {
            $scope.districtItem.name = s_name;
            $('#changeModal').modal('hide');
        };
    };
    //删除
    $scope.delete = function (item) {
        $scope.districtItem = item;
        $scope.delete_sure = function () {
            $http({
                method: "post",
                url: "../db/gartens.php",
                data: {
                    sid: sid,
                    cmd: "del",
                    id: $scope.districtItem.id
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

angular.module('app').controller('navCtrl',['$scope','locals','$state','$http','$interval',function($scope,locals,$state,$http,$interval){
  var userInfo=locals.getObject('userInfo');
  $scope.permission=locals.get('permission','1');
  $scope.userName=userInfo.name;
  $scope.userId=userInfo.uid;
  var sid=userInfo.sid,
      uid=userInfo.uid;
  $scope.exit=function(){
    locals.setObject('userInfo','');
    $state.go('login');
  };
  //修改密码********
  $scope.changePwd=function () {
      $scope.change_sure=function () {
          $http({
              method:'post',
              url:'../../db/user.php',
              data:{
                  sid:sid,
                  cmd:'edit_pass',
                  manager:'1',
                  oldPass:md5(md5($('#t_oldPass').val())),
                  newPass:md5(md5($('#t_newPass').val())),
                  rePass:md5(md5($('#t_rePass').val()))
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              transformRequest: function (data) {return $.param(data);}
          }).success(function (data) {
              console.log(data);
              if(data.errno=="-6"){
                  alert(data.errmsg);
              }else if(data.errno=='-7'){
                alert(data.errmsg);
              }else if(data.errno=='1'){
                alert('修改密码成功');
              }
          });
          $('#changePwd').modal('hide')
      };
      $scope.change_cancel=function () {
          $('#changePwd').modal('hide');
          $('#t_newPwd').val('')
      }
  };
  // 修改个人信息 ******************
  $scope.changeInfo = function(){
    $scope.getCode=function(){
      var count=60;
      $http({
        method: "post",
        url: "../../db/sms.php",
        data: {
            cmd: 'send_captcha',
            mobile:$scope.myuser.mobile
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(data) {return $.param(data);}
      }).success(function(data){
        console.log(data);
        count = 60;
        $scope.time = '60s';
        var interval = $interval(function() {
          if(count<=0) {
            $interval.cancel(interval);
            $scope.time = '';
          } else {
            count--;
            $scope.time = count + 's';
          }
        }, 1000);
      })
    }
    // 点击确认
    $scope.changeInfo_sure = function(){
        // 调用修改用户信息
        $http({
            method:"post",
            url:"../../db/user.php",
            data:{
                sid:sid,
                cmd:"edit_manager",
                manager:"1",
                mobile:$scope.myuser.mobile,
                captcha:$scope.myuser.captcha,
                id:uid
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {return $.param(data);}
        }).success(function(data){
            console.log(data);
            if(data.errno=="1"){
              alert('修改成功！');
            }
        });
        $('#changeInfo').modal('hide')
    };
    $scope.changeInfo_cancel=function () {
        $('#changeInfo').modal('hide')
    }
  }
}])

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
    // 添加****
    // $scope.add = function() {
    //     $scope.add_sure = function() {
    //         $http({
    //             method: "post",
    //             url: "../db/student.php",
    //             data: {
    //                 sid: sid,
    //                 cmd: "add",
    //                 name: $scope.addItem.name,
    //                 gendor: $scope.addItem.gendor,
    //                 class:$scope.addItem.class
    //             },
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             transformRequest: function(data) {
    //                 return $.param(data);
    //             }
    //         }).success(function(data) {
    //             console.log(data);
    //             if(data.errno=="1"){
    //                 $scope.getData();
    //                 $('#add').modal('hide');
    //             }else{
    //                 alert("添加失败！")
    //             }
    //
    //         });
    //     };
    // };
    // 删除****
    // $scope.delete = function(item) {
    //     $scope.userItem = item;
    //     $scope.delete_sure = function() {
    //         $http({
    //             method: "post",
    //             url: "../db/student.php",
    //             data: {
    //                 sid: sid,
    //                 cmd: "del",
    //                 id: $scope.userItem.id
    //             },
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             transformRequest: function(data) {
    //                 return $.param(data);
    //             }
    //         }).success(function(data) {
    //             console.log(data);
    //             $scope.getData();
    //             $('#deleteModal').modal('hide');
    //         });
    //     };
    // };
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

angular.module('app').controller('resetCtrl', ['$http', '$scope','$interval','$state', function($http, $scope,$interval,$state){
  $scope.submit=function(){
    $http({
      method: "post",
      url: "../db/teacher.php",
      data: {
          cmd: 'reset',
          mobile:$scope.user.mobile,
          pwd:md5(md5($scope.user.password)),
          captcha:$scope.user.captcha,
          manager:"1"
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(data) {return $.param(data);}
    }).success(function(data){
      console.log(data);
      if(data.errno=="1"){
        alert('修改成功！');
        $state.go('login');
      }else{
        alert('输入错误！')
      }
    })
  }
  $scope.getCode=function(){
    console.log($scope.user);
    var count=60;
    $http({
      method: "post",
      url: "../db/sms.php",
      data: {
          cmd: 'send_captcha',
          mobile:$scope.user.mobile
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(data) {return $.param(data);}
    }).success(function(data){
      console.log(data);
      count = 60;
      $scope.time = '60s';
      var interval = $interval(function() {
        if(count<=0) {
          $interval.cancel(interval);
          $scope.time = '';
        } else {
          count--;
          $scope.time = count + 's';
        }
      }, 1000);
    })
  }
}]);

angular.module('app').controller('studentsCtrl', ['$http', '$scope', 'locals', 'NgTableParams', function ($http, $scope, locals, NgTableParams) {
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,
        uid = window.localStorage.getItem('uid');
    // 获取
    $scope.getData = function () {
        $http({
            method: "post",
            url: "../db/student.php",
            data: {
                sid: sid,
                cmd: "get",
                num:999
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        }).success(function (data) {
            console.log(data);
            $scope.user=data.students;
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
            $scope.classData = data.classes;
            for(var i=0;i<$scope.user.length;i++){
                for(var j=0;j<$scope.classData.length;j++){
                    if($scope.user[i].class==$scope.classData[j].id){
                        for(var k=0;k<$scope.grades.length;k++){
                            if($scope.classData[j].gid==$scope.grades[k].id){
                                $scope.user[i].grade_name=$scope.grades[k].name;
                            }
                        }
                        $scope.user[i].class_name=$scope.classData[j].name;
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
            $scope.getClassData();
            // for(var i=0;i<$scope.classData.length;i++){
            //     for(var j=0;j<$scope.grades.length;j++){
            //         if($scope.classData[i].gid==$scope.grades[j].id){
            //             $scope.
            //         }
            //     }
            // }
        });
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
                url: "../db/student.php",
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

angular.module('app').directive('appCategory',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/category.html'
    }
}])

angular.module('app').directive('appCategoryDetail',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/categoryDetail.html'
    }
}])

angular.module('app').directive('validator',[function(){
  return {
    restrict:'A',
    link:function(scope, element, attrs){
      $(function(){
        element.bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    message: '用户名无效',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 16,
                            message: '用户名长度应为3~16个字符'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '用户名只能由字母、数字、点和下划线组成'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength:{
                          min:3,
                          max:16,
                          message:'密码长度应为3~16个字符'
                        }
                    }
                },
                reOption: {
                    validators: {
                        notEmpty: {
                            message: '必填选项'
                        }
                    }
                },
                mobile: {
                    validators: {
                        notEmpty: {
                            message: '手机号不能为空'
                        },
                        stringLength:{
                            min:11,
                            max:11,
                            message:'手机号长度应为11个字符'
                        }
                    }
                },
                captcha: {
                    validators: {
                        notEmpty: {
                            message: '验证码不能为空'
                        },
                        stringLength:{
                            min:4,
                            max:4,
                            message:'验证码长度应为4个字符'
                        }
                    }
                }
            }
        });
      })
    }
  }
}])

angular.module('app').directive('appClass',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/class.html'
  }
}])

angular.module('app').directive('appCourse',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/course.html'
  }
}])

angular.module('app').directive('appDistrict',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/districts.html'
    }
}])
angular.module('app').directive('appGartens',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/gartens.html'
    }
}])
angular.module('app').directive('appGrade',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/grade.html'
  }
}])

angular.module('app').directive('appManagers',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/managers.html'
  }
}])

angular.module('app').directive('appNav',[function(){
  return {
    restrict:'A',
    replace:true,
    scope:{},
    templateUrl:'view/template/nav.html',
    controller:'navCtrl'
  }
}])

angular.module('app').directive('appParents',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/parents.html'
    }
}]);

angular.module('app').directive('appRecords',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/records.html'
    }
}]);
angular.module('app').directive('appStudents',[function(){
  return {
    restrict:'A',
    replace:true,
    templateUrl:'view/template/students.html'
  }
}])

angular.module('app').directive('appTeachers',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/teachers.html'
    }
}]);

angular.module('app').filter('firstCategory',['$http','locals',function($http,locals){
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid;

    return function(input){
        var xx='';
        $http({
            method: "post",
            url: "../db/category.php",
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
            xx=data.errmsg;
        });
        return xx;
    };
}])

angular.module('app').filter('orderStatus',function(){
  return function(input){
    var orderStatus='';
    if(input=="0"){
      orderStatus="未付款";
    }else if(input=="1"){
      orderStatus="已付款";
    }else if(input=="2"){
      orderStatus="已完成";
    }else {
      orderStatus="错误"
    }
    return orderStatus;
  }
})


angular.module('app').factory('getClass',['$http','locals',function($http,locals){
    var userInfo = locals.getObject('userInfo');
    var sid = userInfo.sid,uid = window.localStorage.getItem('uid');
    var classList=$http({
        method: "post",
        url: "../db/class.php",
        data: {
            sid: sid,
            cmd: 'get'
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(data) {return $.param(data);}
    });
    var addClass=function(name,gid){
        $http({
            method: "post",
            url: "../db/class.php",
            data: {
                sid: sid,
                cmd: "add",
                name: name,
                gid: gid
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(data) {return $.param(data);}
        })
    };
    return {
        classList:classList
    }
}]);
angular.module('app').factory('locals',['$window',function($window){
  return {        //存储单个属性
    set: function (key, value) {
        $window.localStorage[key] = value;
    },        //读取单个属性
    get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
    },        //存储对象，以JSON格式存储
    setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);//将对象以字符串保存
    },        //读取对象
    getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');//获取字符串并解析成对象
    }
  }
}]);

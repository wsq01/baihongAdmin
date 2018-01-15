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

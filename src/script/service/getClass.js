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
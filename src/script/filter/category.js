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

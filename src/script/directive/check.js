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

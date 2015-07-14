/**
 * Created by zz on 2015/3/19.
 */
$F.regist("login.login", function () {

    $(document).ready(function () {
        //$("#loginName").click(function () {
        //    $("#forName").addClass("icon1 forName1")
        //    $('#errorMsg').hide();
        //})
        //$("#loginPassword").click(function () {
        //    $("#forPwd").addClass("icon1 forPwd1")
        //    $('#errorMsg').hide();
        //})

        $("#loginAction").click(function () {
            var name = $("#loginName")[0].value;
            var pwd = $("#loginPassword")[0].value;
            if (check()) {
                $.ajax({
                    url: $f.get("SERVER_URL").loginUrl,
                    data: {"email": name, "password": pwd},
                    type: 'post',
                    cache: false,
                    success: function (result) {
                        /*登录成功跳转到个人中心*/
                        if (result.success == true) {
                            var userid = result.user.id;//不加var则隐式的声明全局变量
                            localStorage.setItem("userid", userid);//以“userid”为名称存储一个值userid到localStorage中
                            $('#errorMsg').hide();
                            window.location.href="my.html";
                            /*$("#footer-login").attr("id", "footer-info");//将登陆的指向变为个人信息的指向*/
                            //永久登陆则在页面初始化是获得localStorage中的值，不为空，则直接执行天foot-login的id及指向
                        }else {
                            $('#errorMsg').html("用户名或密码错误");
                            $('#errorMsg').css({display: "block"});
                        }
                    },
                    error: function () {
                        $('#errorMsg').html("登录失败，请检查网络连接是否正常！");
                        $('#errorMsg').css({display: "block"});

                    }
                })
            }
        });

        function check() {
            var username = $('#loginName')[0].value;
            var password = $('#loginPassword')[0].value;
            if (username.length == 0) {
                $('#errorMsg').html("用户名不能为空");
                $('#errorMsg').css({display: "block"});
                return false;
            } else if (password.length == 0) {
                $('#errorMsg').html("密码不能为空");
                $('#errorMsg').css({display: "block"});
                return false;
            }
            return true;
        }
    });
});

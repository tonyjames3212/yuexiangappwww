/**
 * Created by zhangzhen on 2015.02.26.
 */
$F.regist("person.getMyInfo", function () {
    var userid = localStorage.getItem("userid");
    if (userid == null) {
        $('#login').show();
        $('#person').hide();
        $('#icon-rightarrow').show();
        $("#minheadimg").attr("src", "img/icon_touxiang.png");
    } else {
        $('#login').hide();
        $('#person').show();
        $('#icon-rightarrow').hide();
        $.ajax({
            url: $f.get("SERVER_URL").MyInfoUrl,
            type: 'get',
            dataType: 'json',
            data: {"userid": userid},
            success: function (data) {
                console.log("获取用户详情++++++++++");
                var headimg;
                headimg = (null == data.user.headimg ? 'images/head.jpg' : data.user.headimg);
                var signinstatus = data.signinstatus;
                headimg = headimg.replace("/upload", "http://172.16.248.55:8080/yuexiang/upload");
                $("#minheadimg").attr("src", headimg);
                var username = data.user.nickname;
                localStorage.setItem("username", username);
                $("#username").append(username);
                $("#actcounts").html("活动有"+data.actcount+"条未读消息");
                $("#shacounts").html("分享有"+data.shacount+"条未读消息");
                //如果今天已经签到了，将图片替换
                if (signinstatus == true) {
                    //todo:替换为已签到的状态,显示天数
                    //$("#sign").attr("src","");
                    $("#signincount").html("<a style='font-size: 20px'>已签到" + data.signincount + "天</a>");
                } else {
                    $("#signincount").html("<a href='#' onclick='signin(userid)' style='font-size: 20px'>签到</a>");
                }
            }
        })
    }

});

function signin(userid) {
    $.ajax({
        url: $f.get("SERVER_URL").SignInUrl,
        type: 'get',
        data:{"userid":userid},
        dataType: 'json',
        success: function (data) {
            if (data.signinstatus == true) {
                //todo:替换为已签到的状态,显示天数
                //$("#sign").attr("src","");
                $("#signincount").html("<a style='font-size: 20px'>已签到" + data.signincount + "天</a>");
            } else {
                $("#signincount").html("<a href='#' onclick='signin(userid)' style='font-size: 20px'>签到</a>");
            }
        }
    })
}



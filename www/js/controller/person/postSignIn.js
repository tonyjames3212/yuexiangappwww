/**
 * Created by zhangzhen on 2015.02.26.
 */
$F.regist("person.postSignIn",  function () {
    var userid=localStorage.getItem("userid");
    $.ajax({
        url: $f.get("SERVER_URL").SignInUrl,
        data:({"userid":userid}),
        type: 'post',
        success: function (data,status) {
            if(data.signinstatus==true){
                alert("签到成功！");
                //todo:替换为签到成功的状态
                //$("#sign").attr("src","");
                $("#signincount").html("已签到"+data.signincount+"天");
            }else{
                alert("今日已签到");
            }

        }
    })
});
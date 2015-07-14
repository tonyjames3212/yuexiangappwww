/**
 * Created by zhangzhen on 2015.03.12.
 */
$F.regist("person.updateUserInfo", function () {
    var sex;
    if ($("#sex").find("option:selected").text().toString() == "女") {
        sex = 1;
    } else if ($("#sex").find("option:selected").text().toString() == "男") {
        sex = 0;
        alert($("#sex").find("option:selected").text());
    }
    $.ajax({
        url: $f.get("SERVER_URL").ModifyUserInfoUrl,
        type: 'post',
        data: {
            "Sex": sex,
            "Birth": $("#birth").val(),
            "Email": $("#email").val(),
            "Address": $("#address").val(),
            "Postcode": $("#postcode").val(),
            "Mobile": $("#mobile").val(),
            "Qq": $("#QQ").val(),
            "Msn": $("#MSN").val(),
            "Weibo": $("#wei-bo").val(),
            "Province": $("#province").val(),
            "City": $("#city").val(),
            "Company": $("#company").val()
        },
        success: function (data, status) {
            alert("个人信息修改成功！");
        }
    })
});
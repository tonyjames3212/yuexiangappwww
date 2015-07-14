/**
 * Created by zhangzhen on 2015.03.06.
 */
$F.regist("person.getMyInfos", function () {
    $.ajax({
        url: $f.get("SERVER_URL").MyInfoUrl,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var sex;
            if (data.Sex == 0) {
                sex = "男";
            }
            else {
                sex = "女";
            }
            var list = "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>账户：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Nickname + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>性别：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + sex + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>生日：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Birth + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>邮箱：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Email + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>住址：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Address + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>邮编：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Postcode + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>电话：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Mobile + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>QQ：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Qq + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>MSN：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Msn + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>微博：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Weibo + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>省份：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Province + "</span></li>"
                + "<li style='margin-top:0px;border:none;border-bottom:1px #CCCCCC solid'><span>市县：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.City + "</span></li>"
                + "<li style='margin-top:0px;border:none;height:23px'><span>公司：</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>" + data.Company + "</span></li>";
            $("#ul_info").append(list);
            $("#ul_info").listview('refresh');
        }
    });
});

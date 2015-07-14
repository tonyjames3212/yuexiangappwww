/**
 * Created by zhangzhen on 2015.03.11.
 */
$F.regist("person.getMyInfoEdit", function () {
    $.ajax({
        url: $f.get("SERVER_URL").MyInfoUrl,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            $("#u-name").val(data.Nickname);
            if(data.Sex==0)
            {
                $("#sex").find("option[value='m']").attr("selected",true);
                $("#sex").find("option[value='f']").attr("selected",false);
                //alert($("#sex").find("option:selected").text());
            }
            else{
                $("#sex").find("option[value='m']").attr("selected",false);
                $("#sex").find("option[value='f']").attr("selected",true);
            }
            $("#birth").val(data.Birth);
            $("#email").val(data.Email);
            $("#address").val(data.Address);
            $("#postcode").val(data.Postcode);
            $("#mobile").val(data.Mobile);
            $("#QQ").val(data.Qq);
            $("#MSN").val(data.Msn);
            $("#wei-bo").val(data.Weibo);
            $("#province").val(data.Province);
            $("#city").val(data.City);
            $("#company").val(data.Company);
        }
    });
});


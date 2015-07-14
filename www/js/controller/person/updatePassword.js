/**
 * Created by Administrator on 2015.03.16.
 */
$F.regist('person.updatePassword', function () {
    $.ajax({
        url: $f.get("SERVER_URL").ModifyPasswordUrl,
        type: 'get',
        data: {"oldpassword": $("#old-pass").val(), "newpassword": $("#new-pass").val()},
        dataType: 'json',
        success: function (data) {
            alert(data.Msg + "!");
        }
    })
});
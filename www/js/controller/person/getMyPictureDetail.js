/**
 * Created by zhangzhen on 2015/3/13.
 */
$F.regist('person.getMyPictureDetail', function (PId) {
    $.ajax({
        url: $f.get("SERVER_URL").MyResourceDetailUrl,
        type: 'get',
        data: {"id": PId},
        dataType: 'json',
        success: function (data) {
            var list = "<img src='" + data.Url + "' alt='" + data.Filename + "'/>";
            $("#photo-detail").append(list);
        }
    })
});
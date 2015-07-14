/**
 * Created by zhangzhen on 2015.03.13.
 */
$F.regist("person.getMyPicture", function () {
    var items = 10;
    var pageNum = parseInt($('#photo-content').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#photo-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyPictureUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var photoData = data.items;
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < photoData.length; i++) {
                var img = photoData[i].Url ? host + photoData[i].Url : 'img/tu4.png';
                var list = "<li style='width:44.5%;height:175px;min-height:175px;float:left;list-style:none;max-height:175px;padding-bottom: 30px;max-width:44.5%;'><a href='photo_details.html?id=" + photoData[i].Id + "' style='min-height:;100%;height:100%' data-transition='none'>"
                    + "<img style='width:100%;height:200px;max-height:200px;max-width:100%;margin:-1px' src='" + img + "'/>"
                    + "</a></li>";
                $("#photo-list").append(list);
                $("#photo-list").listview('refresh');
            }
            if (total > $('#photo-content').find('li').length) {
                $("photo-more").show();
            }
            else {
                $("photo-more").hide();
            }
        }
    })
});
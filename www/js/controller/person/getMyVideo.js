/**
 * Created by zhangzhen on 2015.03.13.
 */
$F.regist("person.getMyVideo", function () {
    var items = 10;
    var pageNum = parseInt($('#video-content').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#video-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyVideoUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var videoData = data.items;
            for (var i = 0; i < videoData.length; i++) {
                var list = "<li><a href='video_details.html?id=" + videoData[i].Id + "' data-transition='none'>" +
                    "<img src='img/tu4.png'/><h2>"
                    + videoData[i].Filename
                    + "</h2><P>"
                    + videoData[i].Content
                    + "</P>"
                    + "</a></li>";
                $("#video-list").append(list);
                $("#video-list").listview('refresh');
            }
            if (total > $('#video-content').find('li').length) {
                $("video-more").show();
            }
            else {
                $("video-more").hide();
            }
        }
    })
});

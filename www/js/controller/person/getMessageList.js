/**
 * Created by zhangzhen on 2015.03.20.
 */
$F.regist("person.getMessageList", function (ID) {
    var items = 10;
    var pageNum = parseInt($('#MList-content').find('section').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $.ajax({
        url: $f.get("SERVER_URL").MyMessageListUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum, "aid": ID},
        dataType: 'json',
        success: function (data) {
            var magData = data.items;
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < magData.length; i++) {
                var img = magData[i].Url ? host + magData[i].Url : 'img/tu4.png';
                var cla;
                if (magData[i].Uid == ID) {
                    cla = "me-talk";
                } else if (magData[i].Authorid == ID) {
                    cla = "guest-talk";
                }

                var list = "<li style='border:none;padding-bottom: 5px;padding-top:-10px'><section class='" + cla + "' data-chatid='" + i + "'>"
                    + "<a class='avatar-talk' href='#'><img src='" + img + "'></a>"
                    + "<div class='content-talk content-wb'><p>"
                    + magData[i].Content
                    + " </p>"
                    + "</div>"
                    + "</section></li>";
                $("#mess-list").append(list);
                $("#mess-list").listview('refresh');
            }
        }
    })
});
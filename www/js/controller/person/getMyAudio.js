/**
 * Created by zhangzhen on 2015.03.13.
 */
$F.regist("person.getMyAudio", function () {
    var items = 10;
    var pageNum = parseInt($('#audio-content').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#audio-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyAudioUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var audioData = data.items;
            for (var i = 0; i < audioData.length; i++) {
                var list = "<li><a href='audio_details.html?id=" + audioData[i].Id + "' data-transition='none'>" +
                    "<img src='img/tu4.png'/><h2>"
                    + audioData[i].Filename
                    + "</h2><P>"
                    + audioData[i].Content
                    + "</P>"
                    + "</a></li>";
                $("#audio-list").append(list);
                $("#audio-list").listview('refresh');
            }
            if (total > $('#audio-content').find('li').length) {
                $("audio-more").show();
            }
            else {
                $("audio-more").hide();
            }
        }
    })
});
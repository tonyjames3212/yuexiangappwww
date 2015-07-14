/**
 * Created by zhangzhen on 2015.03.13.
 */
$F.regist("person.getMyFile", function () {
    var items = 10;
    var pageNum = parseInt($('#file-content').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#file-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyFileUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var fileData = data.items;
            for (var i = 0; i < fileData.length; i++) {
                var list = "<li><a href='file_details.html?id=" + fileData[i].Id + "' data-transition='none'>" +
                    "<img src='img/tu4.png'/><h2>"
                    + fileData[i].Filename
                    + "</h2><P>"
                    + fileData[i].Content
                    + "</P>"
                    + "</a></li>";
                $("#file-list").append(list);
                $("#file-list").listview('refresh');
            }
            if (total > $('#file-content').find('li').length) {
                $("file-more").show();
            }
            else {
                $("file-more").hide();
            }
        }
    })
});
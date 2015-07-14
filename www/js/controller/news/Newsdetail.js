/**
 * Created by hanzhendong on 2015/2/3.
 */
$F.regist('news.newsDetail', function () {
    $.ajax({
        url: $f.get("SERVER_URL").newscontentUrl,
        type: 'get',
        data: {"id": id},
        dataType: 'json',
        success: function (data) {
            var dat = data;
            console.log("获取作品详细++++++++++");
            var contents =
                "<header class='other'>"
                + " <div class='container'>"
                + " <div class='row'>"
                + " <div class='col-xs-12'>"
                + " <a href='javascript:history.go(-1);' class='back-btn pull-left'><i class='icon icon-back'></i></a>"
                + " </div>"
                + " </div>"
                + " </div>"
                + " </header>"
                + " <div class='container detailBox'>"
                + " <div class='row'>"
                + "  <div class='col-lg-12'>"
                + "  <h1>"
                + dat['title']
                + "</h1>"
                + " </div>"
                + "  <div class='col-lg-12 text-group'>"
                + " <p>"
                + dat['content']
                + "</p>"
                + " </div>"
                + " </div>"
                + " </div>";
            $("#div-news").append(contents);
        }
    });
});


/**
 * Created by hanzhendong on 2015/2/4.
 */
$F.regist('news.getNewsList', function () {
    var items=10;
    var pageNum = parseInt($('#news-list').find('section').length / 20);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#news-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").newsUrl,
        type: "get",
        dataType: 'json',
        data: {"limit": 10, "page": pageNum},
        success: function (data, status) {
            console.log(pageNum+"初始化新闻+++++++++++++");
            var total = data.total;
            var tl = data.rows;
            for (var i = 0; i <tl.length; i++) {
                var cont = tl[i].content.replace(/<[^>]+>/g, "");
                var topimg = "";
                if (tl[i].istop == 1) {
                    topimg = "<img src='../img/newsTop.png' style='width:50px;'/>";
                }
                var list = "<li><div class='contentBox row'>" +
                    "<div class='col-xs-12'>" +
                    "<section class='row'>" +
                    "<a href='#' onclick='newsdetail("+tl[i].id+")'>" +
                    "<div class='col-xs-12'>" +
                    "<h1>" +
                    tl[i].title + topimg +
                    "</h1>" +
                    "<p class='status'>最新资讯</p>" +
                    "<div class='content'>" +
                    "<p>" + cont.substr(0, 80) + "..." + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</a>" +
                    "</section>" +
                    "<section class='row info'>" +
                    "<div class='col-xs-12'>" +
                    "<div class='pull-left'>" +
                    "<div class='avatar'>" +
                    "<span>" + tl[i].author + "</span>发布" +
                    "</div>" +
                    "</div>" +
                    //"<div class='pull-right nums'>" +
                    //"<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>1850</a></span>" +
                    //"<span class='message'><a href='#'><i class='icon icon-message'></i>502</a></span>" +
                    //"</div>" +
                    "</div>" +
                    "</section>" +
                    "</div>" +
                    "</div></li>";
                $("#news-list").append(list);
            }
            if (total >  $('#news-list').find('li').length) {
                $("#news-more").show();
            }
        }
    })
});

function newsdetail(id){
    window.location.href="/news_detail.html?actId="+id;
}
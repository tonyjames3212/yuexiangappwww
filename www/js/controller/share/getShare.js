/**
 * Created by hanzhendong on 2015/2/9.
 */
$F.regist("share.getShare", function () {
    var items = 10;
    var pageNum = parseInt($('#share-list').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    console.log(pageNum + "分享列表页数+++++");
    $("#share-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").shareUrl,
        type: "post",
        dataType: 'json',
        data: {"limit": items, "page": pageNum},
        success: function (data) {
            var total = data.total;
            var tl = data.rows;
            for (var i = 0; i < tl.length; i++) {
                var userHeadimg = (null == tl[i].headimg?"/images/head.jpg":tl[i].headimg);
                var content = tl[i].content.replace(/<[^>]+>/g, "");
                var list =
                    "<li><div class='contentBox row'>"
                    + "<div class='col-xs-12'>"
                    + "<section class='row'>"
                    + "<a href='#' onclick='oneshare(" + tl[i].id + ")'>"
                    + "<div class='col-xs-12'>"
                    + "<h1>"
                    + tl[i].title
                    + "</h1>"
                    + "<p class='status'>最新分享</p>"
                    + "<div class='content'>"
                    + "<p>"
                    + (tl[i].content.length > 100 ? tl[i].content.substr(0, 100) + '...' : tl[i].content)
                    + "</p>"
                    + "</div>"
                    + "</div>"
                    + "</a>"
                    + "</section>"
                    + "<section class='row info'>"
                    + "<div class='col-xs-12'>"
                    + "<div class='pull-left' >"
                    + "<div class='avatar'>"
                    + "<img style='width: 3em; height: 3em' src='" + "http://172.16.248.55:8080/yuexiang" + userHeadimg + "'><span>"
                    + tl[i].author
                    + "</span>发布"
                    + "</div>"
                    + "</div>"
                    + "<div class='pull-right nums'>"
                    + "<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>"
                    + tl[i].views
                    + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>"
                    + tl[i].reply_count
                    + "</a></span>"
                    + "</div>"
                    + "</div>"
                    + "</section>"
                    + "</div>"
                    + "</div></li>";
                $("#share-list").append(list);
            }
           // $("#share-list").listview('refresh');
            if (total >  $('#share-list').find('li').length) {
                $("#share-more").show();
            }else{
                $("#share-more").hide();
            }
        }
    })
});

function oneshare(id){
    window.location.href="/share_detail.html?actId="+id;

}
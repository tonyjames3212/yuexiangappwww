/**
 * Created by zhangzhen on 2015.02.28.
 */
$F.regist("person.getMyShare", function () {
    var userid = localStorage.getItem("userid");
    var items = 10;
    var pageNum = parseInt($('#share-list').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#myshare-more").hide();
    console.log(pageNum + "个人分享页数+++++");
    $.ajax({
        url: $f.get("SERVER_URL").MyShareUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum, "userid": userid},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var tl = data.rows;
            for (var i = 0; i < tl.length; i++) {
                var list =
                    "<li><div class='contentBox row'>"
                    + "<div class='col-xs-12'>"
                    + "<section class='row'>"
                    + "<a href='#' onclick='onemyshare(" + tl[i].id + ")'>"
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
                    + "<div class='pull-left'>"
                    + "<div class='avatar'>"
                    + "<span>"
                    + tl[i].created
                    + "</span>"
                    + "</div>"
                    + "</div>"
                    + "<div class='pull-right nums'>"
                    + "<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>"
                    + tl[i].views
                    + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>"
                    + tl[i].reply_count
                    + "</a></span>"
                    + "<span class='message'>"
                    + "<a href='#' onclick='delshare(" + tl[i].id + ")'>"
                    + "删除</a></span>"
                    + "<span class='message'>"
                    + "<a href='#' onclick='edit(" + tl[i].id + ")'>"
                    + "编辑</a></span>"
                    + "</div>"
                    + "</div>"
                    + "</section>"
                    + "</div>"
                    + "</div></li>";
                $("#share-list").append(list);
            }
            if (total > $('#share-list').find('li').length) {
                $("#myshare-more").show();
            }
        }
    });
});

/***
 * 分享详情
 * @param id
 */
function onemyshare(id) {
    window.location.href = "/person_sharedetail.html?actId=" + id;
}

/***
 * 删除分享
 * @param id
 */
function delshare(id) {
    if (confirm("确认要删除吗？")) {
        $.ajax({
            url: $f.get("SERVER_URL").delshareUrl,
            type: 'get',
            data: {"id": id},
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    alert("删除成功");
                    window.location.href = "person_myshare.html";
                } else {
                    alert("删除失败");
                }
            }
        })
    }
}

function edit(id){
    window.location.href="/person_changeShare.html?id="+id;
}

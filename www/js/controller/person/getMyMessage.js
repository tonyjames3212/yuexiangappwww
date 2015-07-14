/**
 * Created by zhangzhen on 2015.03.2
 */
$F.regist("person.getMyMessage", function (type) {
    var items = 10;
    var hre= window.location.href;
    if(hre.indexOf("share")>0){
        type=1;
    }else{
        type=0;
    }
    var pageNum = parseInt($('#activity-list').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#messages-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyMessageUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum, "userid": localStorage.getItem("userid"),"type":type},
        dataType: 'json',
        success: function (data) {
            var total = data.activitysize;
            var magData = data.activity;
            var host = "http://172.16.248.55:8080/yuexiang";
            for (var i = 0; i < data.sizes; i++) {
                var img = magData[i].headimg ? host + magData[i].headimg : host + '/images/head.jpg';
                if (magData[i].receiver == null) {
                    var list =
                        "<li><div class='contentBox row'>"
                        + "<div class='col-xs-12'>"
                        + "<section class='row'>"
                        + "<a href='#' onclick='details(" + magData[i].pid + "," + type + ")'>"
                        + "<div class='col-xs-12'>"
                        + "<h1>"
                        + magData[i].content
                        + "</h1>"
                        + "<div class='content'>"
                        + "</div>"
                        + "</div>"
                        + "</a>"
                        + "</section>"
                        + "<section class='row info'>"
                        + "<div class='col-xs-12'>"
                        + "<div class='pull-left' >"
                        + "<div class='avatar'>"
                        + "<img style='width: 3em; height: 3em' src='" + img + "'><span>"
                        + magData[i].nickname
                        + "</span>评论<br>"
                        + magData[i].title
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</section>"
                        + "</div>"
                        + "</div></li>";

                }else{
                    var list =
                        "<li><div class='contentBox row'>"
                        + "<div class='col-xs-12'>"
                        + "<section class='row'>"
                        + "<a href='#' onclick='details(" + magData[i].pid + "," + type + ")'>"
                        + "<div class='col-xs-12'>"
                        + "<h1>"
                        + magData[i].content
                        + "</h1>"
                        + "<div class='content'>"
                        + "</div>"
                        + "</div>"
                        + "</a>"
                        + "</section>"
                        + "<section class='row info'>"
                        + "<div class='col-xs-12'>"
                        + "<div class='pull-left' >"
                        + "<div class='avatar'>"
                        + "<img style='width: 3em; height: 3em' src='" + img + "'><span>"
                        + magData[i].nickname
                        + "</span>回复<br>"
                        + magData[i].title
                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "</section>"
                        + "</div>"
                        + "</div></li>";
                }
                $("#activity-list").append(list);

            }
            if (total > $('#activity-list').find('li').length) {
                $("#messages-more").show();
            }else{
                $('#messages-more').hide();
            }
        }
    })
});

//详细页面
function details(id,type){
    if(type==0){
        window.location.href="/activity_details.html?id="+id;
    }else{
        window.location.href="/share_detail.html?id="+id;
    }
}

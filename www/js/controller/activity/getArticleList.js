/**
 * Created by hanzhendong on 2015/2/10.
 */
$F.regist('activity.getArticleList', function (actTypeId) {

    var limit = 10;
    var pageNum = parseInt($('#ul-article').find('li').length / limit);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#fMoreId").hide();

    $.ajax({
        url: $f.get("SERVER_URL").activityArticleListUrl,
        type: 'get',
        data: {"nid": actTypeId, "limit": limit, "page": pageNum},
        dataType: 'json',
        success: function (data, status) {
            console.log("获取作品++++++++++");
            var total = data.total;
            var items = data.items;
            console.log(items[0]);
            for (var i = 0; i < items.length; i++) {
                var list =
                    /*style='margin:0 auto;line-height:20px'*/
                    "<li><a href='activity_article.html?id=" + items[i].Id + "' data-transition='none'>"
                    +"<img src='img/tu4.png'/>"
                    +"<h2>"
                    + items[i].Title
                    + "</h2>"
                    + "<P>"
                    + items[i].Content
                    + "</P>"
                    + "</a>"
                        /*网格布局*/
                    + "<div class='ui-grid-b' style='background-color: #fffaea;text-align: center; padding-top:0.5em; padding-bottom:0.5em;'>"
                    + "<div class='ui-block-a'>"
                    + "<div style='color: #939292'>"
                    + "<a href='replylist.html?tid=" + items[i].Id + "' data-transition='none' >"
                    + "<img src='img/btn_pinglun.png'/>"
                    + "</a>"
                    + "<span>&nbsp;" + items[i].ReplyCount + "</span>"
                    + "</div>"
                    + "</div>"

                    + "<div class='ui-block-b'>"
                    + "<div id='"+items[i].Id+"zandiv' style='color: #939292'>"
                    + "<img id='"+items[i].Id+"zan' src='img/btn_zan.png' onclick='onLike(" + items[i].Id + ")'/>&nbsp;"
                    + "<span id='"+items[i].Id+"hotup'>"+items[i].Hotup+"</span>"
                    + "</div>"
                    + "</div>"

                    + "<div class='ui-block-c'>"
                    + "<div id='"+items[i].Id+"caidiv' style='color: #939292'>"
                    + "<img id='"+items[i].Id+"cai' src='img/btn_cai.png' onclick='onStamp(" + items[i].Id + ")'/>&nbsp;"
                    + "<span id='"+items[i].Id+"hotdown'>"+items[i].Hotdown+"</span>"
                    + "</div>"
                    +"</div>"

                    +"</div>"
                +"</li>";
                $("#ul-article").append(list).listview('refresh');/*上拉刷新*/
            }
            if (total > $('#ul-article').find('li').length) {
                $("fMoreId").show();
            }

        }
    })
});
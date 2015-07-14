/**
 * Created by HuayiSeven on 2015/3/16.
 */
$F.regist('share.getArticle', function (atcId) {
    var limit = 5;
    var pageNum = parseInt($('#messgelist').find('li').length / limit);
    var hidevalue = $("#hidevalue").val();
    if (atcId == "" || atcId == null) {
        atcId = hidevalue;
    }
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#reply-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").workDetailUrl,
        type: 'post',
        data: {"id": atcId, "page": pageNum, "limit": limit},
        dataType: 'json',
        success: function (data) {
            var dat = data.share;
            var views = data.views;
            var reply = data.replyList;
            var hotReplies = data.hotReplies;
            console.log("获取作品详细++++++++++");
            if (pageNum == 1) {
                var contents =
                    "<header class='other'>"
                    + " <div class='container'>"
                    + " <div class='row'>"
                    + " <div class='col-xs-12'>"
                    + " <a href='javascript:history.go(-1);' class='back-btn pull-left' ><i class='icon icon-back'></i></a>"
                    + " <div class='nums pull-left'>"
                    + " <input type='hidden' value='" + dat['id'] + "' id='hidevalue'/>"
                    + "<input type='hidden' id='zhi' />"
                    + " <span class='broswer'><a href='#'><i class='icon icon-broswer'></i>"
                    + views
                    + "</a></span>"
                    + "<span class='message'><a id='article-reply' href='#dingwei'><i class='icon icon-message'></i>"
                    + dat['reply_count']
                    + "</a></span>"
                    + " </div>"
                    + " <div class='nums pull-right'>"
                    + "<span class='message'><a id='hotup'  onclick='sharelike(" + atcId + ")'><img src='img/btn_zan.png'/>(</i>"
                    + dat['hotup']
                    + ")</a></span>"
                    + "<span class='message'><a id='hotdown' onclick='sharestamp(" + atcId + ")'><img src='img/btn_cai.png'>(</img>"
                    + dat['hotdown']
                    + ")</a></span>"
                    + " </div>"
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
                    + " </div>"
                    + "<input id='author' type='hidden'/>"
                    + "<input id='floor' type='hidden'/>"
                    + "<input id='authorid' type='hidden'/>";
                $("#div-article").append(contents);
            }
            //热门评论
            if (pageNum == 1) {
                if (data.hotReplies != 0) {
                    var hotrows;
                    if (data.hotrow > 5) {
                        hotrows = 5;
                    } else {
                        hotrows = data.hotrow;
                    }
                    for (var i = 0; i < hotrows; i++) {
                        var author = hotReplies[i].nickname;
                        var headimg = "http://172.16.248.55:8080/yuexiang" + hotReplies[i].headimg;
                        t = t + 1;
                        if (hotReplies[i].receiver != null && hotReplies[i].receiver != "") {
                            var message = "<li>" +
                                "<div class='avatar'><img src='" + headimg + "' width='30'></div>" +
                                "<div class='content'>" +
                                "<div class='top clearfix'>" +
                                "<div class='name pull-left'>" + hotReplies[i].nickname + "回复#" +
                                hotReplies[i].floor + hotReplies[i].toreceiver +
                                "<p class='date'>评论于:" + $.formatDate('yyyy-MM-dd', hotReplies[i].created) + "</p></div>" +
                                "</div>" +
                                "<div class='bot'>" +
                                hotReplies[i].content +
                                " </div>" +
                                "</div>" +
                                "<div class='right-operating'>" +
                                "<a id='" + hotReplies[i].id + "backingofhotcou' onclick='backing(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>顶(" + hotReplies[i].hotup + ")</a>" +
                                "<a id='" + hotReplies[i].id + "antiofhotcou'  onclick='anti(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>踩(" + hotReplies[i].hotdown + ")</a>" +
                                "</div></li>";
                        } else {
                            var message = "<li>" +
                                "<div class='avatar'><img src='" + headimg + "' width='30'></div>" +
                                "<div class='content'>" +
                                "<div class='top clearfix'>" +
                                "<div class='name pull-left'>" + hotReplies[i].nickname + "<p class='date'>评论于:" + $.formatDate('yyyy-MM-dd', hotReplies[i].created) + "</p></div>" +
                                "</div>" +
                                "<div class='bot'>" +
                                hotReplies[i].content +
                                " </div>" +
                                "</div>" +
                                "<div class='right-operating'>" +
                                "<a id='" + hotReplies[i].id + "backingofhotcou' onclick='backing(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>顶(" + hotReplies[i].hotup + ")</a>" +
                                "<a  id='" + hotReplies[i].id + "antiofhotcou'  onclick='anti(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>踩(" + hotReplies[i].hotdown + ")</a>" +
                                "</div></li>";

                        }
                        $("#hotlist").append(message);

                    }
                } else {
                    $("#hotreply").hide();
                }
            }

            //评论列表
            var t = 0;
            if (data.replysize != 0) {
                var t;
                if (pageNum == 1) {
                    t = data.replysize + 1;
                } else {
                    t = $("#zhi").val();
                }
                for (var i = 0; i < data.rsize; i++) {
                    if (i == 4) {
                        $("#zhi").val(t - 1);
                    }
                    t = t - 1;
                    var img = reply[i].headimg;
                    var headimg;
                    if (img != null && img != "") {
                        headimg = "http://172.16.248.55:8080/yuexiang" + reply[i].headimg;
                    } else {
                        headimg = "images / avatar.jpg";
                    }
                    var author = reply[i].nickname;
                    if (reply[i].receiver != null && reply[i].receiver != "") {
                        var message = "<li>" +
                            "<div class='avatar'><img src='" + headimg + "' width='30'></div>" +
                            "<div class='content'>" +
                            "<div class='top clearfix'>" +
                            "<div class='name pull-left'>" + reply[i].nickname + "回复#" +
                            reply[i].floor + reply[i].toreceiver +
                            "<p class='date'>评论于:" + $.formatDate('yyyy-MM-dd', reply[i].created) + "</p></div>" +
                            "</div>" +
                            "<div class='bot'>" +
                            reply[i].content +
                            " </div>" +
                            "</div>" +
                            "<div class='right-operating'>" +
                            "<a id='" + reply[i].id + "backingcou'  onclick='backing(" + reply[i].id + "," + reply[i].pid + ")'>顶(" + reply[i].hotup + ")</a>" +
                            "<a id='" + reply[i].id + "anticou'  onclick='anti(" + reply[i].id + "," + reply[i].pid + ")'>踩(" + reply[i].hotdown + ")</a>" +
                            "<a onclick='call(this.name," + t + ","+reply[i].uid+")' name='" + author + "'>" +
                            "<i class='icon icon-message'></i>回复</a>" +
                            "<a>#" + t + "</a></div>" +
                            "</li>";
                    } else {
                        var message = "<li>" +
                            "<div class='avatar'><img src='" + headimg + "' width='30'></div>" +
                            "<div class='content'>" +
                            "<div class='top clearfix'>" +
                            "<div class='name pull-left'>" + reply[i].nickname + "<p class='date'>评论于:" + $.formatDate('yyyy-MM-dd', reply[i].created) + "</p></div>" +
                            "</div>" +
                            "<div class='bot'>" +
                            reply[i].content +
                            " </div>" +
                            "</div>" +
                            "<div class='right-operating'>" +
                            "<a id='" + reply[i].id + "backingcou' onclick='backing(" + reply[i].id + "," + reply[i].pid + ")'>顶(" + reply[i].hotup + ")</a>" +
                            "<a id='" + reply[i].id + "anticou'  onclick='anti(" + reply[i].id + "," + reply[i].pid + ")'>踩(" + reply[i].hotdown + ")</a>" +
                            "<a onclick='call(this.name," + t + ","+reply[i].uid+")' name='" + author + "'>" +
                            "<i class='icon icon-message'></i>回复</a>" +
                            "<a>#" + t + "</a></div>" +
                            "</li>";

                    }
                    $("#messgelist").append(message);
                }
            } else {
                $("#reply").hide();
            }
            if (data.replysize >  $('#messgelist').find('li').length) {
                $('#reply-more').show();
            }else{
                $('#reply-more').hide();
            }
        }
    })
});
//回复
function call(nickname, t,uid) {
    $("#messagelabel").html("回复:#" + t + " " + nickname);
    $("#content").attr("placeholder", "回复");
    $("#floor").val(t);
    $("#author").val(nickname);
    $("#authorid").val(uid);
    $("#onreply").html("回复");
}

//支持
function sharelike(id) {
    var userid = localStorage.getItem("userid");
    if (userid != null && userid != "") {
        $.ajax({
            url: $f.get("SERVER_URL").sharelikeUrl,
            type: "get",
            dataType: 'json',
            data: {"id": id, "userid": userid},
            success: function (data) {
                if (data.success == "yizan") {
                    alert("抱歉!您已点过支持了!");
                } else {
                    $("#hotup").html("支持(" + data.support + ")")
                    alert("支持成功!");
                }
            }
        })
    } else {
        alert("抱歉!请先登录.")
    }
}
//反对
function sharestamp(id) {
    var userid = localStorage.getItem("userid");
    if (userid != null && userid != "") {
        $.ajax({
            url: $f.get("SERVER_URL").sharestampUrl,
            type: "get",
            dataType: 'json',
            data: {"id": id, "userid": userid},
            success: function (data) {
                if (data.success == "yicai") {
                    alert("抱歉!您已点过反对了");
                } else {
                    $("#hotdown").html("反对(" + data.hotdown + ")")
                    alert("反对成功!");
                }
            }
        })
    } else {
        alert("抱歉!请先登录.")
    }
}
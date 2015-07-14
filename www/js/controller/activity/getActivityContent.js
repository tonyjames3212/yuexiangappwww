/**活动详情
 * Created by root0 on 15-7-1.
 */

$F.regist("activity.getActivityContent", function (id) {
    var limit = 5;
    var pageNum = parseInt($('#messgelist').find('li').length / limit);
    var hidevalue = $("#hidevalue").val();
    if (id == "" || id == null) {
        id = hidevalue;
    }
    console.log("活动详情");
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    var userid = localStorage.getItem("userid");
    $("#acreply-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").activityDetailsUrl,
        type: 'post',
        data: {id: id, userid: userid, "page": pageNum, "limit": limit},
        dataType: 'json',
        async: true,
        success: function (data) {
            if (pageNum == 1) {
                var view = data.views;
                var rows = data.resultAct;
                var haveJoined = data.haveJoined;
                var limitMark = data.limitMark;
                var item;
                var item1;
                var actHeadimg = (null == rows['headimg'] ? "/images/noActivityHeadImg.jpg" : rows['headimg']);
                var peopleLimit = (null == rows['people_limit'] ? "无限制" : rows['people_limit']);
                var contactNum = (null == rows['contactNum'] ? "暂未登记" : rows['contactNum']);
                item = "<div class='row' style='font-size: large'>" +
                    "<div class='col-lg-12'>"+
                    "<input type='hidden' value='" + rows['id'] + "'id ='hidevalue'/>" +
                    "<input id='author' type='hidden'/>" +
                    "<input type='hidden' id='zhi' />" +
                    "<input id='floor' type='hidden'/>" +
                    "<input id='authorid' type='hidden'/>" +
                    "<div class='col-lg-12 text-group'>" +
                    "<div class='img'><img src='" + "http://172.16.248.55:8080/" + ctpath + actHeadimg + "' class='img-responsive'></div>" +
                    "<br><a href='' class='pull-right' onclick='activityMapDes(\"" + rows['site'] + "\"); window.event.returnValue=false;'>" +
                    "<label class='title'>看地图></label><img src='img/appMapIcon.png'  style='width: 2em;'></a>" +
                    "<div style='margin-top: 120px'>" +
                    "<br><div class='title'><label style='left;' >活动主题: </label><label class='activity' >"+rows['title']+"</label>" +
                    "</div>" +
                    "<br><div class='title'><label >人数限制: </label><lable class='activity'>" + peopleLimit +"</lable></div>"+
                    "<br><div class='title'><label>联系电话: </label><lable class='activity'>" + contactNum +"</lable></div>"+
                    "<br><div class='title'><label>活动发起: </label><lable class='activity'>" + rows['author'] +"</lable></div>"+
                    "<br><div class='title'><label>活动时间: </label><lable class='activity'>" + $.formatDate('yyyy-MM-dd HH:mm', rows['begin_time']) + "~" + $.formatDate('yyyy-MM-dd HH:mm', rows['end_time']) +"</lable></div>"+
                    "<br><div class='title'><label>活动地点: </label><lable class='activity'>" + rows['site'] +"</lable></div>"+
                    "<br><span class='title'><lable >活动详情:</lable><lable class='activity'>" + rows['content'] + "</lable></span>" +

                    "</div></div></div></div>";


                if ("haveJoined" == haveJoined) {
                    item1 = "<a href='javascript:history.go(-1);' class='back-btn pull-left'><i class='icon icon-back'></i></a>" +
                        "<div class='nums pull-left'>" +
                        "<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>" + view + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>" + rows['reply_count'] + "</a></span>" +
                        "</div><div class='pull-right'>" +
                        "<button class='btn btn-primary'>已经报名</button>" +
                        "</div>";
                } else if ("no" == limitMark) {
                    item1 = "<a href='javascript:history.go(-1);' class='back-btn pull-left'><i class='icon icon-back'></i></a>" +
                        "<div class='nums pull-left'>" +
                        "<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>" + view + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>" + rows['reply_count'] + "</a></span>" +
                        "</div><div class='pull-right'>" +
                        "<button class='btn btn-primary'>人数已满</button>" +
                        "</div>";
                } else {
                    item1 = "<a href='javascript:history.go(-1);' class='back-btn pull-left'><i class='icon icon-back'></i></a>" +
                        "<div class='nums pull-left'>" +
                        "<span class='broswer'><a href='#'><i class='icon icon-broswer'></i>" + view + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>" + rows['reply_count'] + "</a></span>" +
                        "</div><div class='pull-right'>" +
                        "<label id='actJoinLabel'><button class='btn btn-primary' onclick='joinActivity(" + rows['id'] + ")'>+报名参加</button></label>" +
                        "</div>";
                }
                $("#actDetails").append(item);
                $("#actDesHeader").append(item1);
            }

            var reply = data.replyList;
            var hotReplies = data.hotReplies;
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
                                "<a href='#' id='" + hotReplies[i].id + "backingofhotcou' onclick='backing(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>顶(" + hotReplies[i].hotup + ")</a>" +
                                "<a href='#' id='" + hotReplies[i].id + "antiofhotcou'  onclick='anti(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>踩(" + hotReplies[i].hotdown + ")</a>" +
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
                                "<a href='#' id='" + hotReplies[i].id + "backingofhotcou' onclick='backing(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>顶(" + hotReplies[i].hotup + ")</a>" +
                                "<a href='#' id='" + hotReplies[i].id + "antiofhotcou'  onclick='anti(" + hotReplies[i].id + "," + hotReplies[i].pid + ")'>踩(" + hotReplies[i].hotdown + ")</a>" +
                                "</div></li>";

                        }
                        $("#hotlist").append(message);

                    }
                } else {
                    $("#hotreply").hide();
                }
            }
            //评论列表

            if (data.replysize != 0) {
                var t;
                if (pageNum == 1) {
                    t = data.replysize + 1;
                } else {
                    t = $("#zhi").val();
                }
                for (var i = 0; i < data.asize; i++) {
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
                            reply[i].floor + reply[i].torecevier +
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
                $('#acreply-more').show();
            }else{
                $('#acreply-more').hide();
            }
        }
    });
});

//回复
function call(nickname, t,uid) {
    $("#authorid").val(uid);
    $("#messagelabel").html("回复:#" + t + " " + nickname);
    $("#content").attr("placeholder", "回复");
    $("#floor").val(t);
    $("#author").val(nickname);
    $("#onreply").html("回复");
}
//显示地图
function activityMapDes (site){
    window.location.href = encodeURI("/activity_map.html?site=" + site);
}
//报名参加
function joinActivity (actId){
    if (null == localStorage.getItem("userid")){
        window.location.href = "login.html";
    }else {
        $.ajax({
            url: $f.get("SERVER_URL").activityJoinUrl ,
            type: 'post',
            data: {id:actId, userid: localStorage.getItem("userid")},
            dataType: 'json',
            success: function (result) {
                if ("false" == result){
                    alert("报名失败!");
                }else {
                    $('#actJoinLabel').html("<button class='btn btn-primary'>已经报名</button>");
                }
            }
        });
    }
}
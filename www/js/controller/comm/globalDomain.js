/**
 * Created by hanzhendong on 2015/2/11.
 * Updated by zhangyihua on 2015/3/10.
 */

/**
 * 作品踩
 * @param tid
 */
function onStamp(tid) {
    var userid=localStorage.getItem("userid");
    var btnZan = $("#" + tid + "zan");
    var btnCai = $("#" + tid + "cai");
    var zanSrc = btnZan.attr('src');
    var caiSrc = btnCai.attr('src');
    var hotup = parseInt($('#' + tid + 'hotup').html());
    var hotdown = parseInt($('#' + tid + 'hotdown').html());
    //如果当前状态是没有点踩, 还应该判断是不是点了赞了
    if (caiSrc == 'img/btn_cai.png') {
        btnCai.attr('src', 'img/btn_diancai.png');
        $('#' + tid + 'hotdown').html(hotdown + 1);
        //如果已经点了赞了, 就应该取消点赞
        if (zanSrc == 'img/btn_dianzan.png') {
            cancelLike(tid, btnZan, hotup);
        }
        //todo 通知后台点踩
        $.ajax({
            url: $f.get("SERVER_URL").sharestampUrl,
            type: "get",
            dataType: 'json',
            data: {"id": tid, "userid": userid},
            success: function (data) {
                //if (data.success == true) {
                //    alert("已反对");
                //} else {
                //    $('#stampimg').html(data.success);
                //}
            }
        })
    }
    //如果当前状态是已经点了踩了, 则应该取消点踩
    else {
        cancelStamp(tid, btnCai, hotdown);
    }
    //$f.call('activity.work.onStamp', tid, hotup);
}

/**
 * 作品赞
 * @param tid
 */
function onLike(tid) {
    var userid=localStorage.getItem("userid");
    var btnZan = $("#" + tid + "zan");
    var btnCai = $("#" + tid + "cai");
    var zanSrc = btnZan.attr('src');
    var caiSrc = btnCai.attr('src');
    var hotup = parseInt($('#' + tid + 'hotup').html());
    var hotdown = parseInt($('#' + tid + 'hotdown').html());
    //如果当前状态是没有点赞, 还应该判断是不是点了踩了
    if (zanSrc == 'img/btn_zan.png') {
        btnZan.attr('src', 'img/btn_dianzan.png');
        $('#' + tid + 'hotup').html(hotup + 1);
        //如果已经点了踩了, 就应该把踩取消
        if (caiSrc == 'img/btn_diancai.png') {
            cancelStamp(tid, btnCai, hotdown);


        }
        //todo 通知后台点赞
        $.ajax({
            url: $f.get("SERVER_URL").sharelikeUrl,
            type: "get",
            dataType: 'json',
            data: {"id": tid, "userid": userid},
            success: function (data) {
                //if (data.success == true) {
                //    alert("已支持");
                //} else {
                //    $("#likeimg").html(data.success);
                //}
            }
        })

    }
    //如果当前状态是已经点了赞了, 则应该取消点赞
    else {
        cancelLike(tid, btnZan, hotup);
    }
    //$f.call('activity.work.onLike', tid,hotup);
}

/**
 * 取消赞
 * @param tid
 * @param btnZan
 * @param hotup
 */
function cancelLike(tid, btnZan, hotup) {
    btnZan.attr('src', 'img/btn_zan.png');
    var userid=localStorage.getItem("userid");
    $('#' + tid + 'hotup').html(hotup - 1);
    //todo 通知后台取消赞
    $.ajax({
        url: $f.get("SERVER_URL").sharelikenoUrl,
        type: "get",
        dataType: 'json',
        data: {"id": tid, "userid": userid},
        success: function (data) {
            //if (data.success == true) {
            //    alert("已支持");
            //} else {
            //    $("#likeimg").html(data.success);
            //}
        }
    })
}

/**
 * 取消踩
 * @param tid
 * @param btnCai
 * @param hotdown
 */
function cancelStamp(tid, btnCai, hotdown) {
    var userid=localStorage.getItem("userid");
    btnCai.attr('src', 'img/btn_cai.png');
    $('#' + tid + 'hotdown').html(hotdown - 1);
    //todo 通知后台取消踩
    $.ajax({
        url: $f.get("SERVER_URL").sharestampnoUrl,
        type: "get",
        dataType: 'json',
        data: {"id": tid, "userid": userid},
        success: function (data) {
            //if (data.success == true) {
            //    alert("已支持");
            //} else {
            //    $("#likeimg").html(data.success);
            //}
        }
    })
}

/**
 * 提交评论内容
 */
function sendComment() {
    var userid=localStorage.getItem("userid");
    var content = $('#article-reply').val();
    var pid = $f.call('comm.getUrlValueByKey', 'pid');
    var ctype=$f.call('comm.getUrlValueByKey', 'ctype');
    var receiver=$f.call('comm.getUrlValueByKey', 'receiver');
    var floor=$f.call('comm.getUrlValueByKey', 'floor');
    history.go(-1);//后退一步即返回上一个页面
    //回复的话添加回复的楼层和receiver的昵称。
    if(userid==null){
        alert("您还没有登录，不能评论，请先登录");
    }else{
        $.ajax({
            url: $f.get("SERVER_URL").replypublishUrl,
            type: 'post',
            data: {"pid": pid, "content": content,"ctype":ctype,"userid":userid,"receiver":Receiver,"floor":floor},
            dataType: 'json',
            success: function (data) {
                if(data.success==true){
                    if(data.reply=='1'){
                        alert("回复成功！");
                    }else{
                        alert("评论成功！");
                    }
                    //$f.call('comm.getReplyList', data.pid,data.ctype,true);

                }else{
                    alert("评论失败！");
                }
            }
        });
    }


}

/**
 * 热门评论--顶
 * @param rid 评论id
 * @param tid 分享id
 */
function backing(rid,tid){
    var userid = localStorage.getItem("userid");
    if(userid != null && userid != "") {
        var rid = rid;
        $.ajax({
            url: $f.get("SERVER_URL").backingUrl,
            type: 'post',
            data: {"rid": rid, "tid": tid, "userid": userid},
            dataType: 'json',
            success: function (data) {
                if (data.success == false) {
                    alert("抱歉,您已成功点顶");
                } else {
                    $("#" + rid + "backingcou").html("顶(" + data.hotup + ")");
                    //如果hotreply里面有该条评论，则同样设置一下现在的条数
                    if ($("#" + rid + "backingofhotcou").length > 0) {
                        $("#" + rid + "backingofhotcou").html("顶(" + data.hotup + ")");
                    }
                }
            }
        })
    }else{
        alert("登录后再点赞把!!");
    }
}

/**
 * 热门评论--踩
 * @param id
 * @param rid
 * @param tid
 */
function anti(rid,tid) {
    var userid = localStorage.getItem("userid");
    if(userid != null && userid != "") {
        var rid = rid;
        $.ajax({
            url: $f.get("SERVER_URL").antiUrl,
            type: 'post',
            data: {"rid": rid, "tid": tid, "userid": userid},
            dataType: 'json',
            success: function (data) {
                if (data.success == false) {
                    alert("抱歉,您已成功点踩");
                } else {
                    $("#" + rid + "anticou").html("踩(" + data.hotdown + ")");
                    //如果hotreply里面有该条评论，则同样设置一下现在的条数
                    if ($("#" + rid + "antiofhotcou").length > 0) {
                        $("#" + rid + "antiofhotcou").html("踩(" + data.hotdown + ")");
                    }
                }
            }
        })
    }else {
        alert("登录后再点踩把!!");
    }
}

//
function replyoranswer(id){
    var url = $('#' + id).attr('href');
    var reg1= new RegExp("(^|&)receiver=([^&]*)(&|$)", "i");
    var r1 = url.substr(url.indexOf('?') + 1).match(reg1);
    var reg2= new RegExp("(^|&)floor=([^&]*)(&|$)", "i");
    var r2 = url.substr(url.indexOf('?') + 1).match(reg2);
    Receiver=r1[2];
    Floor=r2[2];
}


function adds(name){
    if(null == localStorage.getItem("userid")){
        alert("抱歉!请登录");
        window.location.href="login.html";
    }else{
        window.location.href="/"+name+".html"
    }
}
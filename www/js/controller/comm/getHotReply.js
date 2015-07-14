/**
 * Created by ThinkPad on 2015/6/11.
 */
$F.regist('comm.getHotReply', function (pid,ctype) {
    $.ajax({
        url: $f.get("SERVER_URL").hotReplyUrl,
        type: 'get',
        data: {"pid": pid,"ctype":ctype},
        dataType: 'json',
        success: function (data) {
            if(data.success=true){
                var headimg = "";
                var replyid = ""
                var hotup = "";
                var hotdown = "";
                var hotReplies=data.hotReplies;
                for(var i=0;i<hotReplies.length;i++){
                    replyid = hotReplies[i].id;
                    hotup = hotReplies[i].hotup;
                    pid=hotReplies[i].pid;
                    hotdown = hotReplies[i].hotdown;
                    headimg = hotReplies[i].headimg;
                    headimg = headimg.replace("/upload", "http://172.16.248.55:8080/yuexiang/upload");
                    //评论的顶按钮 的id为该条评论在reply表中的id拼接backingofhot，点击后数字发生变化，显示数字的<i>标签的id为id+backingofhotcou
                    var list = "<li>"
                        + "<a>"
                        + "<img src='" + headimg + "' style='width:20%;'/>"
                        + "<h3>"
                        + hotReplies[i].nickname
                        + "</h3>"
                        + "<P>"
                        + hotReplies[i].content
                        + "</P>"
                        + "<p class='ui-li-aside'>"
                        + hotReplies[i].created
                        + "</P>"
                        + "</a>"
                        + "<ul  class='backantibtn'>"
                        + "<li id='" + replyid + "backing'  onclick='backing(" + replyid +","+pid+ ")'><img id='zan' src='img/btn_zan.png' class='backingbtn'>" +"<i id='" + replyid + "backingcou' >" + hotup +"</i>" + "</li>"
                        + "<li id='" + replyid + "anti'  onclick='anti(" + replyid+","+pid+")'><img id='cai' src='img/btn_cai.png' class='antibtn'>" +"<i id='" + replyid + "anticou' >" +  hotdown +"<i>" + "</li>"
                        + "</ul>"
                        + "</li>";
                    $("#hot-reply").append(list);
                }
            }
        }
    });
});
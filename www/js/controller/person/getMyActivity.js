/**
 * Created by zhangzhen on 2015.03.2
 */
$F.regist("person.getMyActivity", function (num) {
    var userid = localStorage.getItem("userid");
    var items = 10;
    var pageNum = parseInt($('#activity-list').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $.ajax({
        url: $f.get("SERVER_URL").myactivityUrl,
        type: 'post',
        data: {"limit": items, "page": pageNum, "userid": userid,"num":num},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var rows = data.rows;
            var actHeadimg = "";
            var userHeadimg = "";
            for (var i = 0; i < data.rows.length; i++) {
                actHeadimg = (null == rows[i].headimg ? "/images/noActivityHeadImg.jpg" : rows[i].headimg);
                userHeadimg = (null == rows[i].uheadimg ? "/images/head.jpg" : rows[i].uheadimg);
                var list;
                list = "<li><div class='contentBox row'><div class='col-xs-12'><section class='row'><a onclick='activityDes(" + rows[i].id + ")'><div class='col-xs-3 activeImg'>" +
                    "<img src='" + "http://172.16.248.55:8080/" + ctpath + actHeadimg + "' class='img-responsive pull-left'></div><div class='col-xs-9'><h1>" + (rows[i].title.length > 20 ? rows[i].title.substr(0, 20) + '...' : rows[i].title) + "</h1>" +
                    "<p class='status'>最新活动</p><div class='content'><p><b>时间：</b> " + rows[i].begin_time + "~" + rows[i].end_time + "</p>" +
                    "<p><b>地点：</b>" + (rows[i].site.length > 20 ? rows[i].site.substr(0, 20) + '...' : rows[i].site) + "</p></div></div></a></section>" +
                    "<section class='row info'><div class='col-xs-12'><div class='pull-left'><div class='avatar'>"+rows[i].created+"</div>" +
                    "</div><div class='pull-right nums'><span class='broswer'><a href='#'><i class='icon icon-broswer'></i>" + rows[i].views + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>" + rows[i].reply_count + "</a></span>" +
                    "</div></div></section></div></div></li>";
                $("#activity-list").append(list);
            }
         //   $('#activity-list').listview('refresh');
            if (total > $('#activity-list').find('li').length) {
                $("#activity-more").show();
            } else {
                $("#activity-more").hide();
            }
        }
    })
    //var items = 10;
    //var pageNum = parseInt($('#activities-content').find('li').length / 10);
    //pageNum = pageNum == 0 ? 1 : pageNum + 1;
    //$("#activities-more").hide();
    //console.log(pageNum + "个人活动页数+++++");
    //$.ajax({
    //    url: $f.get("SERVER_URL").MyActivityUrl,
    //    type: 'get',
    //    data: {"limit": items, "page": pageNum, "userid": localStorage.getItem("userid")},
    //    dataType: 'json',
    //    success: function (data) {
    //        var total = data.total;
    //        var actData = data.rows;
    //        var actHeadimg = "" ;
    //        for (var i = 0; i < actData.length; i++) {
    //            actHeadimg = (null == actData[i].headimg?"/images/noActivityHeadImg.jpg":actData[i].headimg);
    //            var list = "<li>" +
    //                "<a href='#' onclick='activityDes(" + actData[i].id + ")' data-transition='none'>" +
    //                "<img src='" + "http://172.16.248.55:8080/yuexiang" + actHeadimg + "'/>" +
    //                "<h2>"
    //                + actData[i].title
    //                + "</h2><P>"
    //                + actData[i].content
    //                + "</P>"
    //                + "</a></li>";
    //            $("#activities-list").append(list);
    //            $("#activities-list").listview('refresh');
    //        }
    //        if (total > $('#activities-content').find('li').length) {
    //            $("#activities-more").show();
    //        }
    //    }
    //})
});

function activityDes(id) {
    window.location.href = "/activity_details.html?id=" + id;
}
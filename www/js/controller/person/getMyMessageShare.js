$F.regist("person.getMyMessageShare", function () {
    var items = 10;
    var pageNum = parseInt($('#messages-content').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#messagesShare-more").hide();
    $.ajax({
        url: $f.get("SERVER_URL").MyMessageShareUrl,
        type: 'get',
        data: {"limit": items, "page": pageNum, "userid": localStorage.getItem("userid")},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var magData = data.rows;
            var host = "http://172.16.248.55:8080/yuexiang";
            for (var i = 0; i < magData.length; i++) {
                var img = magData[i].head ? host + magData[i].head : host + '/images/head.jpg';
                var list;
                var readOrNo = magData[i].readflag;
                if ("0" == readOrNo){
                    list = "<li><a href='replylist.html?ctype=0&pid=" + magData[i].sid + "' data-transition='none'>" +
                        "<img src='" + img + "'/><div style=';font-weight: bold;font-size: large'><h2 style='color: #3388cc'>"
                        + magData[i].repname
                        + "</h2><P style='color: #3388cc'>"
                        + (magData[i].message.length>20?magData[i].message.substr(0,20) + '...' :magData[i].message)
                        + "</P></div><a href='share_article.html?id=" + magData[i].sid + "'>原文</a>"
                        + "</a></li>";
                } else {
                    list = "<li><a href='replylist.html?ctype=0&pid=" + magData[i].sid + "' data-transition='none'>" +
                        "<img src='" + img + "'/><h2>"
                        + magData[i].repname
                        + "</h2><P>"
                        + (magData[i].message.length>20?magData[i].message.substr(0,20) + '...' :magData[i].message)
                        + "</P><a href='share_article.html?id=" + magData[i].sid + "'>原文</a>"
                        + "</a></li>";
                }

                $("#messages-list").append(list);
                $("#messages-list").listview('refresh');
            }
            if (total > $('#messages-content').find('li').length) {
                $("#messagesShare-more").show();
            }
        }
    })
});
$(document).ready(function () {
	$("#messagesShare-more").click(function () {
        $f.call('person.getMyMessageShare');
    });
});
/**
 * Created by HuayiSeven on 2015/3/16.
 */
$F.regist('person.getMyArticle', function (atcId) {
    $.ajax({
        url: $f.get("SERVER_URL").myDetailUrl,
        type: 'get',
        data: {"id": atcId},
        dataType: 'json',
        success: function (data) {
            console.log("获取作品详细++++++++++");
            var contents =
                "<header class='other'>"
                + " <div class='container'>"
                + " <div class='row'>"
                + " <div class='col-xs-12'>"
                + " <a href='javascript:history.go(-1)' class='back-btn pull-left'><i class='icon icon-back'></i></a>"
                + " <div class='nums pull-left'>"
                + " <span class='broswer'><a href='#'><i class='icon icon-broswer'></i>"
                + data['views']
                + "</a></span>&nbsp;&nbsp;&nbsp;&nbsp;    "
                +"<span class='message'><a id='article-reply' href='#' onclick='replyshare()' data-transition='none'><i class='icon icon-message'></i>"
                + data['reply_count']
                + "</a></span>"
                + " </div>"
                + " </div>"
                + " </div>"
                + " </div>"
                + " </header>"
                + " <div class='container detailBox'>"
                + " <div class='row'>"
                + "  <div class='col-lg-12'>"
                + "  <h1>"
                + data['title']
                + "</h1>"
                + " <p class='status'>5天前</p>"
                + " </div>"
                + "  <div class='col-lg-12 text-group'>"
                + " <p>"
                + data['content']
                + "</p>"
                + " </div>"
                + " </div>"
                + " </div>";
            $("#div-article").append(contents);
            //var row = data.row;
            //if (row == 1) {
            //    var btnZan = $("#" + dat['id'] + "zan");
            //    btnZan.attr('src', 'img/btn_dianzan.png');
            //}
            //if (row == 0) {
            //    var btnCai = $("#" + dat['id'] + "cai");
            //    btnCai.attr('src', 'img/btn_diancai.png');
            //}
            //$("#hotup").attr("id", dat['id'] + "hotup").html(dat['hotup']);
            //$("#hotdown").attr("id", dat['id'] + "hotdown").html(dat['hotdown']);

            //$("#article-reply").attr("href", "replylist.html?ctype=0&pid=" + dat['id'])
        }
    })
});

//没有效果
function replyshare(id){
    window.location="#inputmessage";
}
//返回
function onbacking(){
    window.location.href="/person_myshare.html";
}
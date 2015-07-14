/**
 * Created by HuayiSeven on 2015/2/10.
 */
$F.regist('comm.homeList', function (id, url, recall) {
    var items = 10;
    var pageNum = parseInt($('#div-' + id).find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    console.log("page: " + pageNum);
    $.ajax({
        url: url,
        type: "get",
        dataType: 'json',
        data: {"limit": items, "page": pageNum},
        success: function (data, status) {
            var total = data.total;
            //原来是items，改为了rows，如有冲突，稍后改回来
            var rows = data.rows;
            if(recall){
                recall(total, rows);
            }

            if(total > $('#div-' + id).find('li').length){
                $("#more-" + id).show();
            }else{
                $("#more-" + id).hide();
            }
        }
    })
});
/**
 * Created by hanzhendong on 2015/2/3.
 */
$F.regist('facility.facility', function () {
    $.ajax({
        url: $f.get("SERVER_URL").facilitycontentUrl,
        type: 'get',
        data: {"id": id},
        dataType: 'json',
        success: function (data) {
            var dat = data;
            console.log("获取作品详细++++++++++");
            var contents =
                "<header class='other'>"
                + " <div class='container'>"
                + " <div class='row'>"
                + " <div class='col-xs-12'>"
                + " <a href='javascript:history.go(-1);' class='back-btn pull-left'><i class='icon icon-back'></i></a>"
                +" <h1 style='text-align: center;font-size: 1.4em'>设施详情</h1>"
                + " </div>"
                + " </div>"
                + " </div>"
                + " </header>"
                + " <div class='container detailBox'>"
                + " <div class='row'>"
                + "  <div class='col-lg-12'>"
                + "  <h1 style='text-align: center'>"
                + dat['title']
                + "</h1>"
                + " </div>"
                + "  <div class='col-lg-12 text-group'>"
                + " <p>"
                + "编辑人:"+dat['author']
                +"<br>创建时间:"+dat['created']
                + "<br>"
                + " 地  址 :"+dat['site']
                + "</p>"
                + " </div>"
                + " </div>"
                + " </div>";
            $("#div-facility").append(contents);
        }
    });
});


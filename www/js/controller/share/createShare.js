/**
 * Created by HuayiSeven on 2015/3/16.
 */
$F.regist('share.createShare', function () {
    $.ajax({
        url: $f.get("SERVER_URL").listNodeUrl,
        type: "get",
        dataType: 'json',
        success: function (data) {
            var ttl = data.total;
            var tl = data.rows;
            for (var i = 0; i < ttl; i++) {
                var option = document.createElement("option");
                option.text = tl[i].title;
                option.value = tl[i].id;
                var sel = document.getElementById("selectNode");
                sel.appendChild(option);
            }
        }
    })
});
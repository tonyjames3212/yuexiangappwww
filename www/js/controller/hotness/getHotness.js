/**
 * Created by HuayiSeven on 2015/2/6.
 */
$F.regist('hotness.getHotness', function () {
    $f.call("comm.homeList",
        "hotness",
        $f.get("SERVER_URL").hotnessUrl,
        function(total, items){
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var img = item.Headimg ? host + item.Headimg : 'img/tu4.png';
                var list = "<li><a href='topic.html?id=" + item.Id + "&type=hotness' data-transition='none'>" +
                    "<img src='" + img + "'/>" +
                    "<h2>" + item.Title + "</h2>" +
                    "<p>" + item.Content + "</p></a></li>";
                $("#ul-list-hotness").append(list);
                $("#ul-list-hotness").listview('refresh');
            }
        }
    );
});
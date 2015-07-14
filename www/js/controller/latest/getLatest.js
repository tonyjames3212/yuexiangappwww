/**
 * Created by HuayiSeven on 2015/2/9.
 */
$F.regist('latest.getLatest', function () {
    $f.call("comm.homeList",
        'latest',
        $f.get("SERVER_URL").latestUrl,
        function(total, items){
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var img = item.Headimg ? host + item.Headimg : 'img/tu4.png';
                var list = "<li><a href='topic.html?id="+item.Id+"&type=latest' data-transition='none'>" +
                    "<img src='"+img+"'/>" +
                    "<h2>" + item.Title + "</h2>" +
                    "<p>" + item.Content + "</p></a></li>";
                $("#ul-list-latest").append(list);
                $("#ul-list-latest").listview('refresh');
            }
        }
    );
});
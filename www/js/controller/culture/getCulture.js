/**
 * Created by HuayiSeven on 2015/2/9.
 */
$F.regist('culture.getCulture', function () {
    $f.call("comm.homeList",
        'culture',
        $f.get("SERVER_URL").cultureUrl,
        function(total, items){
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var img = item.Headimg ? host + item.Headimg : 'img/tu4.png';
                var list = "<li><a href='topic.html?id=" + item.Id + "&type=culture' data-transition='none'>" +
                    "<img src='" + img + "'/>" +
                    "<h2>" + items[i].Name + "</h2>" +
                    "<p>" + items[i].Content + "</p></a></li>";
                $("#ul-list-culture").append(list);
                $("#ul-list-culture").listview('refresh');
            }
        }
    );
});
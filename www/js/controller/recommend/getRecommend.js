/**
 * Created by hanzhendong on 2015/2/5.
 */
$F.regist('recommend.getRecommend', function () {
    $f.call("comm.homeList",
        'recommend',
        $f.get("SERVER_URL").recommendUrl,
        function(total, items){
            var host = $f.get("SERVER_URL").host;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var img = item.Headimg ? host + item.Headimg : 'img/tu4.png';
                var list = "<li><a href='topic.html?id=" + item.Id + "&type=recommend' data-transition='none'>" +
                    "<img src='" + img + "'/>" +
                    "<h2>" + item.Title + "</h2>" +
                    "<p>" + item.Content + "</p></a></li>";
                $("#ul-list-recommend").append(list);
                $("#ul-list-recommend").listview('refresh');
            }
        }
    );
});
/**
 * Created by root0 on 15-7-10.
 */
$F.regist('facility.facilityList', function () {

    var markerArr = new Array;
    $.ajax({
        url: $f.get("SERVER_URL").facilitylistUrl,
        type: 'post',
        dataType: 'json',
        async: true,
        success: function (data) {
            var flist = data.flist;
            var fsize = data.fsize;
            alert(fsize);
            $.each(flist, function (i, result) {
                markerArr.push({
                    id: result['id'],
                    title: result['title'],
                    point: result['point'],
                    address: result['site'],
                    tel: result['tel']
                });
            });
        }

    });

var map; //Map实例
function map_init() {
    map = new BMap.Map("l-map");
    //第1步：设置地图中心点，山东省
    var point = new BMap.Point(117.047237, 36.66673);
    //第2步：初始化地图,设置中心点坐标和地图级别。
    /*map.centerAndZoom(point, 8);*/
    map.centerAndZoom('莱芜市', 8);
    //第3步：启用滚轮放大缩小
    map.enableScrollWheelZoom(true);
    //第4步：向地图中添加缩放控件
    var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(ctrlNav);
    //第5步：向地图中添加缩略图控件
    var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
    });
    map.addControl(ctrlOve);

    //第6步：向地图中添加比例尺控件
    var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    map.addControl(ctrlSca);

    //第7步：绘制点
    for (var i = 0; i < markerArr.length; i++) {
        var p0 = markerArr[i].point.split(",")[0];
        var p1 = markerArr[i].point.split(",")[1];
        var maker = addMarker(new window.BMap.Point(p0, p1), i);
        addInfoWindow(maker, markerArr[i], i);
    }

    function G(id) {
        return document.getElementById(id);
    }

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId"
            , "location": map
        });

    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });

    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

        setPlace();
    });

    function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
}


// 添加标注
function addMarker(point, index) {
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png",
        new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - index * 25)
        });
    /*var marker = new BMap.Marker(point, { icon: myIcon });*/
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    /*var label = new BMap.Label("我是id=",{offset:new BMap.Size(20,-10)});
     marker.setLabel(label);*/
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    return marker;
}

// 添加信息窗口
function addInfoWindow(marker, poi) {
    //pop弹窗标题
    var title = '<div style="font-weight:bold;color:#CE5521;font-size:14px"><a onclick="content(' + poi.id + ')">' + "名称：" + poi.title + '</a></div>';
    //pop弹窗信息
    var html = [];
    html.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');
    html.push('<tr>');
    html.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址:</td>');
    html.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');
    html.push('</tr>');
    html.push('</tbody></table>');
    var infoWindow = new BMap.InfoWindow(html.join(""), {title: title, width: 200});

    var openInfoWinFun = function () {
        marker.openInfoWindow(infoWindow);
    };
    marker.addEventListener("click", openInfoWinFun);
    return openInfoWinFun;
}

//异步调用百度js
function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=2.0&ak=DO0PnaDo4SLzjVhok7MQNxSw&callback=map_init";
    document.body.appendChild(load);
}

window.onload = map_load;
    });
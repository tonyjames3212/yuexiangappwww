/**
 * Created by hanzhendong on 2015/1/27.
 */
$f.config({autoLoad: true, splitChar: /\.+/g, path: "js/controller"});
/*初始化地址*/
$f.call("ServerURL");

/*初始化首页*/
//$f.call("news.getNews");

/*//页面初始化会报错，做的时候再取消屏蔽：--15.6.8
$f.call("recommend.getRecommend");
$f.call("latest.getLatest");
$f.call("hotness.getHotness");
$f.call("culture.getCulture");*/

$(document).ready(function () {
    var userid=localStorage.getItem("userid");
    if(userid!=null&&userid!=""){
        $("#footer-login").attr("id","footer-info");//将登陆的指向变为个人信息的指向
    }

    /* 导航切换content内容*/
    $('#header-ul li a').click(function () {
        console.log("上面导航切换");
        $('#div-news').hide();
        $('#div-recommend').hide();
        $('#div-latest').hide();
        $('#div-hotness').hide();
        $('#div-culture').hide();
        switch ($(this).text()) {
            case '新闻':
                console.log("切换到新闻");
                $('#div-news').show();
                break;
            case '推荐':
                console.log("切换到推荐");
                $('#div-recommend').show();
                break;
            case '最热':
                console.log("切换到最热");
                $('#div-hotness').show();
                break;
            case '最新':
                console.log("切换到最新");
                $('#div-latest').show();
                break;
            case '文化':
                console.log("切换到文化");
                $('#div-culture').show();
                break;
            default:
                $('#div-news').show();
        }
    });
    /*导航切换标题*/
    $('#footer li a').click(function () {
        $('#header-content').hide();
        $('#activity').hide();
        $('#share').hide();
        $('#login').hide();
        $('#person').hide();
        switch ($(this).attr('id')) {
            //首页
            case'footer-home':
                $('#header-content').show();
                break;
            //主题活动
            case 'footer-activity':
                $('#activity').show();
                if (!$('#activity').attr('showed')) {
                    $f.call('activity.getActivity');
                    $('#activity').attr('showed', 'true');
                }
                break;
            //互动分享
            case 'footer-share':
                $('#share').show();
                if (!$('#share').attr('showed')) {
                    $('#share').attr('showed', 'true');
                    $f.call('share.getShare');
                }
                break;
            //登录
            case 'footer-login':
                $("#login").show();
                if (!$("#login").attr('showed')) {
                    $("#login").attr('showed', 'true');
                    $f.call('login.login');
                }
                break;
            //个人中心
            case 'footer-info':
                //$('#header-content').load('person.html');
                $("#person").show();
                if (!$("#person").attr('showed')) {
                    $("#person").attr('showed', 'true');
                    $f.call('person.getMyInfo');
                }
                break;
        }

    })
});

$(document).ready(function () {
    $("#sign").click(function () {
        $f.call('person.postSignIn');
    });
});

$(document).ready(function () {

    $("#comment").click(function () {
        $("#text").remove();
        $("#sure").remove();
        $("#c").append("<textarea id='text'></textarea><label id='sure' style='font-size:50%;'>确定</label>");
    });
    $("#praise").click(function () {
        $("#praise").append("<label>a</label>");
    });
    $("#stamp").click(function () {
        $("#stamp").append("<label>a</label>");
    });
});

$(document).ready(function () {
    $("#news-more").click(function () {
        $f.call("news.getNewsList");
    });
    $("#more-recommend").click(function () {
        $f.call("recommend.getRecommend");
    });
    $("#more-hotness").click(function () {
        $f.call("hotness.getHotness");
    });
    $("#more-latest").click(function () {
        $f.call("latest.getLatest");
    });
    $("#more-culture").click(function () {
        $f.call("culture.getCulture");
    });
    $("#activity-more").click(function () {
        $f.call('activity.getActivity');
    });
	
    $("#share-more").click(function () {
        $f.call('share.getShare');
    });
    $("#myshare-more").click(function(){
        $f.call('person.getMyShare');
    });
    $("#reply-more").click(function(){
        $f.call("share.getArticle");
    });

    $("#acreply-more").click(function(){
        $f.call("activity.getActivityContent");
    });

    $("#messages-more").click(function(){
        $f.call("person.getMyMessage");
    });

    $("#logout").click(function(){
        var flag=confirm("确定退出登录吗？");
        if(flag){
            localStorage.clear();//在localStorage中只存储登录状态信息的情况下可以全部清除，否侧localStorage.removeItem("site");一个个的删
            //退出登录后返回登录页吧
            /*$("#footer-login").attr("id","footer-login");//将个人信息的指向变为登陆的指向
            $("#person").hide();
            //$("#login").show();
            if (!$("#login").attr('showed')) {
                $("#login").attr('showed', 'true');
                //$f.call('login.login');
            }
            //刷新页面
            history.go(0);*/
			window.location.href="my.html";
        }
    });
});


function getUrlParam(id, name) {
    var url = $('#' + id).attr('data-url');
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    else {
        return null;
    }
}
//function getHrefParam(id, name) {
//    var url = $('#' + id).attr('href');
//    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//    var r = url.substr(url.indexOf('?') + 1).match(reg);
//    if (r != null) {
//        return unescape(r[2]);
//    }
//    else {
//        return null;
//    }
//}
/**
 * Created by hanzhendong .
 */
$F.regist("ServerURL", function () {
    var host = 'http://localhost:8080/yuexiang';
    var host1 = 'http://172.16.248.130:3000/yuexiangapp';

    this.SERVER_URL = {
        host: host,
        //获取最新的地址
        latestUrl: host + "/mapi/home/get/latest",
        /*获取推荐地址*/
        recommendUrl: host + "/mapi/home/get/recommend",
        /*最热地址*/
        hotnessUrl: host + "/mapi/home/get/hotness",
        /*文化地址*/
        cultureUrl: host + "/mapi/home/get/culture",
        //获取文章信息
        topicUrl: host + "/mapi/home/get/homecontent",

        /*新闻地址(实现)*/
        newsUrl: host + "/mapi/news/get/newslist",
        //获取新闻详情(实现)
        newscontentUrl: host + "/mapi/news/get",

        /*主题活动地址*/
        activityUrl: host + "/mapi/activity/get/list",
        activityDetailsUrl: host + "/mapi/activity/get/content",
        activityArticleListUrl: host + "/mapi/activity/get/activityarticlelist",
        activityArticleUrl: host + "/mapi/activity/get/activityarticle",
        activityCreateUrl: host + "/mapi/activity/get/save",
        activityJoinUrl : host + "/mapi/activity/get/join",
        activityMarkListUrl : host + "/mapi/activity/get/actMarkList",
        activityVenueListUrl : host + "/mapi/activity/get/actVenueList",
        activityVenueSubListUrl : host + "/mapi/activity/get/actVenueSubList",
        myactivityUrl : host+"/mapi/activity/get/myactivity",
        activityUploadImgUrl: host + "/mapi/activity/get/uploadCover",


        /*互动分享地址*/
        shareUrl: host + "/mapi/share/get/sharetypelist",//分享列表--已完成
        shareArticleListUrl: host + "/mapi/share/get/sharearticlelist",
        shareArticleUrl: host + "/mapi/share/get/sharearticle",
        workDetailUrl: host + "/mapi/share/get/workDetail",
        listNodeUrl: host + "/mapi/share/get/listNode",//类型--已完成
        addShareUrl: host + "/mapi/share/get/addShare",//保存分享--已完成
        sharelikeUrl: host + "/mapi/share/get/sharelike",//支持分享
        sharestampUrl: host + "/mapi/share/get/sharestamp",//反对分享
        delshareUrl: host + "/mapi/share/get/delshare",//删除分享
        editshareUrl: host + "/mapi/share/get/editshare",//修改分享页面
        gaiShareUrl: host + "/mapi/share/get/changeshare",//修改分享
        myDetailUrl: host +"/mapi/share/get/mydetail",//我的分享详情页面
        addReplyUrl: host +"/mapi/share/get/addreply",//添加分享的评论




        phonegapUpUrl :host+ "/mapi/share/get/phonegapUp",


        backingUrl: host + "/mapi/reply/get/backing",//顶评论 --已完成
        antiUrl: host + "/mapi/reply/get/anti",//踩评论

        sharelikenoUrl: host + "/mapi/share/get/sharelikeno",//取消支持
        sharestampnoUrl: host + "/mapi/share/get/sharestampno",//取消反对
        //踩作品
        stampUrl: host + "/mapi/post/dislike",
        //赞作品
        likeUrl: host + "/mapi/post/like",
        //获取评论列表(实现)
        replyListUrl: host + "/mapi/reply/get/replylist",
        replypublishUrl: host + "/mapi/reply/get/replypublish",
        hotReplyUrl:host + "/mapi/reply/get/hotReply",
        culturecontentUrl: host + "/mapi/home/get/culturecontent",

        //文化设施列表
        facilitylistUrl: host + "/mapi/facility/get/facilitylist",
        facilitycontentUrl: host +"/mapi/facility/get/facilitycontent",



        //获取我的分享列表
        MyShareUrl: host + "/mapi/share/get/myshare",
        //获取我的活动列表
        MyActivityUrl: host + "/mapi/mine/get/myactivity",
        //获取我的消息列表
        MyMessageUrl: host + "/mapi/mine/get/mymessage",
		MyMessageShareUrl: host + "/mapi/mine/get/mymessageShare",
        //获取我的消息详细列表
        MyMessageListUrl: host + "/mapi/mine/get/messagelist",
        //获取我的图片列表
        MyPictureUrl: host + "/mapi/mine/get/mypicture",
        //获取我的文档列表
        MyFileUrl: host + "/mapi/mine/get/myfile",
        //获取我的音频列表
        MyAudioUrl: host + "/mapi/mine/get/myaudio",
        //获取我的视频列表
        MyVideoUrl: host + "/mapi/mine/get/myvideo",
        //获取资源详细信息
        MyResourceDetailUrl: host + "/mapi/mine/get/myresourcedetail",
        //修改个人信息
        ModifyUserInfoUrl: host + "/mapi/mine/update/userinfo",
        //修改密码
        ModifyPasswordUrl: host + "/mapi/mine/update/password",
        //检查登录
        loginInUrl: host + "/mapi/mine/Inspection/login",

        //已实现：登陆
        loginUrl: host + "/mapi/user/get/login",
        //注册
        registerUrl: host + "/mapi/user/get/register",
        //邮箱验证存在
        accoutExtUrl: host + "/mapi/user/get/accoutExt",
        //昵称验证存在
        nicknameExtUrl: host + "/mapi/user/get/nicknameExt",
        //已实现：签到
        SignInUrl: host + "/mapi/user/get/signin",
        //已实现：获取个人信息(未用)
        MyInfoUrl: host + "/mapi/user/get/myInfo"
    };

});

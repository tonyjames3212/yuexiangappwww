/**
 * Created by hanzhendong on 2015/2/9.
 */
$F.regist("activity.getActivity", function () {
    var items = 10;
    var pageNum = parseInt($('#activity-list').find('li').length / 10);
    pageNum = pageNum == 0 ? 1 : pageNum + 1;
    $("#acreply-more").hide();
    console.log("活动列表");
    $.ajax({
        url: $f.get("SERVER_URL").activityUrl,
        type: 'post',
        data: {"limit": items, "page": pageNum},
        dataType: 'json',
        success: function (data) {
            var total = data.total;
            var rows = data.rows;
            var actHeadimg = "" ;
            var userHeadimg = "";

            for (var i = 0; i < data.rows.length; i++) {
                actHeadimg = (null == rows[i].headimg?"/images/noActivityHeadImg.jpg":rows[i].headimg);
                userHeadimg = (null == rows[i].uheadimg?"/images/head.jpg":rows[i].uheadimg);
                var list;
                list = "<li><div class='contentBox row'><div class='col-xs-12'><section class='row'><a href='#' onclick='activityDes(" + rows[i].id + ")'><div class='col-xs-3 activeImg'>" +
                    "<img src='" + "http://172.16.248.55:8080/" + ctpath + actHeadimg + "' class='img-responsive pull-left'></div><div class='col-xs-9'><h1>" + (rows[i].title.length>20?rows[i].title.substr(0,20) + '...' :rows[i].title) + "</h1>" +
                    "<p class='status'>最新活动</p><div class='content'><p><b>时间：</b> " + rows[i].begin_time + "~" + rows[i].end_time + "</p>" +
                    "<p><b>地点：</b>" + (rows[i].site.length>20?rows[i].site.substr(0,20) + '...' :rows[i].site) + "</p></div></div></a></section>" +
                    "<section class='row info'><div class='col-xs-12'><div class='pull-left'><div class='avatar'><img src='" + "http://172.16.248.55:8080/" + ctpath + userHeadimg + "' style='width:3em;height:3em;'><span>" + rows[i].author + "</span>发布</div>" +
                    "</div><div class='pull-right nums'><span class='broswer'><a href='#'><i class='icon icon-broswer'></i>" + rows[i].views + "</a></span><span class='message'><a href='#'><i class='icon icon-message'></i>" + rows[i].reply_count + "</a></span>" +
                    "</div></div></section></div></div></li>";
                $("#activity-list").append(list);
            }

          //  $('#activity-list').listview('refresh');
            if (total > $('#activity-list').find('li').length) {
                $("#activity-more").show();
            }else {
                $("#activity-more").hide();
            }
        }
    })
});

/*
* 活动标签Ajax获取
* */
function actMarkList (){
    $.ajax({
        url: $f.get("SERVER_URL").activityMarkListUrl,
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data) {
            var item;
            $.each(data, function (i, result) {
                item = "<li><input type='checkbox' name='typeMark' data-labelauty='" + result['markname'] + "' value='" + result['id'] + "' onclick='doCheck(this);'></li>";
                $('#actMarkListUL').append(item);
            });
        }
    });
}
/*
* 活动地点下拉框
* */
function actVenueList (){
    $.ajax({
        url: $f.get("SERVER_URL").activityVenueListUrl,
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data) {
            var item;
            $.each(data, function (i, result) {
                item = "<option value='" + result['id'] + "'>" + result['name'] + "</option>";
                $('#siteOptionFirst').after(item);
            });
        }
    });
}



$(function (){
    /*
     *活动保存
     * */
    $("#Publication").click(function (){
        var title = $("#title").val();  /*活动标题*/
        var begin_time = $("#form_datetime_b").val();  /*开始时间*/
        var end_time = $("#form_datetime_e").val();    /*结束时间*/
        var site=$("#suggestId").val();   /*活动地点*/
        var content=$("#desc").val();     /*活动详情*/

        var cost_des = $("#cost_des").val();  //费用说明
        var cost_free = $('input:radio[id="cost_free"]:checked').val();
        var cost_pay = $('input:radio[id="cost_pay"]:checked').val();

        var isPeopleNum =/^[0-9]*[1-9][0-9]*$/;    /*人数验证*/
        var people_limit = $("#people_limit").val();  //人数限制

        var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/; //手机号码验证规则
        var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;   //座机验证规则
        var contactNum = $("#contactNum").val();  //联系电话
        var marks=[];
        $('input[name="typeMark"]:checked').each(function(){
            marks.push($(this).val());
        });

        if (title == "") {
            $("#message").html("标题为必填！");
            $("#title").focus();
        }
        else if(begin_time==""){
            $("#message").html("开始时间未填！");
            $("#begin_time").focus();
        }
        else if(end_time==""){
            $("#message").html("结束时间未填！");
            $("#end_time").focus();
        }
        else if(site==""){
            $("#message").html("活动地点未填！");
            $("#site").focus();
        }
        else if(content==""){
            $("#message").html("活动详情未填！");
            $("#content").focus();
        }
        else if ( null != cost_pay && cost_des.toString() == ""){
            $("#message").html("费用说明未填！");
            $("#cost_des").focus();
        }
        else if (people_limit!= null && people_limit != "" && !isPeopleNum.test(people_limit)){
            $("#message").html("限制人数为数字！");  //错误提示信息
            $("#people_limit").focus();
        }
        else if (contactNum != null && contactNum!= "" && !isMobile.test(contactNum) && !isPhone.test(contactNum)){
            $("#message").html("请正确填写电话号码，例如:13415764179或0321-4816048");  //错误提示信息
            $("#contactNum").focus();       //输入框获得光标
        }
        else{
            if(begin_time!=""&&end_time!=""){
                if(begin_time>=end_time){
                    $("#message").html("结束时间必须大于开始时间");
                }else{
                    $.ajax({
                        url: $f.get("SERVER_URL").activityCreateUrl ,
                        type: 'post',
                        data: {title: title, begin_time: begin_time, end_time: end_time, site: site,
                            content: content, cost_des: cost_des, people_limit: people_limit,
                            contactNum: contactNum,'typeMark[]':marks, userid: localStorage.getItem("userid")},
                        dataType: 'json',
                        success: function (result) {
                            if ("noSave" == result){
                                alert("保存失败!");
                            }else {
                                actUploadUrl(result);
                            }
                        }
                    });
                }
            }
        }
    });
});

/*
* Html5 图片上传
* */
function onUploadImgChange(sender){
    if(""==$("#uploadImg").val()){
        return false;
    }else{
        if(!sender.value.match(/.jpg|.gif|.png|.bmp|.jpeg/i)){
            /*jAlert('图片格式无效.', '抱歉.');*/
            alert("图片格式无效");
            return false;
        }else{
            var oOutput = document.getElementById("output");
            var oData = new FormData(document.forms.namedItem("upload-poster"));
            oData.append("CustomField", "This is some extra data");
            var oReq = new XMLHttpRequest();
            oReq.open("POST", $f.get("SERVER_URL").activityUploadImgUrl, true);
            /*oReq.onload = function(oEvent) {
                if (oReq.status == 200) {
                    oOutput.innerHTML = "Uploaded!";
                } else {
                    oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
                }
            };*/
            oReq.send(oData);
        }
    }
}

function activityAdd (){
    window.location.href = "/activity_create.html";
}

function activityDes (id){
    window.location.href = "/activity_details.html?id=" + id;
}

function actUploadUrl (id){
    window.location.href = "activityUploadHeadimg.html?id=" + id;
}

$('#activity-more').click(function (){
    $f.call('activity.getActivity');
});



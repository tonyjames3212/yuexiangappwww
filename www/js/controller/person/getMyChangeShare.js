/**
 * Created by HuayiSeven on 2015/3/16.
 */
$F.regist('person.getMyChangeShare', function (id) {
    var userid = localStorage.getItem("userid");
    if(userid ==null){
        alert("对不起,请先登录!");
        window.location.href="my.html";
    }else {
        $.ajax({
            url: $f.get("SERVER_URL").editshareUrl,
            type: "get",
            dataType: 'json',
            data: {"id": id},
            success: function (data) {
                var ttl = data.nodes;
                var tl = data.share;
                var content = tl.content.replace(/<[^>]+>/g, "");
                $("#title").val(tl.title);
                $("#content").val(content);
                for (var i = 0; i < data.nodesize; i++) {
                    if (ttl[i].id == tl.nid) {
                        $("#options").text(ttl[i].title);
                        $("#options").val(ttl[i].id);
                    } else {
                        var option = document.createElement("option");
                        option.text = ttl[i].title;
                        option.value = ttl[i].id;
                        var sel = document.getElementById("selectNode");
                        sel.appendChild(option);
                    }
                }
            }
        })
    }

    $("#upd").click(function () {
        var title = $("#title").val();
        if (title.toString() == "") {
            alert("分享标题为必填项！");
            return;
        }
        var titleStr = title.toString().trim();
        var nid = $("#selectNode option:selected").val();
        if (nid.toString() == "op") {
            alert("请选择本分享归属的上级节点！");
            return;
        }
        var content = $("#content").val();
        if (content == "") {
            alert("请填写分享内容！");
            return;
        }
        $.ajax({
            url: $f.get("SERVER_URL").gaiShareUrl,
            type: "post",
            dataType: 'json',
            data: {
                "title": titleStr,
                "nid": nid,
                "content": content,
                "id":id
            },
            success: function (data) {
                if (data.success == true) {
                    alert("分享修改成功");
                    window.location.href="/person_myshare.html";
                } else {
                    alert("分享修改失败");
                }
            }
        })
    })


});



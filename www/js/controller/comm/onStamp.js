/**
 * Created by hanzhendong on 2015/2/12.
 */
$F.regist('comm.onStamp', function (tId) {
    $.ajax({
        url: $f.get("SERVER_URL").stampUrl,
        type: 'get',
        data: {"tid": tId},
        dataType: 'json',
        success: function (data, status) {
            var zanSrc = $("#"+tId+"zan").attr('src');
            var caiSrc = $("#"+tId+"cai").attr('src');
            if(zanSrc=='img/btn_dianzan.png'){
                var ho = hoTup-1;
                $("#"+tId+"zandiv").html("<img id='"+tId+"zan' src='img/btn_zan.png' onclick='onLike(" + tId +"," + hoTup +")'/>&nbsp;"+ho);
                $("#"+tId+"cai").attr('src',"img/btn_cai.png");
                /* $("#"+tId+"zan").attr('src',$("#"+tId+"zan").attr('src')=='img/btn_zan.png'?'img/btn_dianzan.png':'img/btn_zan.png');
                 $("#"+tId+"cai").attr('src',"img/btn_cai.png");*/
            }else if(zanSrc=='img/btn_zan.png'){
                var hop = hoTup+1;
                $("#"+tId+"zandiv").html("<img id='"+tId+"zan' src='img/btn_dianzan.png' onclick='onLike(" + tId +"," + hoTup +")'/>&nbsp;"+hop);
                $("#"+tId+"cai").attr('src',"img/btn_cai.png");
                /*$("#"+tId+"zandiv").html("<img id='"+tId+"zan' src='img/btn_zan.png' onclick='onLike(" + tId +"," + hoTup +")'/>&nbsp;"+hop);;*/

            }
            /*alert(data.Msg)*/
            /*$("#"+tId+"cai").attr('src',$("#"+tId+"cai").attr('src')=='img/btn_cai.png'?'img/btn_diancai.png':'img/btn_cai.png');
            $("#"+tId+"zan").attr('src',"img/btn_zan.png");*/
        }
    })
});
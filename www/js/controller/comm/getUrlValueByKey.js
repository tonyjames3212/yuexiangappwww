/**
 * Created by hanzhendong on 2015/2/12.
 */
$F.regist('comm.getUrlValueByKey', function (key) {
    var urlValue = "0";
    if (key) {
        if (document.location.search.substr(1)) {
            var aParams = document.location.search.substr(1).split('&');
            for (var i = 0; i < aParams.length; i++) {
                var aParam = aParams[i].split('=');
                if (aParam[0] == key) {
                    urlValue = aParam[1];
                    break;
                }
            }
        }
    }
    return urlValue;
});
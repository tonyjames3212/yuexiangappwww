/**
 * Created by zz on 2015/3/19.
 */
$F.regist("login.register", function () {
	var status1 = 1;
	var status2 = 1;
	var status3 = 1;
	var status4 = 1;
	
	/*邮箱*/
	$("#email").focus(function () {
		if (status1 == 0){
			$("#message").html("");	
		}
	});
	$('#email').blur(function (){
		var regcheck = /^\w{3,}@\w+(\.\w+)+$/;
		var bool = regcheck.test($("#email").val());
		var email = $("#email").val();
		if (bool.toString() == "false") {
			$("#message").html("邮箱格式不正确！");
			status1 = 1;
			return;
		}else {
			status1 = 0;
		}
		$.ajax({
			url: $f.get("SERVER_URL").accoutExtUrl,
			type: 'post',
			data: {"email": email},
			dataType: 'text',
			success: function (data) {
				if(data.toString() == "false"){
					$("#message").html("账号已经存在");
					status1 = 1;
					return;
				}else {
					$("#message").html("");
					status1 = 0;
				}
			}
		});
	});
	/*昵称*/
	$("#nickname").focus(function () {
		if (status2 == 0){
			$("#message").html("");	
		}
	});
	$("#nickname").blur(function () {
		var nickname = $("#nickname").val();
		if (nickname =="") {
			$("#message").html("用户昵称未填写！");
			status2 = 1;
			return;
		}
		else {
			status2 = 0;
		}
		$.ajax({
			url: $f.get("SERVER_URL").nicknameExtUrl,
			type: 'post',
			data: {"nickname": nickname},
			dataType: 'text',
			success: function (data) {
				if(data.toString() == "false"){
					$("#message").html("昵称已经存在");
					status2 = 1;
					return;
				}else {
					$("#message").html("");
					status2 = 0;
				}
			}
		});
	});
	/*密码*/
	$("#password").focus(function () {
		if (status3 == 0){
			$("#message").html("");	
		}
	});
	/*对密码是否为空的判断*/
	$("#password").blur(function () {
		var password = $("#password").val();
		if (password == "") {
			$("#message").html("用户密码未填写！");
			status3 = 1;
			return;
		}
		else if (password.length<6) {
			$("#message").html("用户密码至少为6位！");
			status3 = 1;
			return;
		}
		else {
			status3 = 0;
		}
	});
	$("#passwords").focus(function () {
		if (status4 == 0){
			$("#message").html("");
		}
	});
	/*对两次密码的判断*/
	$("#passwords").blur(function () {
		var password = $("#password").val();
		var passwords = $("#passwords")[0].value;
		if (passwords  == "" ){
			$("#message").html("重复密码未填写！");
			status4 = 1;
			return;
		}
		else if (password.toString() != passwords.toString()) {
			$("#message").html("两次输入密码不一致！");
			status4 = 1;
			return;
		}
		else if (passwords.length<6) {
			$("#message").html("用户密码至少为6位！");
			status4 = 1;
			return;
		}
		else {
			status4 = 0;
			$("#message").html("");
		}
	});
	$("#registerAct").click(function () {
		var email = $('#email').val();
		var nickname = $('#nickname').val();
		var password = $('#password').val();
		var passwords = $('#passwords')[0].value;
		if(0 == status1 && 0 == status2 && 0 == status3 && 0 == status4 && email.toString() != "" && nickname.toString() != "" && password.toString() != "" && passwords.toString() != ""){
			$.ajax({
				url: $f.get("SERVER_URL").registerUrl,
				type: 'post',
				data: {"email": email, "nickname": nickname, "password": password},
				dataType: 'text',
				success: function (data) {
					if (data.toString() == "true") {
						window.location.href = "login.html";
					}else {
						$("#message").html("注册失败！");
					}
				}
			});
		}
		else {
			var regcheck = /^\w{3,}@\w+(\.\w+)+$/;
			var bool = regcheck.test($("#email").val());
			if (bool.toString() == "false") {
				$("#message").html("邮箱格式不正确！");
			}
			$.ajax({
				url: $f.get("SERVER_URL").accoutExtUrl,
				type: 'post',
				data: {"email": email},
				dataType: 'text',
				success: function (data) {
					if(data.toString() == "false"){
						$("#message").html("账号已经存在");
					}
				}
			});
			if (nickname =="") {
				$("#message").html("用户昵称未填写！");
			}
			$.ajax({
				url: $f.get("SERVER_URL").nicknameExtUrl,
				type: 'post',
				data: {"nickname": nickname},
				dataType: 'text',
				success: function (data) {
					if(data.toString() == "false"){
						$("#message").html("昵称已经存在");
					}
				}
			});
			
			
			if (password == "") {
				$("#message").html("用户密码未填写！");
			}else if (passwords  =="" ){
				$("#message").html("重复密码未填写！");
			}else if (password.length<6) {
				$("#message").html("用户密码至少为6位！");
			}
			else if (passwords.length<6){
				$("#message").html("重复密码至少为6位！");
			}
			else if (password.toString() != passwords.toString()) {
				$("#message").html("两次输入密码不一致！");
			}
		}
	});
});

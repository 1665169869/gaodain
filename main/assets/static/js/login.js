$(document).ready(function () {
    $("#getSmsCode").click(() => {
        let mobile = $("#mobile").val()
        let closeMsg;
        $('#getSmsCode').text() == "获取验证码" && (
            closeMsg = Dreamer.loading("获取验证码中"),
            mobile.length == 0 ? (Dreamer.error("手机号码不能为空", 2000), closeMsg()) : sendNote(mobile, 1, (status, data) => {
                closeMsg();
                switch (status) {
                    case "success":
                        if (data.code == 200) {
                            Dreamer.success(data.msg, 2000, true)
                            let time = 60;
                            const s = setInterval(() => {
                                if (time == 1) {
                                    $("#getSmsCode").text("获取验证码")
                                    $('#getSmsCode').css('color', '#fff');
                                    clearInterval(s);
                                    return;
                                };
                                time--;
                                $("#getSmsCode").text(`剩余${time}秒`);
                                $("#getSmsCode").css("color", "#5b5b5b");
                            }, 1000)

                        } else { Dreamer.error(data.msg, 2000, true); }
                        break;
                    case "timeout":
                        Dreamer.error("请求超时了。" + status, 2000, true);
                        break;
                    default:
                        Dreamer.error("获取验证码失败", 2000, true);
                        break;
                };
            })
        )
    });
    $("#if_smsLogin").click(() => {
        let if_smslogin = $('#if_smsLogin').is(":checked");
        let input_pwd = $('#password');
        let getSmsCode = $('#getSmsCode');
        if (if_smslogin) {
            input_pwd.attr("type", "text");
            input_pwd.val("");
            input_pwd.attr("placeholder", "验证码");
            getSmsCode.attr("style", "display: flex;")

        } else {
            input_pwd.attr("type", "password");
            input_pwd.val($("#password").val(password));
            getSmsCode.attr("style", "display: none;")
            input_pwd.attr("placeholder", "密码");
        }
    });
    $('#btn_reset').click(function () {
        let password = $('#reset_passwd').val();
        let psswd = $("#reset_pwd").val();
        let verifyCode = $('#re_code').val();
        let mobile = $('#re_mobile').val();
        if (mobile.length == 0) {
            Dreamer.warning("手机号不能为空哦！");
        } else if (password.length == 0) {
            Dreamer.warning("密码不能为空哦！");
        } else if (verifyCode.length == 0) {
            Dreamer.warning("验证码不能为空哦！");
        } else if (psswd != password) {
            Dreamer.warning("两次密码不一致！");
        } else {
            cloneMsg = Dreamer.loading("重置密码中……");
            retrieve(
                mobile = mobile,
                password = password,
                pass = psswd,
                code = verifyCode,
                _type = 2,
                success = function (code, msg, result) {
                    if (code == 200) {
                        Dreamer.success(msg);
                    } else {
                        Dreamer.error(msg);
                    }
                    cloneMsg();
                }
            );
        }
    });
    $('#sendCode').click(function () {
        let mobile = $("#re_mobile").val()
        let closeMsg;
        $('#sendCode').text() == "获取验证码" && (
            closeMsg = Dreamer.loading("获取验证码中"),
            mobile.length == 0 ? (Dreamer.error("手机号码不能为空", 2000), closeMsg()) : sendNote(mobile, 2, (status, data) => {
                closeMsg();
                switch (status) {
                    case "success":
                        if (data.code == 200) {
                            Dreamer.success(data.msg, 2000, true)
                            let time = 60;
                            const s = setInterval(() => {
                                if (time == 1) {
                                    $("#sendCode").text("获取验证码")
                                    $('#sendCode').css('color', '#5892d4');
                                    clearInterval(s);
                                    return;
                                };
                                time--;
                                $("#sendCode").text(`剩余${time}秒`);
                                $("#sendCode").css("color", "#5b5b5b");
                            }, 1000)

                        } else { Dreamer.error(data.msg, 2000, true); }
                        break;
                    case "timeout":
                        Dreamer.error("请求超时了。" + status, 2000, true);
                        break;
                    default:
                        Dreamer.error("获取验证码失败", 2000, true);
                        break;
                };
            })
        )
    });

    $('#btnLogin').click(function () {
        cloneMsg = Dreamer.loading("登录中.....");
        let if_smslogin = $('#if_smsLogin').is(":checked");
        if_smslogin == true ? smsLogin(mobile = $("#mobile").val(), code = $("#password").val(), success = (status, data) => { cloneMsg(); status == "success" && data.code == 200 ? Dreamer.success("登录成功", true, 2000, function () { window.location.href = "./index.html"; }) : Dreamer.error("登录失败 " + data.msg, true, 2000) }) : login(mobile = $("#mobile").val(), password = $("#password").val(), success = (status, data) => { cloneMsg(); status == "success" && data.code == 200 ? Dreamer.success("登录成功", true, 2000, function () { window.location.href = "./index.html"; }) : Dreamer.error("登录失败 " + data.msg, true, 2000) })
    });
});
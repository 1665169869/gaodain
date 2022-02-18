$(document).ready(function() {
    $("#send").click(function() {
        $.post(`http://127.0.0.1:${post}/api/send`, {
            mobile: $("#mobile").val(),
            type: 2,
            contentType: "application/json",
        })
    })
    $(".btn").click(function() {
            $.post(`https://v3yungao-tech.com/api/retrieve`, {
                type: 2,
                mobile: $("#mobile").val(),
                password: $("#pass").val(),
                pass: $("#pass").val(),
                code: $("#code").val()
            }, function(data) {
                if (data.code == 200) {
                    var tokens = (data.result.token);
                    localStorage.setItem('token', tokens, { expires: 100000 * 10000 });
                    localStorage.setItem('avatar', data.result.info.avatar, { expires: 100000 * 10000 });
                    localStorage.setItem('nickname', data.result.info.nickname, { expires: 100000 * 10000 });
                    localStorage.setItem('school_name', data.result.info.school_name, { expires: 100000 * 10000 });
                    localStorage.setItem('unique_number', data.result.info.unique_number, { expires: 100000 * 10000 });
                    location.href = `http://127.0.0.1:${post}/login`
                } else {
                    alert(data.msg);
                }
            })
        })
        // 验证码定时器
    function tt() {
        $("#send").unbind("click");
        console.log(123);
        let time = 60;
        let s = setInterval(function() {
            if (time == 1) {
                $("#send").html(`获取验证码`)
                $("#send").css("color", "cornflowerblue")
                clearInterval(s)
                $("#send").click(tt)
                return
            }
            time--
            $("#send").html(`${time}秒`)
            $("#send").css("color", "#5b5b5b")
        }, 1000)
    }
    $("#send").click(tt)
})
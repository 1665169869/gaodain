$(document).ready(function() {
    $("#send").click(function() {
        $.post(`http://127.0.0.1:${post}/api/send`, {
            mobile: $("#mobile").val(),
            type: 1,
            contentType: "application/json",
        })
    })
    $(".btn").click(function() {
            $.post(`https://v3.yungao-tech.com/api/smsLogin`, {
                mobile: $("#mobile").val(),
                code: $("#pass").val()
            }, function(data) {
                console.log(data);
                var tokens = (data.result.token);
                localStorage.setItem('token', tokens, { expires: 100000 * 10000 });
                if (data.code == 200) {
                    location.href = `http://127.0.0.1:${post}/`
                } else {
                    alert(data.msg);
                }
            })
        })
        // 60秒倒计时（一定要放到最后）
    function tt() {
        $("#send").unbind("click");
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
            $("#send").html(`剩余${time}秒`)
            $("#send").css("color", "#5b5b5b")
        }, 1000)
    }
    $("#send").click(tt)
})
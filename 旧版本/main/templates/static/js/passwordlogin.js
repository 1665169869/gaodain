$(document).ready(function() {
    $('#login').click(function() {
        // https://v3.yungao-tech.com/api/login 官方接口
        $.post(`http://127.0.0.1:${post}/api/login`, {
            mobile: $("#mobile").val(),
            password: $("#pass").val(),
            contentType: "application/json"
        }, function(data, status) {
            console.log(data);
            console.log(data.result.info.avatar);
            var tokens = (data.result.token);
            localStorage.setItem('token', tokens, { expires: 100000 * 10000 });
            localStorage.setItem('avatar', data.result.info.avatar, { expires: 100000 * 10000 });
            localStorage.setItem('nickname', data.result.info.nickname, { expires: 100000 * 10000 });
            localStorage.setItem('school_name', data.result.info.school_name, { expires: 100000 * 10000 });
            localStorage.setItem('unique_number', data.result.info.unique_number, { expires: 100000 * 10000 });
            if (data.code == 200) {
                location.href = `http://127.0.0.1:${post}/`
            } else {
                alert(data.msg);
            }
        })
    })
})
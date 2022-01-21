$(document).ready(function() {
    // 用户token
    var token = window.localStorage.getItem("token");
    // 用户头像
    var avatar = window.localStorage.getItem("avatar");
    // 用户uid
    var unique_number = window.localStorage.getItem("unique_number");
    // 用户学校
    var school_name = window.localStorage.getItem("school_name");
    // 用户名称
    var nickname = window.localStorage.getItem("nickname");
    // 动态用户资料
    // 动态头像
    $("#imgtop").attr('src', avatar);
    $("#imgtop").css({ 'width': '128px', 'border-radius': '50%' });
    $("#btn1").click(function() {
        location.href = `http://${HOST}:${PORT}/passwd`
    })
    $("#name").html(nickname);
    $("#school").html(school_name);
    $("#uid").html(unique_number);
    $("#btn2").click(function() {
        alert("尚未开放")
    })
    $("#btn3").click(function() {
        $.post(`http://${HOST}:${PORT}/api/logout`, {
            token: token,
        }, function(data) {
            alert(data.msg);
            localStorage.setItem('token', "未获取token", { expires: 100000 * 10000 });
            localStorage.setItem('avatar', "data:image/svg+xml;base64,PHN2ZyB0PSIxNjQxMTM3OTIxNDk4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI2MTgiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNNTEyIDY0QzI2NC44IDY0IDY0IDI2NC44IDY0IDUxMnMyMDAuOCA0NDggNDQ4IDQ0OCA0NDgtMjAwLjggNDQ4LTQ0OFM3NTkuMiA2NCA1MTIgNjR6TTM4NC44IDM3NmM0LTY0IDU2LTExNS4yIDEyMC0xMTkuMiA3NC40LTQgMTM1LjIgNTUuMiAxMzUuMiAxMjggMCA3MC40LTU3LjYgMTI4LTEyOCAxMjgtNzMuNiAwLTEzMi02Mi40LTEyNy4yLTEzNi44ek03NjggNzQ2LjRjMCAxMi05LjYgMjEuNi0yMS42IDIxLjZIMjc4LjRjLTEyIDAtMjEuNi05LjYtMjEuNi0yMS42di02NGMwLTg0LjggMTcwLjQtMTI4IDI1NS4yLTEyOCA4NC44IDAgMjU1LjIgNDIuNCAyNTUuMiAxMjhsMC44IDY0eiIgcC1pZD0iMjYxOSIgZmlsbD0iIzUxNTE1MSI+PC9wYXRoPjwvc3ZnPg==", { expires: 100000 * 10000 });
            localStorage.setItem('nickname', "未获取用户名称", { expires: 100000 * 10000 });
            localStorage.setItem('school_name', "未获取学校名", { expires: 100000 * 10000 });
            localStorage.setItem('unique_number', "未获取用户uid", { expires: 100000 * 10000 });
            location.href = `http://127.0.0.1:${post}/login/password`
        })
    })
})
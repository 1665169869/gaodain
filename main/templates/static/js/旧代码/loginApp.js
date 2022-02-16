$(document).ready(function() {
    var token = window.localStorage.getItem("token");
    var ip = window.localStorage.getItem("ip");
    // 查询当前局域网ip
    $.post(`http://127.0.0.1:${post}/api/getIp`,
            function(data, state) {
                localStorage.setItem('ip', data.ip, {
                    expires: 1
                });
            })
        // 加载页面查询当前ip是否已认证
    $.post(`http://127.0.0.1:${post}/api/Internet/is_login`, {
        token: token,
        ip: ip,
        contentType: "application/json"
    }, function(data, status) {
        if (data.msg == 200) {
            loginApp.innerHTML = "断开连接";
        } else {
            loginApp.innerHTML = "连接网络";
        }
        // 添加点击事件点击按钮时查询当前ip是否已认证没有则直接认证错误返回弹窗
        $('.btn').click(function() {
            $.post(`http://127.0.0.1:${post}/api/Internet/is_login`, {
                token: token,
                ip: ip,
                contentType: "application/json",
                function(data) {
                    if (data.msg == 200) {
                        $('.btn').click(function() {
                            $.post(`http://127.0.0.1:${post}/api/Internet/is_login`, {
                                token: token,
                                ip: ip,
                                contentType: "application/json",
                            }, function(data) {
                                if (data.msg == 200) {
                                    $('.btn').click(function() {
                                        $.post("https://v3.yungao-tech.com/api/Internet/loginApp", {
                                            token: token,
                                            ip: ip,
                                            contentType: "application/json",
                                            function(data) {
                                                alert(data)
                                            }
                                        })
                                    })
                                } else {
                                    $('.btn').click(function() {
                                        $.post("https://v3.yungao-tech.com/api/Internet/kick", {
                                            token: token,
                                            ip: ip,
                                            contentType: "application/json",
                                        }, function(data) {
                                            alert(data)
                                        })
                                    })
                                }

                            })
                        })
                    } else {
                        loginApp.innerHTML = "连接网络";
                    }
                }
            })
        })
    })
})
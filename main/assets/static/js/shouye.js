$(document).ready(function () {
    // _ip = myip();
    _ip = $.cookie("myip");
    closeMsg = Dreamer.loading("载入中……");
    networkQuery(
        str = _ip,
        success = function (status, data) {
            closeMsg();
            switch (status) {
                case "success":
                    data.msg == 400 ? ($('#loginApp').text("连接网络")) : $('#loginApp').text("断开网络");
                    break;
                case "timeout":
                    Dreamer.error("请求超时了。" + status, 2000, true);
                    break;
                default:
                    Dreamer.error("未知错误 可能是糕糕又炸了.状态码：" + status, 2000, true);
                    break;
            };
        }
    );
    user(
        unique_number = $.cookie('userid'),
        success = (status, data) => {
            // let avatar = "./static/svg/logo.svg";
            switch (status) {
                case "success":
                    if (data.code == 200) {
                        let avatar = data.result.avatar;
                        document.getElementById("avatar").setAttribute("src", avatar);
                        Dreamer.info("欢迎回来，" + data.result.nickname);
                    };
                    break;
                case "timeout":
                    Dreamer.error("请求超时了。" + status, 2000, true);
                    break;
                default:
                    Dreamer.error("未知错误 可能是糕糕又炸了.状态码：" + status, 2000, true);
                    break;
            };
        }
    );
    $("#networkQuitAll").click(() => {
        closeMsg = Dreamer.loading("获取在线设备中 请稍后。")
        network((status, data) => {
            switch (status) {
                case "success":
                    if (data.code == 200 && data.result.length > 0) {
                        for (let i = 0; i < data.result.length; i++) {
                            networkBreak(data.result[i].str, function (s, d) { }, false);
                        };
                        Dreamer.success("已经踢出全部设备啦！", 2000)
                    } else {
                        Dreamer.error(data.msg, 2000, true);
                    }
                    closeMsg();
                    break;
                case "timeout":
                    Dreamer.error("请求超时了。" + status, 2000, true);
                    break;
                default:
                    Dreamer.error("未知错误 可能是糕糕又炸了.状态码：" + status, 2000, true);
                    break;
            }
        })
    });
    $('#logout').click(function () {
        let closeMsg = Dreamer.loading("退出登录中，请稍后。");
        logout(function (code, msg) {
            closeMsg();
            if (code == 200) {
                let result = $.removeCookie("token", { path: '/' });
                console.log(result);
                Dreamer.success(msg, 2000, true, function () {
                    window.location.href = "./login.html";
                });
            } else {
                Dreamer.error(msg, 2000, true);
            };
        });
    });
    $('#loginApp').click(function () {
        let closeMsg;
        const btn_title = $("#loginApp").text()
        btn_title == "连接网络" ? (
            closeMsg = Dreamer.loading("连接网络中，请稍后"),
            loginApp(
                ip = _ip,
                success = (status, data) => {
                    closeMsg();
                    switch (status) {
                        case "success":
                            data.code == 200 ? (Dreamer.success(data.msg, 2000, true) && $('#loginApp').text("断开网络")) : Dreamer.error(data.msg, 2000, true)
                            break;
                        case "timeout":
                            Dreamer.error("请求超时了。" + status, 2000, true);
                            break;
                        default:
                            Dreamer.error("未知错误 可能是糕糕又炸了.状态码：" + status, 2000, true);
                            break;
                    };
                })
        ) : (
            closeMsg = Dreamer.loading("断开网络中，请稍后。"),
            networkBreak(
                ip = _ip,
                success = function (status, data) {
                    closeMsg();
                    switch (status) {
                        case "success":
                            data.code == 200 ? ($('#loginApp').text("连接网络") && Dreamer.success(data.msg, 2000, true)) : Dreamer.error(data.msg, 2000, true);
                            break;
                        case "timeout":
                            Dreamer.error("请求超时了。" + status, 2000, true);
                            break;
                        default:
                            Dreamer.error("未知错误 可能是糕糕又炸了.状态码：" + status, 2000, true);
                            break;
                    };
                }
            )
        );
    })
});


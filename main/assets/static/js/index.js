document.write('<script language=javascript src="./static/js/md5.min.js"></script>'); // 载入md5.js
document.write('<script src="./static/js/dream-msg.min.js"></script>');
// document.write('<link rel="stylesheet" href="./static/css/reset.css"><link rel="stylesheet" href="./static/css/style.css"> ')
// document.write('<script language=javascript src="./static/js/config.min.js"></script>'); // 载入config-min.js

// ------------------------------------------------------------------------------------------------------------
if_login();
function if_login() { //判断是否已登录
    let ip = getIp();
    if (ip != null) {
        $.cookie("myip", ip, { path: "/" });
    }
    loginTrigger(false, function (code, msg) {
        let url = window.location.href;
        let length = url.search(/login/i);
        if (url.search(/passwd/i) != -1) {
            return;
        }
        switch (length) {
            case -1:
                if (code == 3) { window.location.href = "./login.html" };
                break;
            default:
                if (code == 200) { window.location.href = "./index.html" };
                break;
        }
    });
}


function getIp() {
    let url = window.location.href;
    let result = url.match(/[^/|myip=]((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g);
    if (result != null) {
        let ip = null;
        for (let index = 0; index < result.length; index++) {
            ip = result[index];
            if (ip != "127.0.0.1") { break }
        }
        console.log(ip);
        return ip;
    } else {
        return null;
    }
}

// request是调用了jq的ajax,非必要不要改这个函数

function request(settings) {
    // name, data, Authorization = null, async = true, success
    let defaultSettings = {
        name: null,
        data: {},
        Authorization: $.cookie("token"),
        async: true,
        time: 8000,
        success: function (data, status, xhr) { },
        notmodified: function (data, status, xhr) { },
        error: function (data, status, xhr) { },
        timeout: function (data, status, xhr) { },
        parsererror: function (data, status, xhr) { }
    }
    $.extend(defaultSettings, settings)

    let res;
    let url = API.service + API[defaultSettings.name].url;
    let method = API[defaultSettings.name].method;
    let headers = {
        // "content-type": "application/json",
        "Authorization": defaultSettings.Authorization,
    }

    // res = $.ajax({
    //     url: url,
    //     data: defaultSettings.data,
    //     type: method,
    //     headers: headers,
    //     async: defaultSettings.async
    // }, function (data, status, xhr) {
    //     switch (status) {
    //         case "success":
    //             defaultSettings.success(data, status, xhr);
    //             break;
    //         case "notmodified":
    //             defaultSettings.notmodified(data, status, xhr);
    //             break;
    //         case "error":
    //             defaultSettings.error(data, status, xhr);
    //             break;
    //         case "timeout":
    //             defaultSettings.timeout(data, status, xhr);
    //             break;
    //         case "parsererror":
    //             defaultSettings.parsererror(data, status, xhr);
    //             break;
    //     };
    // });
    res = $.ajax({
        url: url,
        data: defaultSettings.data,
        type: method,
        headers: headers,
        timeout: defaultSettings.time,
        async: defaultSettings.async,
        success: function (data, status, xhr) {
            if (data.code == 600) { // 账号被下线
                console.log(data.code + data.msg);
                $.removeCookie("token", { path: '/' });
                window.location.href = "./login.html";
                alert(data.msg);
            };
            defaultSettings.success(data, status, xhr)
            // switch (status) {
            //     case "success":
            //         defaultSettings.success(data, status, xhr);
            //         break;
            //     case "notmodified":
            //         defaultSettings.notmodified(data, status, xhr);
            //         break;
            //     case "error":
            //         defaultSettings.error(data, status, xhr);
            //         break;
            //     case "timeout":
            //         defaultSettings.timeout(data, status, xhr);
            //         break;
            //     case "parsererror":
            //         defaultSettings.parsererror(data, status, xhr);
            //         break;
            // }
        },
        error: function (data, status, xhr) {
            if (data.code == 600) { // 账号被下线
                console.log(data.code + data.msg);
                $.removeCookie("token", { path: '/' });
                window.location.href = "./login.html";
                alert(data.msg);
            };
            defaultSettings.success(data, status, xhr);
            // switch (status) {
            //     case "success":
            //         defaultSettings.success(data, status, xhr);
            //         break;
            //     case "notmodified":
            //         defaultSettings.notmodified(data, status, xhr);
            //         break;
            //     case "error":
            //         defaultSettings.error(data, status, xhr);
            //         break;
            //     case "timeout":
            //         defaultSettings.timeout(data, status, xhr);
            //         break;
            //     case "parsererror":
            //         defaultSettings.parsererror(data, status, xhr);
            //         break;
            // }
        }
    
    });
    return res;
};

function login(mobile, password, success = function (status, data) { }) { // 密码登录
    let res = request({
        name: "login",
        data: {
            mobile: mobile,
            password: password
        },
        success: function (data, status, xhr) {
            // 这里写回调函数
            // console.log(data, status, xhr);
            /* let info        = {  为了更加直观的知道info里有什么，则直接这样写(不要取消这些注释，只是为了更直观的明白)：
                sex: data.result.info.sex,                           // 性别 number型, 0无性别|1:男|2:女 
                name: data.result.info.name,                         // 真实姓名
                card: data.result.info.card,                         // 身份证号码
                desc: data.result.info.desc,                         // 简介
                avatar: data.result.info.avatar,                     // 头像地址
                mobile: data.result.info.mobile,                     // 手机号
                nickname: data.result.info.nickname,                 // 昵称
                school_name: data.result.info.school_name,           // 学校
                unique_number: data.result.info.unique_number,       // 糕糕用户ID
                is_certification: data.result.info.is_certification, // 是否实名 bool型
                };
            */
            let status_code = data.code; // 登录接口被请求后的json.code响应码,不是ajax请求的status
            let msg = data.msg; // 提示信息
            if (status_code == 200) {
                let token = "Bearer " + data.result.token; // Token
                let info = data.result.info; // 参考上面的多行注释 
                let userid = data.result.info.unique_number;
                $.cookie('token', token, { expires: 365, path: '/' }); // 把token设置到cookie，并且存放365天
                $.cookie('userid', userid, { expires: 365, path: '/' });
                $.cookie('username', mobile, { expires: 365, path: '/' });
                $.cookie('password', password, { expires: 365, path: '/' });
            };
            success(status, data);
        }
    });
    return res;
};

function smsLogin(mobile, code, success = function (status, data) { }) { // 验证码登录
    let res = request({
        name: "smsLogin",
        data: {
            mobile: mobile,
            code: code
        },
        success: function (data, status, xhr) {
            // 这里写回调函数
            // console.log(data, status, xhr);
            /* let info        = {  为了更加直观的知道info里有什么，则直接这样写(不要取消这些注释，只是为了更直观的明白)：
                sex: data.result.info.sex,                           // 性别 number型, 0无性别|1:男|2:女 
                name: data.result.info.name,                         // 真实姓名
                card: data.result.info.card,                         // 身份证号码
                desc: data.result.info.desc,                         // 简介
                avatar: data.result.info.avatar,                     // 头像地址
                mobile: data.result.info.mobile,                     // 手机号
                nickname: data.result.info.nickname,                 // 昵称
                school_name: data.result.info.school_name,           // 学校
                unique_number: data.result.info.unique_number,       // 糕糕用户ID
                is_certification: data.result.info.is_certification, // 是否实名 bool型
                };
            */
            let status_code = data.code; // 登录接口被请求后的json.code响应码,不是ajax请求的status
            let msg = data.msg; // 提示信息
            if (status == "success" && status_code == 200) {
                let token = "Bearer " + data.result.token; // Token
                let info = data.result.info; // 参考上面的多行注释 
                let userid = data.result.info.unique_number;
                $.cookie('token', token, { expires: 365, path: '/' }); // 把token设置到cookie，并且存放365天
                $.cookie('userid', userid, { expires: 365, path: '/' });
            };
            success(status, data);
        }
    });
    return res;
};

function sendNote(mobile, _type, success = function (status, data) { }) { // 获取验证码
    let res = request({
        name: "sendNote",
        data: {
            mobile: mobile,
            type: _type
        },
        success: function (data, status, xhr) {
            // 这里写回调函数
            // console.log(data, status, xhr);
            /*
            data: { 
                    "code": 200,
                    "msg": "短信发送成功",
                    "result": {
                        "limit": 1
                    }
                } 
            */
            let status_code = data.code; // 状态码
            let msg = data.msg; // 提示信息
            if (status_code == 200) {
                let limit = data.result.limit // 该号码请求次数
            };
            success(status, data);
        }
    });
    return res;
};

function user(unique_number, success = function (status, data) { }) { // 用户信息
    let res = request({
        name: "user",
        data: {
            unique_number: unique_number
        },
        success: function (data, status, xhr) {
            success(status, data);
        }
    });
    return res;
};

function loginQrCode(str, success = function (code, msg) { }) { // 电脑网络认证
    let res = request({
        name: "loginQrCode",
        data: {
            str: str
        },
        success: function (data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            if (status_code == 200) {
                // 认证成功
            } else {
                // 认证失败
            };
            success(status_code, msg);
        }
    });
    return res;
};

function loginApp(ip, success = function (status, data) { }) { // 手机网络认证
    let res = request({
        name: "loginApp",
        data: {
            ip: ip
        },
        success: function (data, status, xhr) {
            success(status, data);
        }
    });
    return res
}

function networkBreak(ip, success = function (status, data) { }, if_hexmd5 = true) { // 踢出设备
    if (if_hexmd5) {
        ip = hex_md5(ip);
    }
    let res = request({
        name: "networkBreak",
        data: {
            str: ip
        },
        success: function (data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            success(status, data);
        }
    });
    return res;
}

function networkQuery(str, success = function (status, data) { }) { // 设备是否在线
    if (typeof str != "string") { str = $.cookie("myip") };
    let res = request({
        name: "networkQuery",
        data: {
            str: hex_md5(str)
        },
        success: function (data, status, xhr) {
            success(status, data);
        }
    });
    return res;
}

function myip() { // 获取自身ip
    let res = $.get({ url: `http://${HOST}:${PORT}/api/getIp`, async: false })
    console.log(res.responseJSON.ip);
    return res.responseJSON.ip;
};

function loginTrigger(async = true, success = function (code, msg) { }) { // 查询账号状态
    let res = request({
        name: "loginTrigger",
        async: async,
        success: function (data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            success(status_code, msg);
        }
    });
    return res;
}

function logout(success = function (code, msg, result) { }) { // 退出登录
    let res = request({
        name: "logout",
        success: function (data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            let result = data.result;
            success(status_code, msg, result);
        }
    });
    return res;
}

function retrieve(mobile = "", password = "", pass = "", code = "", _type = 2, success = function (code, msg, result) {}){ // 重置密码
    let res = request({
        name: "retrieve",
        data: {
            mobile: mobile,
            password: password,
            pass: pass,
            code: code,
            type: _type
        },
        success: function(data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            let result = data.result;
            success(status_code, msg, result);
        }
    });
}

function network(success = function(status, data) {}) {
    let res = request({
        name: "network",
        data: {},
        success: function(data, status, xhr) {
            success(status, data);
        }
    });
}

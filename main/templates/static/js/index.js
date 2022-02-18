// request是调用了jq的ajax,非必要不要改这个函数

function request(settings) {
    // name, data, Authorization = null, async = true, success
    let defaultSettings = {
        name: null,
        data: {},
        Authorization: $.cookie("token"),
        async: true,
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
        async: defaultSettings.async,
        success: function (data, status, xhr) {
            switch (status) {
                case "success":
                    defaultSettings.success(data, status, xhr);
                    break;
                case "notmodified":
                    defaultSettings.notmodified(data, status, xhr);
                    break;
                case "error":
                    defaultSettings.error(data, status, xhr);
                    break;
                case "timeout":
                    defaultSettings.timeout(data, status, xhr);
                    break;
                case "parsererror":
                    defaultSettings.parsererror(data, status, xhr);
                    break;
            }
        },
        error: function (data, status, xhr) {
            switch (status) {
                case "success":
                    defaultSettings.success(data, status, xhr);
                    break;
                case "notmodified":
                    defaultSettings.notmodified(data, status, xhr);
                    break;
                case "error":
                    defaultSettings.error(data, status, xhr);
                    break;
                case "timeout":
                    defaultSettings.timeout(data, status, xhr);
                    break;
                case "parsererror":
                    defaultSettings.parsererror(data, status, xhr);
                    break;
            }
        }
    });
    return res;
};

function login(mobile, password, success = function (code, msg) { }) { // 密码登录
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
                $.cookie('token', token, { expires: 365, path: '/' }); // 把token设置到cookie，并且存放365天
            };
            success(status_code, msg);
        }
    });
    return res;
};

function smsLogin(mobile, code, success = function (code, msg) { }) { // 验证码登录
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
            if (status_code == 200) {
                let token = "Bearer " + data.result.token; // Token
                let info = data.result.info; // 参考上面的多行注释 
                $.cookie('token', token, { expires: 365, path: '/' }); // 把token设置到cookie，并且存放365天
            };
            success(status_code, msg);
        }
    });
    return res;
};

function sendNote(mobile, _type, success = function (code, msg) { }) { // 获取验证码
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
            success(status_code, msg);
        }
    });
    return res;
};

function user(unique_number, success = function (code, msg) { }) { // 用户信息
    let res = request({
        name: "user",
        data: {
            unique_number: unique_number
        },
        success: function (data, status, xhr) {
            let status_code = data.code;
            let msg = data.msg;
            if (status_code == 200) {
                let info = data.result // 具体请看接口文档
            };
            success(status_code, msg);
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

function loginApp(ip, success = function (code, msg) { }) { // 手机网络认证
    let res = request({
        name: "loginApp",
        data: {
            ip: ip
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
    return res
}
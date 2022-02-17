
function request(settings) {
    // name, data, Authorization = null, async = true, success
    let defaultSettings = {
        name: null,
        data: {},
        Authorization: null,
        async: true,
        success: function (data, status, xhr) { },
        notmodified: function (data, status, xhr) { },
        error: function (data, status, xhr) { },
        timeout: function (data, status, xhr) { },
        parsererror: function (data, status, xhr) { }
    }

    $.extend(defaultSettings, settings)

    // let url = config.API.service + config.API[name].url;
    let url = API.service + API[defaultSettings.name].url;
    let headers = {
        "content-type": "application/json",
        "Authorization": defaultSettings.Authorization,
    }
    // let method = config.API[name].method;
    let method = API[defaultSettings.name].method;
    let res;

    // status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
    if (method == "GET" || method == "get") {
        res = $.get({
            url: url,
            data: defaultSettings.data,
            async: defaultSettings.async
        }, function (data, status, xhr) {
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
            };

        });
    } else if (method == "POST" || method == "post") {
        res = $.post({
            url: url,
            data: defaultSettings.data,
            async: defaultSettings.async
        }, function (data, status, xhr) {
            defaultSettings.success(data, status, xhr);
        });
    }
    return res;
};

function login(data) { // 密码登录
    let res = request({
        name: "login",
        data: data,
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
            if (status_code == 200) {
                let msg = data.msg; // 提示信息
                let token = "Bearer " + data.result.token; // Token
                let info = data.result.info; // 参考上面的多行注释 
                $.cookie('token', token, { expires: 365, path: '/' }); // 把token设置到cookie，并且存放365天
            };
        }
    });
    return res;
    // console.log(res.status, res.responseJSON, res);
};

function smsLogin(data) { // 验证码登录
    let res = request({
        name: "smsLogin",
        data: data,
        success: function (data, status, xhr) {
            // 这里写回调函数
            // console.log(data, status, xhr);
        }
    });
    return res;
};

function sendNote(data) { // 获取验证码
    let res = request({
        name: "sendNote",
        data: data,
        success: function (data, status, xhr) {
            // 这里写回调函数
            // console.log(data, status, xhr);

        }
    });
    return res;
};
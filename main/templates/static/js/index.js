
function request(settings) {
    // name, data, Authorization = null, async = true, success
    let defaultSettings = {
        name: null,
        data: {},
        Authorization: null,
        async: true,
        success: function (data, status, xhr) {
            console.log(data, status, xhr);
        }
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

    if (method == "GET" || method == "get") {
        res = $.get({
            url: url,
            data: defaultSettings.data,
            async: defaultSettings.async
        }, function (data, status, xhr) {
            defaultSettings.success(data, status, xhr);
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
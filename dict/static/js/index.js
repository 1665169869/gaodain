import config from './config.js';
// import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
import axios from 'axios';
// import axios from '../../node_modules/axios/dist/axios';


async function request(name, data, Authorization){
    let url = config.API.service + config.API[name].url;
    let headers = {
        "content-type": "application/json",
        "Authorization": Authorization,
    }
    let method = config.API[name].method;
    let res;

    try {
        res = await axios.request({
            url: url,
            data: data,
            headers: headers,
            method: method,
        })
    } catch(err){
        console.log(err);
    };
    return res; 
};

function login(mobile, password){
    data = {
        "mobile": mobile,
        "password": password
    };
    let response = request("login", data);
    console(response);
}

login("13232469869", "xiaoshuai666")
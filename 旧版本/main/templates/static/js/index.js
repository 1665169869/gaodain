import './config.js';

function request(name, data, Authorization){
    let url = API.service + API[name].url;
    let headers = {
        "content-type": "application/json",
        "Authorization": Authorization,
    }
    let method = API[name].method;

};
const request = require('request');
const base = "http://bybussen.api.tmn.io";

function req(url) {
    return {
        url: url,
        json: true
    };
}

function containsName(name) {
    return stop => {
        return stop.name.toLowerCase().includes(name);
    };
}

function get(url, transform) {
    return new Promise((resolve, reject) => {
        request(req(url), (error, response, body) => {
            if (error)
                return reject(error);

            resolve(transform(body));
        });
    });
}

function byStopId(id) {
    return get(`${base}/rt/${id}`, (response) => {
        return response;
    });
}

function byStopName(name) {
    return get(`${base}/stops`, (response) => {
        return response.filter(containsName(name.toLowerCase()));
    });
}

module.exports = {
    byStopId,
    byStopName
};
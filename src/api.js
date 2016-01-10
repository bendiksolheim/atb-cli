const request = require('request');
const base = "http://bybussen.api.tmn.io/rt";

function req(url) {
    return {
        url: url,
        json: true
    };
}

function byStopId(id) {
    return new Promise((resolve, reject) => {
        request(req(`${base}/${id}`), (error, response, body) => {
            if (error)
                return reject(error);

            resolve(body.next);
        });
    });
}

module.exports = {
    byStopId: byStopId
};
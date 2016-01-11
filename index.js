#!/usr/bin/env node

const columnify = require('columnify');
const api = require('./src/api');

function print(data) {
    if (data.heading) {
        console.log(data.heading);
        data = data.data;
    }
    console.log(columnify(data, {
        showHeaders: false,
        columnSplitter: '  '
    }));
}

function formatRoutes(routes) {
    return routes
        .map((route) => {
            return {route: route.l, time: route.ts};
        });
}

// http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
function isNumeric(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
}

function isId(query) {
    return isNumeric(query[0]);
}

function get(query) {
    if (isId(query)) {
        return api.byStopId(query).then(stop => {
            return {heading: stop.name, data: formatRoutes(stop.next)};
        });
    }

    return api.byStopName(query).then(stops => {
        return stops
            .map(stop => {
                return {name: stop.name, id: stop.locationId};
            });
    });
}

if (process.argv.length > 2) {
    const query = process.argv.slice(2).join(" ");
    get(query).then(print);
}
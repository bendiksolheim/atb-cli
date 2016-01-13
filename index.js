#!/usr/bin/env node

const columnify = require('columnify');
const api = require('./api');

const columnOptions = {
    showHeaders: false,
    columnSplitter: '  '
}

function print(results) {
    if (!Array.isArray(results)) {
        results = [results];
    }

    results.forEach(data => {
        if (data.heading) {
            console.log(data.heading);
            data = data.data;
        }

        console.log(`${columnify(data, columnOptions)}\n`);
    });
}

function printError(error) {
    console.error(`Error from API: ${error}`);
    process.exit(1);
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

function getById(id) {
    return api.byStopId(id).then(stop => {
        return { heading: stop.name, data: formatRoutes(stop.next) };
    });
}

function getByName(name) {
    return api.byStopName(name).then(stops => {
        if (stops.length  <= 2)
            return Promise.all(stops.map(stop => getById(stop.locationId)));

        return [stops
            .map(stop => {
                return { name: stop.name, id: stop.locationId };
            })];
    });
}

function get(query) {
    if (isId(query))
        return getById(query);

    return getByName(query);
}

if (process.argv.length > 2) {
    const query = process.argv.slice(2).join(" ");
    get(query).then(print).catch(printError);
}
#!/usr/bin/env node

const api = require('./src/api');

function isRoute(route) {
    return slot => {
        return slot.l === route;
    }
}

function formatRoutes(routes) {
    return routes
        .map((route) => {
            return `${route.l}\t${route.ts}`;
        })
        .join('\n');
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
            return `${stop.name}\n${formatRoutes(stop.next)}`;
        });
    }

    return api.byStopName(query).then(stops => {
        return stops
            .map(stop => {
                return `${stop.name}\t\t${stop.locationId}`;
            }).join('\n');
    });
}

if (process.argv.length > 2) {
    const query = process.argv.slice(2).join(" ");
    get(query).then(console.log);
}
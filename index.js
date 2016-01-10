const api = require('./src/api');

function isRoute(route) {
    return slot => {
        return slot.l === route;
    }
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
            return stop
                .filter(isRoute("60"))
                .map((route) => route.ts)
                .join('\n');
        });
    } else {
        return api.byStopName(query).then(stops => {
            return stops
                .map(stop => {
                    return `${stop.name}\t\t${stop.locationId}`;
                }).join('\n');
        });
    }
}

if (process.argv.length > 2) {
    const query = process.argv.slice(2).join(" ");
    get(query).then(console.log);
}
const api = require('./src/api');

function isRoute(route) {
    return (slot) => {
        return slot.l === route;
    }
}

api.byStopId(16011290).then((stop) => {
    const formatted = stop
        .filter(isRoute("60"))
        .map((route) => route.ts)
        .join('\n');

    console.log(formatted);
});
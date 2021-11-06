const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

// We now merge each of the resovers by spreading and then merging them into one object.
const RootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
};

module.exports = RootResolver;
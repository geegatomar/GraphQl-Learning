const Event = require("../../models/event");
const {
    transformEvent
} = require("./merge");
const {
    dateToString
} = require("../../helpers/date")
const User = require("../../models/user");



module.exports = {
    events: async () => {
        // 'Event' is a constructor, and we use all its methods.
        try {
            const events = await Event.find()
            console.log(events);
            return events.map((event) => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            // This was we are restricting this API, and if you don't have the auth token, you cannot login.
            throw new Error("Unauthenticated");
        }
        try {
            const newEvent = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(),
                creator: req.userId
            });
            const result = await newEvent.save();
            console.log(result);
            // _doc is a property provided by mongoose which gives us all the core properties, and excludes other metadata.
            console.log("---");
            createdEvent = transformEvent(result);
            console.log(createdEvent);
            console.log("Before user");
            const user = await User.findById(req.userId);
            console.log(user);
            if (!user) {
                throw new Error("User does not exist");
            }
            user.createdEvents.push(newEvent);
            await user.save();
            console.log("CREATED EVENT");
            console.log(createdEvent);
            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
}
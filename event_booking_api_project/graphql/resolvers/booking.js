const {
    transformEvent,
    transformBooking
} = require("./merge");
const Booking = require("../../models/booking");
const Event = require("../../models/event");


module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated");
        }
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated");
        }
        const fetchedEvent = await Event.findOne({
            _id: args.eventId
        });
        console.log(fetchedEvent);
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent._id
        })
        console.log("================");
        console.log(booking);
        const result = await booking.save();
        console.log("================");
        console.log(result);
        console.log(result._doc);
        return transformBooking(result);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthenticated");
        }
        try {
            const booking = await Booking.findById({
                _id: args.bookingId
            }).populate("event");

            const event = transformEvent(booking.event);
            console.log({
                ...booking.event
            })
            console.log("-------------------------------------");
            console.log({
                ...booking.event._doc
            })

            await Booking.deleteOne({
                _id: args.bookingId
            });
            return event;
        } catch (err) {
            throw err;
        }
    }
}
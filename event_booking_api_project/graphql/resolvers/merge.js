const Event = require("../../models/event");
const User = require("../../models/user");
const {
    dateToString
} = require("../../helpers/date")

// Function to fetch user by id
const fetchUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: fetchEvents.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
}

// Function to fetch events by id
const fetchEvents = async (eventIds) => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        });
        return events.map(event => {
            return transformEvent(event);
        })
    } catch (err) {
        throw err;
    }
}

const fetchSingleEvent = async (eventId) => {
    try {
        const event = await Event.findById({
            _id: eventId
        });
        return transformEvent(event)

    } catch (err) {
        throw err;
    }
}

const transformEvent = (event) => {
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: fetchUser.bind(this, event.creator)
    }
}

const transformBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: fetchUser.bind(this, booking._doc.user),
        event: fetchSingleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}



// exports.fetchUser = fetchUser;
// exports.fetchEvents = fetchEvents;
// exports.fetchSingleEvent = fetchSingleEvent;

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // This is how we create a list inside mongoose (and establish this relationship).
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
    // The 'ref' variable tells mongoose that this is a refernce to which model, here 'Event'
});

module.exports = mongoose.model("User", userSchema);
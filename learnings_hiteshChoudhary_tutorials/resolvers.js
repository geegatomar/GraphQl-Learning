const nanoid = require("nanoid");


class Course {
    constructor(id, {
        courseName,
        category,
        price,
        language,
        email,
        stack,
        teachingAssistant
    }) {
        this.id = id
        this.courseName = courseName
        this.category = category
        this.price = price
        this.language = language
        this.email = email
        this.stack = stack
        this.teachingAssistant = teachingAssistant
    }
}

const courseholder = {}

const resolvers = {
    getCourse: ({
        id
    }) => {
        return new Course(id, courseholder[id])
    },
    createCourse: ({
        input
    }) => {
        console.log("NANO ID\n", nanoid.nanoid)
        let id = nanoid.nanoid();
        console.log(id);
        courseholder[id] = input;
        console.log(input);
        return new Course(id, input);
    }
}

module.exports = resolvers;
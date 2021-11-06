// const buildSchema = require("graphql")
// import {
//     buildSchema
// } from "graphql";

const graphql = require("graphql");
const buildSchema = graphql.buildSchema;

// This is where we write the entire schema
const schema = buildSchema(`
    type Course {
        id: ID
        courseName: String
        category: String
        price: Int
        language: String
        email: String
        stack: Stack
        teachingAssistants: [TeachingAssistant]
    }

    type TeachingAssistant {
        firstName: String
        lastName: String
        experience: Int
    }

    enum Stack {
        WEB
        MOBILE
        OTHER
    }

    type Query {
        getCourse(id: ID): Course
    }

    input CourseInput{
        id: ID
        courseName: String!
        category: String
        price: Int!
        language: String
        email: String
        stack: Stack
        teachingAssistants: [TeachingAssistantInput]!
    }

    input TeachingAssistantInput {
        firstName: String
        lastName: String
        experience: Int
    }

    type Mutation {
        createCourse(input: CourseInput): Course
    }
`);

module.exports = schema;
const express = require("express");
const bodyParser = require("body-parser");
// We can use the graphqlHTTP function in the pace where express expects a middleware. It will take incoming requests, follow them through the graphq query parsers and automatically forward them to the resolvers 
const {
    graphqlHTTP
} = require("express-graphql");
const {
    buildSchema
} = require("graphql");
const mongoose = require("mongoose");

const grapqQlSchema = require("./graphql/schema/index");
const grapqQlResovers = require("./graphql/resolvers/index");

const isAuth = require("./middleware/is-auth");


const app = express();
// Using the body parser middleware to parse incoming json bodies.
app.use(bodyParser.json());


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fh0ne.mongodb.net/${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Mongodb Atlas connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(isAuth);

app.use("/graphql", graphqlHTTP({
    schema: grapqQlSchema,
    rootValue: grapqQlResovers,
    graphiql: true
}));

app.get("/", (req, res) => {
    res.send("Hi");
})


app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
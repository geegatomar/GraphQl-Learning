const express = require("express");
const schema = require(__dirname + "/schema.js");
const resolvers = require(__dirname + "/resolvers.js");
const expressGraphql = require("express-graphql");
const graphqlHTTP = expressGraphql.graphqlHTTP;

const app = express()

app.get("/", (req, res) => {
    res.send("Learning GraphQL Come on!!");
    console.log("===================================================");
    console.log(schema);
    console.log("===================================================");
    console.log(resolvers);
    console.log("===================================================");
    console.log(graphqlHTTP);
});

const root = resolvers;

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(5000, function () {
    console.log("Server listening on port 5000");
})
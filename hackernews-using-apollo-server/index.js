// This used Apollo server

const {
    ApolloServer
} = require("apollo-server");
const fs = require("fs");
const path = require("path");

// 1. Type Definitions
// Has been moved to the schema.graphql file now

links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// 2. Resolvers
const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews.`,
        feed: () => links,
        link: (par, args) => {
            let id = args.id;
            let toReturnLink;
            links.forEach((link) => {
                // console.log(link, link.id, id);
                if (link.id == id) {
                    toReturnLink = link;
                }
            });
            return toReturnLink;
        }
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;
            newLink = {
                id: `link-${idCount}`,
                url: args.url,
                description: args.description
            }
            links.push(newLink);
            return newLink;
        },
        updateLink: (_, args) => {
            let id = args.id
            let url = args.url
            let description = args.description
            let myLink;
            links.forEach((link) => {
                // console.log(link, link.id, id);
                if (link.id == id) {
                    myLink = link;
                }
            });
            myLink.url = url;
            myLink.description = description;
            return myLink;
        },
        deleteLink: (_, args) => {
            let id = args.id;
            links = links.filter((link) => {
                console.log(link.id, id);
                return link.id !== id
            })
            console.log(links)
            return links
        }
    }
}

// 3. Server definition
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers
});

server.listen().then(({
    url
}) => {
    console.log(`Server is running on ${url}`);
})
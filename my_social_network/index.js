const {
    ApolloServer
} = require("apollo-server");
const fs = require("fs");
const {
    Server
} = require("http");
const path = require("path");

// 1. Type Definitions
const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
);

let ListUsers = [];

// ListFollowers: [{
//     follower: 0,
//     following: 1
// }]

let ListPosts = []

let cnt = 1;

// 2. Resolvers
const resolvers = {
    Query: {
        check: () => {
            return "Social network WORK in process..."
        },
        users: () => {
            return ListUsers;
        },
        posts: () => {
            return ListPosts;
        },
        user: (_, args) => {
            let theUser;
            ListUsers.forEach((user) => {
                if (user.id == args.id) {
                    theUser = user;
                }
            });
            return theUser;
        }
    },
    Mutation: {
        createUser: (_, args) => {
            newUser = {
                id: args.id,
                email: args.email,
                followers: [],
                following: [],
                uploadedPosts: [],
                likedPosts: []
            }
            console.log(newUser)
            ListUsers.push(newUser);
            return newUser;
        },
        createPost: (parent, args) => {
            let theUser;
            ListUsers.forEach((user) => {
                if (user.id == args.author) {
                    theUser = user;
                }
            })
            console.log(theUser);
            newPost = {
                id: `id-${cnt}`,
                author: theUser,
                imageUrl: "some_url_on_s3.com",
                description: args.description,
                dateCreation: "TODAY",
                likes: [],
                comments: []
            }
            cnt++;
            // Updating this post in the ListUsers data.
            theUser.uploadedPosts.push(newPost);
            console.log(newPost);
            ListPosts.push(newPost);
            return newPost;
        },
        followUser: (_, args) => {
            let theFollowerUser;
            let theFollowingUser;
            ListUsers.forEach((user) => {
                if (user.id == args.followerId) {
                    theFollowerUser = user;
                }
                if (user.id == args.followingId) {
                    theFollowingUser = user;
                }
            });
            theFollowerUser.followers.push(theFollowingUser);
            theFollowingUser.following.push(theFollowerUser);
            return theFollowingUser;
        }
    }
}
const resolver = {
    Query: {
        check: () => {
            return "Social network WORK in process..."
        },
        user: (_, args) => {
            let found = false;
            let theUser;
            ListUsers.forEach((user) => {
                if (user.id == args.id) {
                    found = true;
                    theUser = user;
                }
            })
            if (found)
                return theUser;
        }
    },
    Mutation: {
        createUser: (_, args) => {
            newUser = {
                id: args.id,
                email: args.email,
                followers: [],
                following: [],
                upoadedPosts: [],
                likedPosts: []
            }
            ListUsers.push(newUser);
            return newUser;
        },
        createPost: (parent, args) => {
            newPost = {
                author: args.author,
                imageurl: "some_url_on_s3.com",
                description: args.description,
                dateCreation: "TODAY",
                likes: [],
                comments: []
            }
            // TODO: Need to update this post in the ListUsers data.
            console.log(parent);
            ListPosts.push(newPost);
            return newPost;
        }
    }
}

// 3. Server Definition
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({
    url
}) => {
    console.log(`Server running on: ${url}`)
})

// TODO: Write a query to find friend of friend of user.
// TODO: Change the delete post after adding OAth, meaning that only the author of that post shall be authorized to delete their post.
// TODO: Databases, SQL - Postgres?
// TODO: DataLoader
// TODO: Authentication
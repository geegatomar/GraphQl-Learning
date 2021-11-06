const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({
                email: args.userInput.email
            })

            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();

            console.log("CREATED USER");
            console.log({
                ...result._doc,
                password: null
            })
            return {
                ...result._doc,
                password: null
            }
            // Here we are overriding the returned password to be null since we dont ever want the user to be able to query for it.    
        } catch (err) {
            throw err;
        }
    },
    login: async ({
        email,
        password
    }) => {
        // For logging in, we first validate the user and password. And then return the token.
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            throw new Error("User does not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password is incorrect!");
        }
        // The .sign() method of jwt allows us to store some information apart from the defaut token which it handles.
        // The first argument is the data we want to put in the token.
        // The second argument is the string used to hash the token, i.e. private key
        // The third argument is optional and specifies after how long it expires.
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, "someSuperSecretKey", {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}
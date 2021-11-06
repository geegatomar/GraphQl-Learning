const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // This sees if there is a 'authorization' field in the incoming requests' header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token == '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "someSuperSecretKey");
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    // This middleware hence tags on these 2 extra fields to the request, which is then passed on to all the other routes.
    // Hence after this middleware, we have information on whether the information is authenticated or not.
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}
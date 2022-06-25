const JWT = require('jsonwebtoken');
const User = require("../Models/User");

const Verify = async (req, res, next) => {
    try {
        const token = req.cookies.luxuryHub;

        if (token) {
            // const token = authHeader.split(" ")[1];
            // console.log(token);
            const verified = JWT.verify(token, process.env.JWT_SEC_KEY);
            const rootUser = await User.findOne({
                _id: verified.id
            });

            if (!rootUser) {
                throw new Error("User Not Found");
            }

            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;

            next();
        } else {
            return res.status(201).json({
                "success": false,
                "message": "Please Login to Perform This",
                "rootUser": null
            })
        }
    } catch (err) {
        res.status(401).json({ "success": false, "message": "Unauthorized User" });
        console.log(err);
    }
}

module.exports = Verify;
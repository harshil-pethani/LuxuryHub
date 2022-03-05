const router = require("express").Router();

// const verifyToken = require("../Helper/VerifyToken");
const JWT = require('jsonwebtoken')

router.post("/", (req, res) => {
    const accessToken = req.body.token;
    if (accessToken) {
        JWT.verify(accessToken, process.env.JWT_SEC_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    "success": false,
                    "message": "Token is Not Valid"
                })
            } else {
                res.status(200).json({
                    "success": true,
                    "userdata": userData
                })
            }
        })
    } else {
        res.status(400).json({
            "success": false,
            "message": "Token is not Available"
        })
    }
})

module.exports = router;
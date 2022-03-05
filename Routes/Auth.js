// importing Modules
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

// importing Models
const User = require("../Models/User");

// Register => /api/auth/register
router.post("/register", async (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.mobile || !req.body.location || !req.body.password || !req.body.cpassword) {
        res.status(201).json({ "success": false, "message": "Please Fill all the Fields" });
        return;
    }

    try {
        if (req.body.password === req.body.cpassword) {
            const newUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                location: req.body.location,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC_KEY).toString()
            })
            res.status(201).json({ "success": true, "message": "Account Creation Successfull" });
            return;

        } else {
            res.status(201).json({ "success": false, "message": "Password and Confirm Password Field Must be Same" });
            return;

        }


    } catch (e) {
        if (e.keyValue.username) {
            res.status(201).json({ "success": false, "message": "Username Already Exists" });
        }
        else if (e.keyValue.email) {
            res.status(201).json({ "success": false, "message": "Email Address Already Exists" });
        }
        else if (e.keyValue.mobile) {
            res.status(201).json({ "success": false, "message": "Mobile Number Already Exists" });
        }
        else {
            res.status(500).json({ "success": false, "message": "Registration Failed" });
        }
    }
})


// Login => /api/auth/login
router.post("/login", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(201).json({
            "success": false,
            "message": "Please Fill all the Fields"
        });
        return;
    }

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(201).send({
                "success": false,
                "message": "Invalid Credintials"
            });
            return;
        }

        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.AES_SEC_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPass !== req.body.password) {
            res.status(201).json({
                "success": false,
                "message": "Invalid Credintials"
            });
            return;
        }

        const accessToken = JWT.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC_KEY,
            { expiresIn: "3d" }
        );


        res.cookie('luxuryHub', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

        const { password, ...others } = user._doc;

        res.status(201).json({
            "success": true,
            ...others,
            accessToken
        });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            "success": false,
            "message": "Login Failed Internal Server Error"
        });
    }
})


// Logout => /api/auth/logout
router.get("/logout", async (req, res) => {
    res.cookie('luxuryHub', '', { maxAge: 0, httpOnly: true });

    res.status(201).json({
        "success": true,
        "message": "Logout Successfull"
    })
})

module.exports = router;
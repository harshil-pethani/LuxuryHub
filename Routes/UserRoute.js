// importing Modules
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//importing Helpers
const verifyToken = require("../Helper/VerifyToken");
const Verify = require("../Helper/Verify");
const User = require("../Models/User");

//Update Userdata
router.put("/update", Verify, async (req, res) => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {

    if (!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.mobile || !req.body.location) {
        res.status(201).json({ "success": false, "message": "Please Fill all the Fields" });
        return;
    }

    try {

        // if (req.body.password) {
        //     req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC_KEY).toString();
        // }
        // if (req.body.password === req.body.cpassword) {
        const updateUser = await User.findByIdAndUpdate(req.userId, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            location: req.body.location,
            avatar: req.body.avatar,
        }, { new: true })

        // {password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC_KEY).toString()}
        const { password, ...others } = updateUser._doc;

        res.status(200).json({ "success": true, ...others });
        // } else {
        //     res.status(201).json({ "success": false, "message": "Password and Confirm Password Field Must be Same" });
        //     return;
        // }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            "success": false,
            "message": "Updation Failed"
        })
    }

    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})

//Delete User
router.delete("/:id", verifyToken, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {

        try {
            const UpdatedUser = await User.findByIdAndDelete(req.params.id);

            res.status(200).json({ "success": true, "message": "User has Been Deleted" });

        } catch (e) {
            res.status(500).json({
                "success": false,
                "message": "Deletion Failed"
            })
        }

    } else {
        res.status(403).json({
            "success": false,
            "message": "You Are not Authenticated"
        })
    }
})


//Get User
router.get("/find/:id", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                res.status(404).json({
                    "success": false,
                    "message": "User Not Found"
                })
            } else {
                const { password, ...others } = user._doc;
                res.status(200).json({ "success": true, ...others });
            }

        } catch (e) {
            res.status(500).json({
                "success": false,
                "message": "Getting User data Failed"
            })
        }

    } else {
        res.status(403).json({
            "success": false,
            "message": "You Are not Authenticated"
        })
    }
})

//Get All Users
router.get("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const query = req.query.new;
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            res.status(200).json({ "success": true, users });

        } catch (e) {
            res.status(500).json({
                "success": false,
                "message": "Getting Users data Failed"
            })
        }

    } else {
        res.status(403).json({
            "success": false,
            "message": "You Are not Authenticated"
        })
    }
})


//Get User Stats

router.get("/stats", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        //Get Current date when the Get request is making.
        const currentDate = new Date();

        //Change the Year of the Current Date with the Previous year. (i.e. if 20-11-2021 is current date than lastYearDate would be 20-11-2020)
        const lastYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                {
                    // $match Stage is work as a filter in aggregate method. so we filtering users which registered in Last one Year.
                    $match: { createdAt: { $gte: lastYearDate } }
                },
                {
                    // $project is used to show some specific field or make new field with specific value from database values.
                    // Here we making new field monthOfCreation and its value is month number in which user registered. 
                    // $month is used to extract month value from Date Format in MongoDB. 
                    $project: { monthOfCreation: { $month: "$createdAt" } }
                },
                {
                    // $group is used to Grouping the Fields to perform Aggregation.
                    $group: { _id: "$monthOfCreation", total: { $sum: 1 } }
                }
            ])
            res.status(200).json(data);

        } catch (e) {
            res.status(500).json({
                "success": false,
                "message": "Getting Stats Failed"
            })
        }

    } else {
        res.status(403).json({
            "success": false,
            "message": "You are not Authenticated"
        })
    }
})


module.exports = router;
// importing Modules
const router = require("express").Router();

//importing Helpers
const verifyToken = require("../Helper/VerifyToken");
const Verify = require("../Helper/Verify");
const Order = require("../Models/Order");

//Create Order
router.post("/create", Verify, async (req, res) => {
    if (!req.body.order.fullname || !req.body.order.mobile || !req.body.order.altermobile || !req.body.order.landmark || !req.body.order.city || !req.body.order.state || !req.body.order.country || !req.body.order.pincode || !req.body.order.address) {
        res.status(201).json(
            {
                "success": false,
                "message": "Please Fill all the Fields"
            });
        return;
    }
    // const oldOrder = await Order.findOne({ userId: req.userId });
    try {
        let date = new Date();
        date.setDate(date.getDate() + 7);
        const savedOrder = await Order.create({
            userId: req.userId,
            order: req.body.order,
            products: req.body.products,
            quantity: req.body.quantity,
            total: req.body.total,
            orderDate: new Date().toDateString(),
            expectedDelivery: date.toDateString()
        });
        res.status(200).json({
            "success": true,
            ...savedOrder._doc
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            "success": false,
            "message": "Order Failed"
        })
    }
})

//Update Order
router.put("/update/:id", Verify, async (req, res) => {
    // if (req.user.isAdmin) {
    if (!req.body.fullname || !req.body.mobile || !req.body.altermobile || !req.body.landmark || !req.body.city || !req.body.state || !req.body.country || !req.body.pincode || !req.body.address) {
        res.status(201).json(
            {
                "success": false,
                "message": "Please Fill all the Fields"
            });
        return;
    }
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: req.params.id },
            {
                order: req.body,
            }, { new: true }
        );
        res.status(200).json({ "success": true, "message": "Delivery Details Updated Successfully", ...updatedOrder._doc });
    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Delivery Details Updation Failed"
        })
    }
    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})

//Delete Order
router.delete("/cancel/:id", Verify, async (req, res) => {
    // if (req.user.isAdmin) {
    try {
        await Order.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({ "success": true, "message": "Order has Been Cancelled" });

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Order Cancelation Failed"
        })
    }

    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})


//Get all Orders of User
router.get("/find/", Verify, async (req, res) => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
        const order = await Order.find({ userId: req.userId }).sort({ $natural: -1 });

        if (!order) {
            res.status(200).json({
                "success": false,
                "message": "You didn't Made Any Order"
            })
        } else {
            res.status(200).json(order);
        }

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Getting Order Failed"
        })
    }
    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})

//Get Single Order of User
router.get("/find/:id", Verify, async (req, res) => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
        const order = await Order.findOne({ _id: req.params.id });
        if (!order) {
            res.status(200).json({
                "success": false,
                "message": "Sorry Order Data Not Found"
            })
        } else {
            res.status(200).json(order);
        }

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Getting Order Failed"
        })
    }
    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})

// Get All Orders
router.get("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const orders = await Order.find();
            res.status(200).json({
                "success": true,
                orders
            })
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        req.status(403).json({
            "success": false,
            "message": "You are not Authenticated"
        })
    }
})


// Get Order Monthly Income
router.get("/income", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        // i.e. current date is 26-11-2021 so that lastMonth value will be 26-10-2021
        const currentDate1 = new Date();
        const lastMonth = new Date(currentDate1.setMonth(currentDate1.getMonth() - 1));

        // i.e. current date is 26-11-2021 so that previousMonth value will be 26-09-2021
        const currentDate2 = new Date();
        const previousMonth = new Date(currentDate2.setMonth(currentDate2.getMonth() - 2));

        try {
            const income = await Order.aggregate([
                {
                    $match: { createdAt: { $gte: previousMonth } }
                },
                {
                    $project:
                    {
                        monthOfOrder: { $month: "$createdAt" },
                        sales: "$amount"
                    }
                },
                {
                    $group:
                    {
                        _id: "$monthOfOrder",
                        total: { $sum: "$sales" }
                    }
                }
            ])
            res.status(200).json({
                "success": true,
                income
            })

        } catch (e) {
            req.status(500).json({
                "success": false,
                "message": "Getting Income Data Failed"
            })
        }

    } else {
        req.status(403).json({
            "success": false,
            "message": "You are not Authenticated"
        })
    }
})


module.exports = router;
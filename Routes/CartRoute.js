// importing Modules
const router = require("express").Router();

//importing Helpers
const verifyToken = require("../Helper/VerifyToken");
const Verify = require("../Helper/Verify");
const Cart = require("../Models/Cart");

//Create Cart
router.post("/create", Verify, async (req, res) => {
    try {
        // console.log("Creating Cart");
        const oldCart = await Cart.findOne({ userId: req.userId });
        if (oldCart) {
            await Cart.findOneAndDelete({ userId: req.userId });

            const savedCart = await Cart.create({
                userId: req.userId,
                products: req.body.products,
                quantity: req.body.quantity,
                total: req.body.total,
                rootUser: req.rootUser
            });

            res.status(200).json({
                savedCart
            })

        } else {
            const savedCart = await Cart.create({
                userId: req.userId,
                products: req.body.products,
                quantity: req.body.quantity,
                total: req.body.total,
                rootUser: req.rootUser
            });


            // console.log(req.body.products);
            // console.log(savedCart);
            // console.log("object");

            res.status(200).json({
                savedCart
            })
        }
    } catch (e) {
        // console.log(e);
        res.status(500).json({
            "success": false,
            "message": "Item Adding to Cart Failed"
        })
    }
})

//Update Cart
router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { "userId": req.user.id },
                {
                    "userId": req.user.id,
                    "products": req.body.products
                }, { new: true }
            );
            res.status(200).json({ "success": true, ...updatedCart._doc });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                "success": false,
                "message": "Updation Failed"
            })
        }
    } else {
        res.status(403).json({
            "success": false,
            "message": "You Are not Authenticated"
        })
    }
})

//Clear Cart
router.delete("/clear", Verify, async (req, res) => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
        await Cart.findOneAndDelete({ "userId": req.userId });

        res.status(200).json({ "success": true, "message": "Cart has Been Cleared" });

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Deletion Failed"
        })
    }
    // } else {
    //     res.status(403).json({
    //         "success": false,
    //         "message": "You Are not Authenticated"
    //     })
    // }
})


//Get User Cart
router.get("/find", Verify, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });

        if (!cart) {
            res.status(200).json({
                "success": true,
                userId: req.userId,
                rootUser: req.rootUser,
                "message": "Your Cart is Clear"
            })
        } else {
            res.status(200).json({
                "success": true,
                userId: req.userId,
                rootUser: req.rootUser,
                products: cart._doc.products,
                quantity: cart._doc.quantity,
                total: cart._doc.total,
            });
        }

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Getting Cart Failed"
        })
    }
})

// Get All Carts
router.get("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const carts = await Cart.find();
            res.status(200).json({
                "success": true,
                carts
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


module.exports = router;
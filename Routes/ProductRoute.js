// importing Modules
const router = require("express").Router();

//importing Helpers
const verifyToken = require("../Helper/VerifyToken");
const Product = require("../Models/Product");


//Create Product
router.post("/create", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const newProduct = new Product(req.body);

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json({
                "success": true,
                ...savedProduct._doc
            })

        } catch (e) {
            if (e.keyPattern.title) {
                res.status(409).json({
                    "success": false,
                    "message": "Same Title Product is Already Listed"
                })
            } else {
                res.status(500).json({
                    "success": false,
                    "message": "Product Listing Failed"
                })
            }
        }

    } else {
        res.status(403).json({
            "success": false,
            "message": "You Are not Authenticated"
        })
    }
})

//Update Product
router.put("/:id", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {

                    //Below method will not work because some time we want to change only title or category but it ask all the 7 values so we can use $set method.

                    // title: req.body.title,
                    // desc: req.body.desc
                    // img: req.body.img,
                    // categories: req.body.categories,
                    // size: req.body.size,
                    // color: req.body.color,
                    // price: req.body.price,


                    //It will take values which are passed into the req.body and set them to correspond variable.

                    $set: req.body

                }, { new: true }
            );


            res.status(200).json({ "success": true, ...updatedProduct._doc });

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

//Delete Product
router.delete("/:id", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const DeletedUser = await Product.findByIdAndDelete(req.params.id);

            res.status(200).json({ "success": true, "message": "Product has Been Deleted" });

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


//Get Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({
                "success": false,
                "message": "Product Not Found"
            })
        } else {
            res.status(200).json({ "success": true, ...product._doc });
        }

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Getting Product data Failed"
        })
    }
})

//Get All Products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({
                createdAt: -1
            }).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                categories: { $in: [qCategory] }
            })
        } else {
            products = await Product.find();
        }

        if (products.length > 0) {
            res.status(200).json({ "success": true, products });
        } else {
            res.status(200).json({ "success": false, "message": "Products are Not available" });
        }

    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Getting Products data Failed"
        })
    }
})



module.exports = router;
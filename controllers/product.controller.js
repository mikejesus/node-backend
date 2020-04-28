const Product = require("../models/product.model.js");

exports.create = (req, res) => {
    //Validate form to ensure it's not empty
    if (!req.body) {
        res.status(400).send({
            message: "Form cannot be empty",
        });
    }

    //create an instance of the product to be created
    const newProduct = new Product({
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_image: req.body.product_image,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity
    });


    //Insert new product into the database
    Product.create(newProduct, (err, data) => {
        if (!newProduct) {
            res.status(400).json("No empty records is allowed...")
        } else if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while adding your products",
            });
        } else {
            res.json(data);
        }
    });
};

//Fetch all the products
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        else res.json(data);
    });
};

//Fetch one product based on id
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Product with id ${req.params.productId} Not found .`,
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving product with id " + req.params.productId,
                });
            }
        } else res.json(data);
    });
};

//Update a product by ID
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" });
    }
    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).json({
                        message: `Product with id ${req.params.productId} Not found .`,
                    });
                    return;
                } else {
                    res.status(500).json({
                        message: "Error updating product with id " + req.params.productId,
                    });
                    return;
                }
            } else {
                res.json(data);
            }
        }
    );
};


//Delete a product
exports.deleteProduct = (req, res) => {
    Product.delete(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Product with id ${req.params.productId} Not found .`,
                });
            } else {
                res.status(500).json({
                    message: "Could not delete product with id " + req.params.productId,
                });
            }
        } else {
            res.json({ message: `product was deleted successfully!` });
        }
    });
};
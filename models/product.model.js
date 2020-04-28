const conn = require("./db.js");

//Product Constructor
const Product = function(product) {
    this.product_name = product.product_name;
    this.product_description = product.product_description;
    this.product_image = product.product_image;
    this.product_price = product.product_price;
    this.product_quantity = product.product_quantity;
};

// Create a new product
Product.create = (newProduct, result) => {
    conn.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {
            id: res.name,
            ...newProduct
        });
    });
};

// View a single product
Product.findById = (productId, result) => {
    conn.query(`SELECT * FROM products WHERE product_id =   ${productId}`, (err, res) => {
        if (err) {
            console.log("error:  ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found Product: ", res[0]);
            result(null, res[0]);
        }
        result({ kind: "not_found" }, null);
    });
};

//View all products
Product.getAll = (result) => {
    conn.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.log("error:  ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Update a product
Product.updateById = (productId, product, result) => {
    conn.query(
        `UPDATE products SET product_name=?, product_description=?, product_image=?, product_price=?, product_quantity=? WHERE product_id =? `, [product.product_name, product.product_description, product.product_image, product.product_price, product.product_quantity, productId],
        (err, res) => {
            if (err) {
                console.log("error:  ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, {
                product_id: productId,
                ...product
            });
        }
    );
};

// remove a product
Product.delete = (productId, result) => {
    conn.query(`DELETE FROM products WHERE product_id =   ${productId}`, (err, res) => {
        if (err) {
            console.log("error:  ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Product;
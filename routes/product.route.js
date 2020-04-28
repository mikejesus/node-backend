// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/')
//     },

//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === "image/png") {
//             cb(null, true);
//         } else {
//             cb(null, false)
//         }
//     }
//     // const upload = multer({ dest: 'uploads/' })
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 60
//     },
//     fileFilter: fileFilter
// })



module.exports = (app) => {
    const product = require("../controllers/product.controller.js");

    // Add a Product
    app.post("/product/new", product.create);

    //Retrive all Product
    app.get("/products", product.findAll);

    // Retrieve one products
    app.get("/products/:productId", product.findOne);

    // Edit Product
    app.put("/products/:productId", product.update);

    // Delete Product
    app.delete("/products/:productId", product.deleteProduct);

};
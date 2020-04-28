const express = require('express')
const app = express()

const PORT = process.env.PORT || 6000

//Parse requset of content type application/json
app.use(express.json());

//Parse content type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


//import routes
require("./routes/product.route.js")(app);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
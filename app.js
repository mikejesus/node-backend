const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const users = require('./user')

// List/Display all Users
app.get('/jsonapi/users', (req, res) => {
    res.status(200).json(users);
})


app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})
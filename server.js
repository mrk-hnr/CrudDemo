// ++++++++++++++++++++++++++++++++
// ++++ DEPENDENCIES INSTALLED ++++
// ++++++++++++++++++++++++++++++++
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

// ++++++++++++++++++++++++++
// ++++ DEPENDENCIES END ++++
// ++++++++++++++++++++++++++


app.use(bodyParser.urlencoded({extended: true})) // Should be placed before CRUD handlers



app.listen(3000, function() {
    console.log("Listening on port 3000") // Allows us to view it on browser via localhost: XXXX
})

// +++++++++++++++++++++++++++
// ++++ GET/READ SECTION ++++
// ++++++++++++++++++++++++++

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html") //sends the specific directory plus the file inside the quotation mark, wherein __dirname is the current directory we are in.
})


// +++++++++++++++++++++++++++++
// ++++ POST/CREATE SECTION ++++
// +++++++++++++++++++++++++++++

app.post("/quotes", (req, res) => {
    console.log(req.body)
})
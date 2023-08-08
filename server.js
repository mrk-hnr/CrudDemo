const express = require("express")
const app = express()


app.listen(3000, function() {
    console.log("Listening on port 3000") // Allows us to view it on browser via localhost: XXXX
})

// +++++++++++++++++++++
// ++++ GET SECTION ++++
// +++++++++++++++++++++

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html") //sends the specific directory plus the file inside the quotation mark, wherein __dirname is the current directory we are in.
})
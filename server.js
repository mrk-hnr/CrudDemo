const express = require("express")
const app = express()


app.listen(3000, function() {
    console.log("Listening on port 3000") // Allows us to view it on browser via localhost: XXXX
})

// GET
app.get("/", (req, res) => {
    res.send("Hello World!") 
})
     // Prints on localhost)
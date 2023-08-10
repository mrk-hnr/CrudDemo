// ++++++++++++++++++++++++++++++++
// ++++ DEPENDENCIES INSTALLED ++++
// ++++++++++++++++++++++++++++++++

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const MongoClient = require("mongodb").MongoClient
const connectionString = "mongodb://<username>:<password>@ac-ae3encb-shard-00-00.ppp7vla.mongodb.net:27017,ac-ae3encb-shard-00-01.ppp7vla.mongodb.net:27017,ac-ae3encb-shard-00-02.ppp7vla.mongodb.net:27017/?ssl=true&replicaSet=atlas-7poxc4-shard-0&authSource=admin&retryWrites=true&w=majority"
const path = require('path')

// ++++++++++++++++++++++++++++++++
// ++++ DEPENDENCIES END ++++
// ++++++++++++++++++++++++++++++++

MongoClient.connect(connectionString, { useUnifiedTopology: true }) //Connects to Mongodb
    .then(client => {
        console.log("Connected to Database")
        const db = client.db("star-wars-quotes")
        const quotesCollection = db.collection("quotes")

        // All express request handlers to be placed below
        // app.set (ejs should be placed before app.use, .get. or .post)
        // app.use
        // app.get
        // app.post
        // app.listen

        app.set("view engine", "ejs") // Can now generate HTML that contains the quotes. This process is called rendering the HTML.

     

        app.use(bodyParser.urlencoded({extended: true})) // Should be placed before other CRUD handlers
        app.use(express.static("public"))
        app.use(bodyParser.json())
        

        app.get("/", (req, res) => {
            quotesCollection
            .find() //.find() returns a cursor but is still incomplete in itself. cursor has to be displayed somewhere.
            .toArray() // In this case, we also converted the data into array via .toArray()
            .then(result => {
                res.render("index.ejs", { quotes: result})
            })
            .catch(error => console.error(error))

        })

        app.post("/quotes", (req, res) => {
            quotesCollection
            .insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect("/") // Directs to "locahost:XXXX" that enables us to home local directory
            })
            .catch(error => console.error(error))
        })

        app.put("/quotes", (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: "Yoda" },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                    },
                },
                {
                    upsert: true,
                }
            )
            .then(result => {
                console.log(result)
                res.json("Success!")
            })
            .catch(error => console.error(error))
        })

        app.delete("/quotes", (req, res) => {
            quotesCollection.deleteOne( {name: req.body.name })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json("All Vader quote has been deleted.")
                }
                res.json("Deleted Darth Vader's quote.")
            })
            .catch(error => console.error(error))
        })

        app.listen(3000, function() {
            console.log("Listening on port 3000") // Allows us to view it on browser via localhost: XXXX
        })
    })
    .catch(error => console.error(error))


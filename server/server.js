const express = require("express")
const path = require("path") ;
const people = require("./db") ;
const cors = require("cors")

const app = express() ;


app.use(express.static(path.join(__dirname,  "./public")));

app.use(cors()) ;
app.get("/people", (req, res) => {
    res.send(people) ;
})

app.get("/delete/:id", (req, res) => {
    var idx = people.findIndex( p => p.id == req.params.id);
    if ( idx !== -1) {
        people.splice(idx,1) ;
        people.forEach( p => {
            p.favorites = p.favorites.filter((p) => p != req.params.id )
        })
        console.log(req.params.id + " deleted.")
        res.json({"result" : "ok"})
    } else {
        res.json({"result" : "id not found"})
    }
});

const port = 8080
app.listen(port, (err) => {
    console.log("Server is up and running at " + port);
  });
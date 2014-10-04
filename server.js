var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs("mongodb://admin:DGyHedwqyyk6@127.2.104.2:27017/cs561001", ["serviceClients"]);


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());//turn the parser on so that server can read the json from req. body

//get all
app.get("/serviceClients", function (req, res) {
    db.serviceClients.find(function (err, docs) {
        res.json(docs);
    });


});

//add one
app.post("/serviceClients", function (req, res) {
    db.serviceClients.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

//delete by id
app.delete("/serviceClients/:id", function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.serviceClients.remove({_id: mongojs.ObjectId(id)},
        function (err, doc) {
            res.json(doc);
        });
});

//select 
app.get("/serviceClients/:id", function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.serviceClients.findOne({ _id: mongojs.ObjectId(id) },
        function (err, doc) {
            res.json(doc);
        });
});

//select 
app.put("/serviceClients/:id", function (req, res) {
    var id = req.params.id;
    //console.log(id);
    db.serviceClients.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name } },
        new: true
        },
        function (err, doc) {
            res.json(doc);
        });
});

app.get("/env", function (req, res) {
    res.json(process.env);
});



 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
 var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ipaddress);
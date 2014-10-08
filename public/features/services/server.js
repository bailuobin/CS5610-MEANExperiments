module.exports = function (app, db, mongojs) {

    //get all
    app.get("/applications", function (req, res) {
        db.applications.find(function (err, docs) {
            res.json(docs);
        });


    });

    //add one
    app.post("/applications", function (req, res) {
        db.applications.insert(req.body, function (err, doc) {
            res.json(doc);
        });
    });

    //delete by id
    app.delete("/applications/:id", function (req, res) {
        var id = req.params.id;
        //console.log(id);
        db.applications.remove({ _id: mongojs.ObjectId(id) },
            function (err, doc) {
                res.json(doc);
            });
    });

    //select 
    app.get("/applications/:id", function (req, res) {
        var id = req.params.id;
        console.log(id);

        db.applications.findOne({ _id: mongojs.ObjectId(id) },
            function (err, doc) {
                console.log(err);
                res.json(doc);
            });
    });

    //select 
    app.put("/applications/:id", function (req, res) {
        var id = req.params.id;
        console.log(id);

        db.applications.findAndModify({
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

}
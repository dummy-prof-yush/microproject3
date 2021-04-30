const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

var db;

MongoClient.connect('mongodb://localhost:27017/PandaFurnitures', { useUnifiedTopology: true }, (err, database) => {
    if (err) return console.error(err);
    db = database.db('PandaFurnitures');
    app.listen(3500, () => {
        console.log('Listening on port 3500');
    });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    db.collection('furniture').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('HomePage.ejs', { data: result });
    });
});

app.get('/update', (req, res) => {
    db.collection('furniture').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('Update.ejs', { data: result });
    });
});

app.get('/delete', (req, res) => {
    db.collection('furniture').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('Delete.ejs', { data: result });
    });
});

app.get('/add', (req, res) => {
    res.render('Add.ejs');
});

app.post('/addData', (req, res) => {
    db.collection('furniture').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
});
app.post('/deleteData', (req, res) => {
    db.collection('furniture').deleteOne({ 'fid': req.body.fid }, (err, success) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
})
app.post('/updateData', (req, res) => {
    var update = {};
    update[req.body.field] = req.body.newVal;
    db.collection('furniture').updateOne({ 'fid': req.body.fid },
        { $set: update }, (err, success) => {
            if (err) return console.log(err);
            res.redirect('/');
        });
});
const express = require("express");
const app = express();
// app.listen(8000, () => {
//     console.log("listening on port 8000");
// });

//for post data
app.use(express.urlencoded({ extended: true }));

//for reading json
app.use(express.json());

//for angular app
app.use(express.static(__dirname + '/public/dist/public'));

//require Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/records', { useNewUrlParser: true });
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
const records = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    address: {
        type: String,
    },
});
const Employees = mongoose.model('Employees', records);

function generateData(){
    for(var i = 0; i < 10000; i++){
        var randomObject = dummy(Employees, {
            ignore: ignoredFields,
            returnDate: true
        })
        Employees.create(randomObject)
    }
}

app.listen(8000, () => {
    console.log("listening on port 8000");
    // generateData();
});

app.get('/data', (request, response) => {
    generateData()
    console.log("data generated")
})

app.get('/records', (request, response) => {
    Employees.find()
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
});

app.get('/records/:pageId', (request, response) => {
    console.log("your get getting page: " + request.params.pageId);
    var perPage = 20;
    var page = request.params.pageId - 1
    Employees.find().limit(perPage).skip(page * perPage).then(data => response.json({ message: "success", result: data }))
});

app.get('/records/name/:name', (request, response) => {
    Employees.find({ name: request.params.name })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})

app.get('/records/address/:address', (request, response) => {
    Employees.find({ address: request.params.address })
        .then(data => response.json({ message: "success", result: data }))
        .catch(err => response.json(err))
})


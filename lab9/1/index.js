const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine

// static resourse
app.use(express.static('public'));
// Set EJS as templating engine


// routing 

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form2.html"));
});

app.get('/process_get', function (req, res) {
    let formdata = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        age: req.query.age,
        address: req.query.address,
        phone: req.query.phone
    };
    console.log(formdata);
    //
    let sql = `INSERT INTO users VALUES ('${formdata.username}', '${formdata.password}', '${formdata.email}', '${formdata.firstname}', '${formdata.lastname}', ${formdata.age}, '${formdata.address}', '${formdata.phone}');`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
    });
})
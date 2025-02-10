const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resource & template engine
app.use(express.static('public'));

// routing 
app.listen(port, () => {
    console.log(`listening on port ${port}`);
}); 

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/process_get', function (req, res) {
    let formdata = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email
    };
    console.log(formdata);

    let sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
    conn.query(sql, [formdata.username, formdata.email], function (err, result) {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            let user = result[0];
            if (user.password === formdata.password) {
                res.send("Login successful");
            } else {
                res.send("Incorrect password");
            }
        } else {
            res.send("User not found");
        }
    });
});

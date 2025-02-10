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
app.set('view engine', 'ejs');


// routing 

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 

app.get('/show', function (req, res) {
    const sql = `
    SELECT songs.song_name, artists.artist_name, YEAR(songs.song_release_date) AS year, songs.song_type
    FROM songs LEFT JOIN artists ON songs.artist=artists.artist_id;`;
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })
});
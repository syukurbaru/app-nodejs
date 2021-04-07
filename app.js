const express = require('express');
const app = express();
const connection = require('./connection/connect')
const Home = require('./controllers/Home')
const port = 3000;

// Tempelkan code untuk menspesifikasikan folder yang menyimpan file CSS dan image 
app.use(express.static('public'));
// Mendapatkan value dari body html
app.use(express.urlencoded({extended: false}));

// Membuat connection ke database;
connection.connect((err) => {
    if (err) throw err;
    console.log("Succesed Connecting 🌞");
});

// Tambahan route untuk halaman top
app.get('/', (req,res) => {
    res.render('top.ejs')
});

app.get('/index', (req,res) => {
    // data dari database
    connection.query(`SELECT * FROM items;`, (err, data) => {
        if (err) throw err;
        res.render('index.ejs', {items : data});
    });
});

// Tambah
app.get('/new', (req, res) => {
    res.render('new.ejs')
});

app.post('/create', (req,res) => {
    // console.log(req.body.itemName)
    connection.query(`INSERT INTO items (name) VALUES (?);`, [req.body.itemName], (err, data) => {
        if (err) throw err;
        
        res.redirect('/index');
    })

})

// Hapus
app.post('/delete/:id', (req,res) => {
    // console.log(req.params)
    const id = req.params.id
    connection.query(`DELETE FROM items WHERE id = ?;`, [id], (err, data) => {
        if (err) throw err;

        res.redirect('/index');
    })
})

// EDIT
// Mengirim id melalui tautan dan menampilkan isinya
app.get('/edit/:id', (req,res) => {
    // console.log(req.params.id)
    const id = req.params.id
    connection.query(`SELECT * FROM items WHERE id = ?;`, [id], (err, data) => {
        // console.log(data[0])
        res.render('edit.ejs', {items: data[0]})
    })
})
// Menampilkan halaman edit
app.post('/update/:id', (req, res) => {
    // console.log(req.body.itemName);
    // console.log(req.params.id)
    const id = req.params.id;
    const name = req.body.itemName;
    connection.query(`UPDATE items SET name = ? WHERE id = ?;`, [name, id], (err, data) => {
        if (err) throw err;
        res.redirect('/index')
    } )
})

app.listen(port, () => console.log(`Listening on port ${port} ✈️`));
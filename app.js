const express = require('express');
const mysql = require('mysql');

// Create Connection
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodesql',
});

//Connect
db.connect((err) => {
  if (err) {
    console.log('connection err', err);
  } else {
    console.log('Connected!');
  }
});

const app = express();

//Create DB

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodesql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});

app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE Posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created');
  });
});

// Add Post 1
app.get('/addpost1', (req, res)=>{
  let post = {title: 'Post One', body: 'This is Post one body'}
  let sql = 'INSERT INTO Posts SET ?'
  db.query(sql, post, (err, result)=>{
    if(err) throw err
    console.log(result);
    res.send('Data added to table')
  })
})
//Add post 2
app.get('/addpost2', (req, res)=>{
  let post = {title: 'Post Two', body: 'This is Post Two body'}
  let sql = 'INSERT INTO Posts SET ?'
  db.query(sql, post, (err, result)=>{
    if(err) throw err
    console.log(result);
    res.send('Data added to table')
  })
})
//Get Post
app.get('/getpost', (req, res)=>{
  // let post = {title: 'Post Two', body: 'This is Post Two body'}
  let sql = 'SELECT * FROM Posts'
  let query = db.query(sql, (err, result)=>{
    if(err) throw err
    console.log(result);
    res.send('Posts Fetched...')
  })
})

app.listen('9000', () => {
  console.log(`Server started on port 9000`);
});

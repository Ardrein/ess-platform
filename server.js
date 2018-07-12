const express = require('express');
const app = express();

const path = require('path');
const http = require('http');

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoConnect = require('./server/config/database');


// settings
app.set('port',process.env.PORT || 3000);   //Checks if there is a port defined by the OS. If not, use port 3000.
app.use(express.static(path.join(__dirname, 'dist'))); //Folder for static files / Angular creates the client in this folder.


//middlewares
app.use(morgan('dev'));  //Visualize http messages on console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  //Information from forms interpreted through URL./ extended>Only data

//routes
app.use('/api',require('./server/routes/routes'));

//Error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Capture all routes and send them to index in dist(Angular2)
app.get('*',(req,res) =>{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

app.listen(app.get('port'), () =>{
	console.log('server on port', app.get('port'));
});
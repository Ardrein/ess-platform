//Dependencias
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//Creacion del servidor express
var app = express();

//registra cada peticion a la consola
app.use(morgan('dev'));

//Parsers para la información de POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Ruta hacia dist
app.use(express.static(path.join(__dirname, 'dist')));

//API routes
var api = require('./server/routes/api');

//Configuracion de la base de datos
var mongoose = require('mongoose');
var dbConfig = require('./server/config/db.config'); //conexión a la base de datos

//rutas API
app.use('/api', api);

//Captura de todas las rutas y redireccionamiento al archivo index
app.get('*',(req,res) =>{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Captura del puerto del entorno y asignación en express
var port = process.env.PORT || '3000';
app.set('port', port);

//Creación del servidor http
var server = http.createServer(app);

//Escucha en el puerto
server.listen(port,() => console.log(`API corriendo en localhost:${port}`));
//Dependencias

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');



const app = express();

//registra cada peticion a la consola
app.use(morgan('dev'));

//Parsers para la información de POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));



//Ruta hacia dist
app.use(express.static(path.join(__dirname, 'dist')));

//API routes
const api = require('./server/routes/api');

//rutas API
app.use('/api', api);

//Captura de todas las rutas y redireccionamiento al archivo index
app.get('*',(req,res) =>{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Captura del puerto del entorno y asignación en express
const port = process.env.PORT || '3000';
app.set('port', port);

//Creación del servidor http
const server = http.createServer(app);

//Escucha en el puerto
server.listen(port,() => console.log(`API corriendo en localhost:${port}`));
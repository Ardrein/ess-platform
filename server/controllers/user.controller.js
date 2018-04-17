var User = require('../models/user.model');

//crear un nuevo usuario
exports.create = function(req,res){
	if(!req.body.content)
		return res.status(400).send({message: "El usuario no puede ser nulo."});

	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	//validación del nombre de usuario
	User.findOne({'username':user.username}, function(err,personFound){
		if(err){
			console.log(err);
			return res.status(500).send({message: "Ha ocurrido un error al intentar crear el usuario."});
		}

		if(personFound){
			res.status(500).send({message: 'El nombre de usuario ya existe'});
		}else{
			user.save(function(err,data){
				if(err){
					console.log(err);
					res.status(500).send({message: "Ha ocurrido un error al intentar crear el usuario."});
				}else{
					res.send(data);
				}

			});
		}
	});

	
};

exports.authenticate = function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({'username':user.username}, function(err,user){
		if(err){
			console.log(err);
			return res.status(500).send({message: "Error al iniciar sesión."});
		}

		//autenticacion valida
		if(user && user.password === password){
			res.send(user);
		}else{ //error en la autenticacion
			res.status(500).send({message: "Nombre de usuario o contraseña incorrecto"});
		}

	};
};


//buscar todos los usuarios
/*
exports.findAll = function(req,res){
	User.find(function(err,users){
		if(err){
			console.log(err);
			res.status(500).send({message: "Ha ocurrido un error al intentar buscar los usuarios."});
		}else{
			res.send(users);
		}
	});
};*/


//encontrar un usuario por id
exports.findOne = function(req,res){
	User.findById(req.params.userId, function(err,user){
		if(err){
			console.log(err);
			if(err.kind == 'ObjectId'){
				return res.status(404).send({message: "Usuario no encontrado."});
			}

			return res.status(500).send({message: "Error al intentar buscar el usuario"});
		}

		if(!user){
			return res.status(400).send({message: "Usuario no encontrado."});
		}

		res.send(user);
	});
};


//actualizar un usuario
exports.update = function(req,res){
	User.findById(req.params.userId, function(err,user){
		if(err){
			console.log(err);
			if(err.kind == 'ObjectId'){
				return res.status(404).send({message: "Usuario no encontrado."});
			}

			return res.status(500).send({message: "Error al intentar buscar el usuario"});
		}

		if(!user){
			return res.status(400).send({message: "Usuario no encontrado."});
		}

		

		user.username = req.body.username;
		user.password: =req.body.password;
		user.models = req.body.models;

		user.save(function(err,data){
			if(err){
				console.log(err);
				res.status(500).send({message: "No se pudo actualizar el usuario."});
			}else{
				res.send(data);
			}

		});

		
	});
};

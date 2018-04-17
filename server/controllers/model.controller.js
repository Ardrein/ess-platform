var Indicator = require('../models/indicator.model');
var Model = require('../models/model.model');

//funcion para organizar el arreglo de indicadores de json a mongo
//@indicators arreglo de indicadores
//return Indicator Array
organizeIndicators = function(indicators){
	indicatorsMongo = [];
	for(i =0;i<indicators.length;i++0){
		indicator = new Indicator({
			_id: indicators[i]._id,
			name: indicators[i].name,
			label: indicators[i].label,
			formula:indicators[i].formula,
			formulaValue: indicators[i].formulaValues,
			type: indicators[i].valueType,
			subIndicators: organizeSubIndicators(indicators[i].subIndicators),
			variables: organizeVariables(indicators[i].variables)
		});
		indicatorsMongo.push(indicator);
	}

	return indicatorsMongo;
};

//funcion para organizar el arreglo de subindicadores de un indicador a un arreglo de tipo _id (ObjectId)
//@subIndicators arreglo de subindicadores de un indicador
//return ObjectId Array
organizeSubIndicators = function(subIndicators){
	subIndicatorsMongo = [];
	for(i=0;i<subIndicators.length;i++){
		subIndicatorsMongo.push(subIndicators[i]._id);
	}
	return subIndicatorsMongo;
};

//funcion para organizar el arreglo de variables de un indicador a un arreglo de tipo _id (ObjectId)
//@variables arreglo de variables de un indicador
//return ObjectId Array
organizeVariables = function(variables){
	variablesMongo =[];
	for(i=0;i<variables.length;i++){
		variablesMongo.push(variables[i]._id);
	}
	return variablesMongo;
}

//crear un nuevo modelo
exports.create = function(req,res){
	if(!req.body.content)
		return res.status(400).send({message: "El modelo no puede ser nulo."});

	var model = new Model({
		name: req.body.name,
		indicators: organizeIndicators(req.body.indicators),
		variables: req.body.variables
	});

	var user = req.user;

	user.models.push(model);

	user.save(function(err,data){
		if(err){
			console.log(err);
			res.status(500).send({message: "No se pudo crear el modelo."});
		}else{
			res.send(data);
		}

	});

};


//Actualizar un modelo por id
exports.update = function(req,res){
	if(!req.body.content)
		return res.status(400).send({message: "El modelo no puede ser nulo."});

	var user = req.user;

	var model = user.id(req.params.modelId);

	model.indicators = req.params.indicators;
	model.variables = req.params.variables;
	model.lastModified = Date.now;
	

	user.save(function(err,data){
		if(err){
			console.log(err);
			res.status(500).send({message: "No se pudo actualizar el modelo."});
		}else{
			res.send(data);
		}

	});
};

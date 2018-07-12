var ValuatedModel = require('../models/valuatedModel.model');
var ModelVersion = require('../models/modelVersion.model');
const async = require('async');
const mongoose = require('mongoose');

var exports = module.exports = {};

exports.create = function(req, res){
	if(!req.body){
		return res.status(400).send("Model data cannot be empty!");
	}

	var valuatedModel = req.body;
	
	ValuatedModel.findOne({ 'name': valuatedModel.name }, function(err, model){
		if(err){
			console.log(err);
			return res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
		}

		if(model){
			return res.status(400).send("The model name is already taken");
		}else{
			var newModel =  new ValuatedModel(valuatedModel);
			newModel.save()
			.then(result =>{
				res.send(result);
			})
			.catch(err =>{
				console.log(err);
				res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
			});
		}
	});
};


exports.getAll = function(req, res){
	ValuatedModel.find({})
	.then(models =>{
		ValuatedModel.populate(models,{
			path:'version',
			select: {'number':1 }
		})
		.then(result =>{
			async.waterfall([
				function(callback){
					replaceModelVariables(result,callback);
				},
				function(res, callback){
					replaceModelIndicators(res,callback);
				}
				],function(err, models){
					if(err){
						res.status(500).send({
							message: err.message || "Some error ocurred while retrieving Valuation Models."
						});
					}	
					res.send(models);
				});
		})
		.catch(err =>{
			console.log(err);
			res.status(500).send({
				message: err.message || "Some error ocurred while retrieving Valuation Models."
			});
		});
	})
	.catch(err =>{
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Valuation Models."
		});
	});
}

exports.delete = function(req, res){
	ValuatedModel.deleteOne({'_id': req.params._id})
	.then(result =>{
		res.send(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while deleting the model valuation."
		});
	});

};

exports.getAllVersion = function(req, res){
	ValuatedModel.find({ 'version': req.params._id}, {'name':1, 'valuatedVariables':1})
	.then(models =>{
		res.send(models);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while deleting the model valuation."
		});
	});
}

replaceModelIndicators = function(result, cb){
	async.times(result.length, function(n,next){
		let model = {};
		model._id = result[n]._id;
		model.version = result[n].version;
		model.name = result[n].name;
		model.dateOfCreation = result[n].dateOfCreation;
		model.valuatedVariables = result[n].valuatedVariables;
		model.valuatedIndicators = result[n].valuatedIndicators;

		findModelIndicators(model, function(err, model){
			next(err,model);
		});

	}, function(err, models){
		cb(err,models);
	});//end times
};

replaceModelVariables = function(result, cb){
	async.times(result.length, function(n,next){
		let model = {};
		model._id = result[n]._id;
		model.version = result[n].version;
		model.name = result[n].name;
		model.dateOfCreation = result[n].dateOfCreation;
		model.valuatedVariables = result[n].valuatedVariables;
		model.valuatedIndicators = result[n].valuatedIndicators;
		findModelVariables(model, function(err, model){
			next(err,model);
		});

	}, function(err, models){
		cb(err,models);
	});//end times
};

findModelVariables = function(model, callback){
	async.times(model.valuatedVariables.length, function(n, next){
		let valVar = {};
		valVar._id = model.valuatedVariables[n]._id;
		valVar.variable = model.valuatedVariables[n].variable;
		valVar.value = model.valuatedVariables[n].value;
		ModelVersion.findOne({'variables._id': valVar.variable},{'variables.$':1}, function(err, version){
			if(version)
				valVar.variable = version.variables[0];			
			next(err,valVar);
		});

	},function(err, variables){

		model.valuatedVariables = variables;
		callback(err,model);					
	});
};

findModelIndicators = function(model, callback){
	async.times(model.valuatedIndicators.length, function(n, next){
		let valIndic = {};
		valIndic._id = model.valuatedIndicators[n]._id;
		valIndic.indicator = model.valuatedIndicators[n].indicator;
		valIndic.value = model.valuatedIndicators[n].value;
		ModelVersion.findOne({'indicators._id': valIndic.indicator},{'indicators.$':1}, function(err, version){
			if(version)
				valIndic.indicator = version.indicators[0];			
			next(err,valIndic);
		});

	},function(err, indicators){

		model.valuatedIndicators = indicators;
		callback(err,model);					
	});
};


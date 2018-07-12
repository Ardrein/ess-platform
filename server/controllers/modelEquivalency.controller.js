var ModelEquivalency = require('../models/modelEquivalency.model');
var ModelVersion = require('../models/modelVersion.model');
const async = require('async');
const mongoose = require('mongoose');

var exports = module.exports = {};
exports.create = function(req, res){
	if(!req.body){
		return res.status(400).send("Model data cannot be empty!");
	}

	var modelEquivalency = req.body;

	ModelEquivalency.findOne({ 'name': modelEquivalency.name }, function(err, model){
		if(err){
			console.log(err);
			return res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
		}
		if(model){
			return res.status(400).send("The model equivalency's name is already taken!");
		}else{
			var newModel =  new ModelEquivalency(modelEquivalency);
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

exports.delete = function(req, res){
	ModelEquivalency.deleteOne({'_id': req.params._id})
	.then(result =>{
		res.send(result);
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while deleting the model equivalency."
		});
	});

};

exports.getAllFromVersion = function(req,res){
	ModelEquivalency.find({$or: [
		{'firstModel.version':req.params._id},
		{'secondModel.version':req.params._id} 
		]})
	.then(equivalencies =>{
		ModelEquivalency.populate(equivalencies,[
		{
			path: 'firstModel.version',
			select: {'number':1}
		},
		{
			path: 'secondModel.version',
			select: {'number':1}
		},
		{
			path: 'firstModel.concept',
			select: {'name':1}
		},
		{
			path: 'secondModel.concept',
			select: {'name':1}
		}
		])
		.then(popEquivalenciesVersions =>{
			async.times(popEquivalenciesVersions.length, function(n,next){
				findModelEquivalencyVariables(popEquivalenciesVersions[n],next);
			}, function(err,models){
				if(err){
					console.log(err);
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
				message: err.message || "Some error ocurred while retrieving Model Equivalencies."
			});
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Model Equivalencies."
		});
	});
};

exports.getAllFromUser = function(req, res){
	ModelEquivalency.find({})
	.then(equivalencies =>{
		ModelEquivalency.populate(equivalencies,[
		{
			path: 'firstModel.version',
			select: {'number':1}
		},
		{
			path: 'secondModel.version',
			select: {'number':1}
		}
		])
		.then(popEquivalenciesVersions =>{
			ModelEquivalency.populate(popEquivalenciesVersions,[
			{
				path: 'firstModel.concept',
				select: {'name':1}
			},
			{
				path: 'secondModel.concept',
				select: {'name':1}
			}
			]).then(populatedEquivalencies =>{
				async.times(populatedEquivalencies.length, function(n,next){
					findModelEquivalencyVariables(populatedEquivalencies[n],next);
				}, function(err,models){
					if(err){
						console.log(err);
						res.status(500).send({
							message: err.message || "Some error ocurred while retrieving Valuation Models."
						});
					}
					res.send(models);
				});
			}).catch(err =>{
				console.log(err);
				res.status(500).send({
					message: err.message || "Some error ocurred while retrieving Model Equivalencies."
				});
			});

		})
		.catch(err =>{
			console.log(err);
			res.status(500).send({
				message: err.message || "Some error ocurred while retrieving Model Equivalencies."
			});
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Model Equivalencies."
		});
	});
};


findModelEquivalencyVariables = function(model, cb){

	async.times(model.equivalencies.length, function(n, next){
		async.series([
			function(callback){
				findModelVariable(model.equivalencies[n].variableA, callback);
			},
			function(callback){
				findModelVariable(model.equivalencies[n].variableB, callback);
			},
			],function(err, results){
				let equivalency = {};
				equivalency.variableA = results[0];
				equivalency.variableB = results[1];
				next(err, equivalency);
			});

	},function(err, equivalencies){
		let modelEquivalencies = {};
		if(equivalencies){

			modelEquivalencies.name = model.name;
			modelEquivalencies.firstModel = model.firstModel;
			modelEquivalencies.secondModel = model.secondModel;
			modelEquivalencies.equivalencies = equivalencies;
		}
		cb(err,modelEquivalencies);
	});
};


findModelVariable = function(id, callback){
	ModelVersion.findOne({'variables._id': id},{'variables.$':1}, function(err, version){
		callback(err,version.variables[0]);
	});
};
var ConceptualModel = require('../models/conceptualModel.model');
var ModelVersion = require('../models/modelVersion.model');
const mongoose = require('mongoose');

var exports = module.exports = {};

exports.create = function(req, res){
	if(!req.body){
		return res.status(400).send("Model data cannot be empty!");
	}

	var conceptualModel = req.body;
	
	ConceptualModel.findOne({ 'name': conceptualModel.name }, function(err, model){
		if(err){
			console.log(err);
			return res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
		}

		if(model){
			ConceptualModel.populate(model, {
				path: 'versions',
				match: { 'number': conceptualModel.versions[0].number}
			})
			.then(modelC =>{
				if(modelC.versions.length == 0){
					let modelVersion = new ModelVersion(conceptualModel.versions[0]);

					saveModelVersion(model, modelVersion, res);
				}else{
					return res.status(400).send("The version number is already taken");
				}
			})
			.catch(error =>{
				res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
			});
		}else{
			var newModel =  new ConceptualModel();
			newModel.name = conceptualModel.name;

			let modelVersion = new ModelVersion(conceptualModel.versions[0]);
			saveModelVersion(newModel, modelVersion, res);
		}
	});
};

exports.getAll = function(req, res){
	ConceptualModel.find({})
	.then(models =>{
		ConceptualModel.populate(models,'versions')
		.then(result =>{
			ConceptualModel.populate(result, [
			{
				path: 'versions.variables.type',
				model: 'Type'
			},
			{
				path: 'versions.indicators.type',
				model: 'Type'
			}
			])
			.then(data =>{
				res.send(data);
			})
			.catch(err =>{
				res.status(500).send({
					message: err.message || "Some error ocurred while retrieving Models."
				});
			})
			
		})
		.catch(err =>{
			res.status(500).send({
				message: err.message || "Some error ocurred while retrieving Conceptual Models."
			});
		});
		
	})
	.catch(err =>{
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Conceptual Models."
		});
	});
};

exports.getAllPublic = function(req, res){
	ConceptualModel.find({})
	.then(models =>{
		ConceptualModel.populate(models,{
			path: 'versions',
			match: { 'state':1 }
		})
		.then(result =>{
			ConceptualModel.populate(result, [
			{
				path: 'versions.variables.type',
				model: 'Type'				
			},
			{
				path: 'versions.indicators.type',
				model: 'Type'
			}
			])
			.then(data =>{
				res.send(data);
			})
			.catch(err =>{
				res.status(500).send({
					message: err.message || "Some error ocurred while retrieving Models."
				});
			})
			
		})
		.catch(err =>{
			res.status(500).send({
				message: err.message || "Some error ocurred while retrieving Conceptual Models."
			});
		});
	})
	.catch(err =>{
		res.status(500).send({
			message: err.message || "Some error ocurred while retrieving Conceptual Models."
		});
	});
};

exports.changeModelState = function(req, res){
	ModelVersion.update({'_id':req.params._id},
		{ '$set': {'state': req.body.state }})
	.then( success =>{
		res.send(success);
	})
	.catch(err =>{
		res.status(500).send({
			message: err.message || "Some error ocurred while changing the model state."
		});
	});
};


exports.deleteVersion = function(req, res){
	ConceptualModel.update({'versions':req.params._id},
		{'$pull': { 'versions': req.params._id } })
	.then( success =>{
		ModelVersion.deleteOne({'_id': req.params._id})
		.then(result =>{
			res.send(result);
		})
		.catch(err =>{
			console.log(err);
			res.status(500).send({
				message: err.message || "Some error ocurred while deleting the model version."
			});
		});
	})
	.catch(err =>{
		console.log(err);
		res.status(500).send({
			message: err.message || "Some error ocurred while pulling the model version."
		});
	});
};




saveModelVersion = function(model,modelVersion, res){
	modelVersion.save()
	.then(data=>{
		model.versions.push(modelVersion._id);
		model.save()
		.then(result =>{
			ModelVersion.populate(modelVersion, [
			{
				path: 'variables.type',
				model: 'Type'
			},
			{
				path: 'indicators.type',
				model: 'Type'
			}
			])
			.then(data =>{
				res.send(data);
			})
			.catch(error =>{
				res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
			});
		})
		.catch(error =>{
			res.status(500).send("An unexpected error has ocurred and the model couldn't be saved.");
		});
	})
	.catch(error =>{
		console.log(error);
		res.status(400).send("An unexpected error has ocurred and the model's version couldn't be saved.");
	});
};

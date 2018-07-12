const express = require('express');
const router = express.Router();
const spreadsheet = require('./spreadsheet.routes');
const type = require('../controllers/type.controller');
const conceptualModel = require('../controllers/conceptualModel.controller');
const valuatedModel = require('../controllers/valuatedModel.controller');
const modelEquivalency = require('../controllers/modelEquivalency.controller');

//==================================Spreadsheet Routes==============================
router.get('/spreadsheet/:id', spreadsheet.openAndRead);


//==================================Type Routes==============================
router.get('/types', type.getAll);

//======================Conceptual Model Routes==============================


router.post('/modelConcepts/create', conceptualModel.create);
router.get('/modelConcepts/public', conceptualModel.getAllPublic);

//==================================User Routes==============================

//concepts
router.get('/user/models', conceptualModel.getAll);
router.put('/user/models/:_id', conceptualModel.changeModelState);
router.delete('/user/models/version/:_id', conceptualModel.deleteVersion);


//valuations
router.post('/user/models/valuation', valuatedModel.create);
router.get('/user/models/valuation', valuatedModel.getAll);
router.get('/user/models/valuation/:_id', valuatedModel.getAllVersion);
router.delete('/user/models/valuation/:_id',valuatedModel.delete);


//equivalencies
router.post('/user/models/equivalency/create', modelEquivalency.create);
router.get('/user/models/equivalency', modelEquivalency.getAllFromUser);
router.delete('/user/models/equivalency/:_id', modelEquivalency.delete);
router.get('/modelEquivalencies/version/:_id', modelEquivalency.getAllFromVersion);

module.exports = router;
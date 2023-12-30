var express = require('express');
const { requestAll, requestOne, create, update, remove } = require('../db/requests');
var router = express.Router();
const {body, validatorResult, validationResult} = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  requestAll('goals', req.auth.id, (err, goals) => {
    if(err){
      return next(err);
    }
    console.log(goals);
    res.send(goals);
  });
});

/* GET goals listing. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  requestOne('goals', id, (err, goal) => {
    if(err) {
      return next(err);
    }
    if(!goal.length){
      return res.sendStatus(404);
    }
    res.send(goal);
  });
});

/* POST users listing. */
router.post('/', 
body('details').isLength({min: 5}),
body('term').not().isEmpty(),
function(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const newGoal = req.body;
  create('goals', newGoal, (err, goal) => {
    if(err) {
      return next(err);
    }
    res.send(goal);
  });
});

/* PUT users listing. */
router.put('/:id', 
body('details').isLength({min: 5}),
body('term').not().isEmpty(),
function(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  const body = req.body;
  const id = req.params.id;
  if(body.id != id){
    return res.sendStatus(409); 
  }
  requestOne('goals', id, (err, goal) => {
    if(err) {
      return next(err);
    }
    if(!goal.length){
      return res.sendStatus(404);
    }
    update('goals', id, body, (err, updated) => {
      if(err) {
        return next(err);
      }
      res.send(updated);
   });
 });
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  requestOne('goals', id, (err, goal) => {
    if(err){
      return next(err);
    }
    if (!goal.length) {
      return res.sendStatus(404);
    }
    remove('goals', id, (err) => { 
      if(err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;

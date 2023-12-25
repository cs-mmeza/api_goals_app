var express = require('express');
var router = express.Router();

let goals = [
  {
        "id": "1",
        "detalles": "Correr por 30 minutos",
        "plazo": "día",
        "frecuencia": 1,
        "icono": "🏃‍♂️",
        "meta": 365,
        "fecha_límite": "2030-01-01",
        "completado": 5
      },
      {
        "id": "2",
        "detalles": "Leer libros",
        "plazo": "año",
        "frecuencia": 6,
        "icono": "📚",
        "meta": 12,
        "fecha_límite": "2030-01-01",
        "completado": 0
      },
      {
        "id": "3",
        "detalles": "Viajar a nuevos lugares",
        "plazo": "mes",
        "frecuencia": 1,
        "icono": "✈️",
        "meta": 60,
        "fecha_límite": "2030-01-01",
        "completado": 40
      }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(goals);
});

/* GET goals listing. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const goal = goals.find(item => item.id === id);
  if(!goal) {
    return res.sendStatus(404);
  }
  res.send(goal);
});

/* GET goals with id */
router.get('/:id', function(req, res, next) {
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  const goal = req.body;
  goals.push(goal);
  res.status(201);
  res.send(goal);
});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
  const goal = req.body;
  const id = req.params.id;
  
  if(goal.id !== id){
    return res.sendStatus(409);
  }
  const index = goals.findIndex(item => item.id === id);
  if (index === -1){
    return res.sendStatus(404);
  }
  goals[index] = goal;
  res.send(goal);
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const index = goals.findIndex(item => item.id === id);
  if(index === -1 ){
    res.sendStatus(404);
  }
  goals.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;

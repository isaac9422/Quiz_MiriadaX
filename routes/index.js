var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

//GET
router.get('/quices/question', quizControllers.question);

router.get('/quices/answer', quizControllers.answer);

/* GET credits page. */
router.get('/author', function(req, res, next) {
  res.render('author', { autor: 'Isaac Palacios González' });
});

module.exports = router;

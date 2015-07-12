var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizControllers.load);

//GET
router.get('/quices', quizControllers.index);
router.get('/quices/:quizId(\\d+)', quizControllers.show);
router.get('/quices/:quizId(\\d+)/answer', quizControllers.answer);

/* GET credits page. */
router.get('/author', function(req, res, next) {
  res.render('author', { autor: 'Isaac Palacios González' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');
var commentControllers = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.param('quizId', quizControllers.load);

//GET
router.get('/quices', quizControllers.index);
router.get('/quices/:quizId(\\d+)', quizControllers.show);
router.get('/quices/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quices/new', quizControllers.new);
router.post('/quices/create', quizControllers.create);
router.get('/quices/:quizId(\\d+)/edit', quizControllers.edit);
router.put('/quices/:quizId(\\d+)', quizControllers.update);
router.delete('/quices/:quizId(\\d+)', quizControllers.destroy);

router.get('/quices/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quices/:quizId(\\d+)/comments', commentControllers.create);

/* GET credits page. */
router.get('/author', function(req, res, next) {
  res.render('author', { autor: 'Isaac Palacios González', errors: []  });
});

module.exports = router;

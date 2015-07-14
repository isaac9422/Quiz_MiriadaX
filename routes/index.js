var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller');
var commentControllers = require('../controllers/comment_controller');
var sessionControllers = require('../controllers/session_controller');
var userControllers = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.param('quizId', quizControllers.load);
router.param('commentId', commentControllers.load);

router.get('/login', sessionControllers.new);
router.post('/login', sessionControllers.create);
router.get('/logout', sessionControllers.destroy);

//GET
router.get('/quices', quizControllers.index);
router.get('/quices/:quizId(\\d+)', quizControllers.show);
router.get('/quices/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quices/new', sessionControllers.loginRequired, quizControllers.new);
router.post('/quices/create', sessionControllers.loginRequired, quizControllers.create);
router.get('/quices/:quizId(\\d+)/edit', sessionControllers.loginRequired, quizControllers.edit);
router.put('/quices/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.update);
router.delete('/quices/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.destroy);

router.get('/quices/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quices/:quizId(\\d+)/comments', commentControllers.create);
router.get('/quices/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionControllers.loginRequired, commentControllers.publish);

/* GET credits page. */
router.get('/author', function(req, res, next) {
  res.render('author', { autor: 'Isaac Palacios González', errors: []  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './uploads/' });

const quizController = require('../controllers/quiz');
const tipController = require('../controllers/tip');
const userController = require('../controllers/user');
const sessionController = require('../controllers/session');
<<<<<<< HEAD
=======
const favouriteController = require('../controllers/favourite');
>>>>>>> practica6

//-----------------------------------------------------------

// autologout
router.all('*',sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

// History: Restoration routes.

// Redirection to the saved restoration route.
function redirectBack(req, res, next) {
    const url = req.session.backURL || "/";
    delete req.session.backURL;
    res.redirect(url);
}

router.get('/goback', redirectBack);

// Save the route that will be the current restoration route.
function saveBack(req, res, next) {
    req.session.backURL = req.url;
    next();
}

// Restoration routes are GET routes that do not end in:
//   /new, /edit, /play, /check, /session, or /:id.
router.get([
<<<<<<< HEAD
    '/',
    '/author',
    '/users',
    '/users/:id(\\d+)/quizzes',
    '/quizzes'], saveBack);
=======
'/','/author',
'/users',
'/users/:id(\\d+)/quizzes',
'/quizzes'],                 saveBack);
>>>>>>> practica6

//-----------------------------------------------------------

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Author page.
router.get('/author', (req, res, next) => {
    res.render('author');
});

router.get('/quizzes/randomplay',          quizController.randomplay);

router.get('/quizzes/randomcheck/:quizId(\\d+)', quizController.randomcheck);

// Autoload for routes using :quizId
router.param('quizId', quizController.load);
router.param('userId', userController.load);
router.param('tipId',  tipController.load);


// Routes for the resource /session
router.get('/session',    sessionController.new);     // login form
router.post('/session',   sessionController.create);  // create sesion
router.delete('/session', sessionController.destroy); // close sesion


// Routes for the resource /users
router.get('/users',
    sessionController.loginRequired,
	userController.index);
router.get('/users/:userId(\\d+)',
    sessionController.loginRequired,
	userController.show);
router.get('/users/new',
	userController.new);
router.post('/users',
	userController.create);
router.get('/users/:userId(\\d+)/edit',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
	userController.edit);
router.put('/users/:userId(\\d+)',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
	userController.update);
router.delete('/users/:userId(\\d+)',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
	userController.destroy);

<<<<<<< HEAD
=======

>>>>>>> practica6
router.get('/users/:userId(\\d+)/quizzes',
    sessionController.loginRequired,
    quizController.index);


// Routes for the resource /quizzes
<<<<<<< HEAD
router.get('/quizzes',
	quizController.index);
router.get('/quizzes/:quizId(\\d+)',
=======
router.get('/quizzes.:format?',
	quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',
>>>>>>> practica6
	quizController.show);
router.get('/quizzes/new',
    sessionController.loginRequired,
	quizController.new);
router.post('/quizzes',
    sessionController.loginRequired,
<<<<<<< HEAD
=======
    upload.single('image'),
>>>>>>> practica6
	quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
	quizController.edit);
router.put('/quizzes/:quizId(\\d+)',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
<<<<<<< HEAD
=======
    upload.single('image'),
>>>>>>> practica6
	quizController.update);
router.delete('/quizzes/:quizId(\\d+)',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
	quizController.destroy);

<<<<<<< HEAD
router.get('/quizzes/:quizId(\\d+)/play',  quizController.play);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
=======
router.get('/quizzes/:quizId(\\d+)/play',
	quizController.play);
router.get('/quizzes/:quizId(\\d+)/check',
	quizController.check);



router.post('/quizzes/:quizId(\\d+)/tips',     
    sessionController.loginRequired,
	tipController.create);
router.put('/quizzes/:quizId(\\d+)/tips/:tipId(\\d+)/accept',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
    tipController.accept);
router.delete('/quizzes/:quizId(\\d+)/tips/:tipId(\\d+)',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
    tipController.destroy);


// Routes for the resource favourites of a user
router.put('/users/:userId(\\d+)/favourites/:quizId(\\d+)',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
    favouriteController.add);
router.delete('/users/:userId(\\d+)/favourites/:quizId(\\d+)',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
    favouriteController.del);
>>>>>>> practica6



router.post('/quizzes/:quizId(\\d+)/tips',
    sessionController.loginRequired,
    tipController.create);
router.put('/quizzes/:quizId(\\d+)/tips/:tipId(\\d+)/accept',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
    tipController.accept);
router.delete('/quizzes/:quizId(\\d+)/tips/:tipId(\\d+)',
    sessionController.loginRequired,
    quizController.adminOrAuthorRequired,
    tipController.destroy);


module.exports = router;

const expres = require('express');
const router = expres.Router();
const verifyToken = require('../middleware/verifyToken');
const register = require('../controllers/registerControllers');
const login = require('../controllers/loginController');
const room = require('../controllers/roomController');
const game = require('../controllers/gameController');
const history = require('../controllers/historyController');

router.post('/register', register.register);
router.post('/login', login.login);
router.post('/room/create', verifyToken, room.createRoom);
router.post('/room/play', verifyToken, game.playGame);
router.get('/histories', verifyToken, history.showHistories);

module.exports = router;
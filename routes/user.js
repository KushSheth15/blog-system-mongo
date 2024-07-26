const {Router} = require('express');
const {getSignIn,getSignUp,postSignIn,postSignUp,getLogout} = require('../controllers/user-controller');
const router = Router();

router.get('/signin', getSignIn);
router.get('/signup', getSignUp);
router.post('/signin', postSignIn);
router.get('/logout', getLogout);
router.post('/signup', postSignUp);

module.exports = router;


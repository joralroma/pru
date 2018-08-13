const router = require('express').Router();
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: __dirname + '/../uploads/imgs/users'});

const md_auth = require('../middlewares/authenticated');
const controllerUser = require('../controllers/user');

router.post('/1', controllerUser.login);

router.post('/2', controllerUser.register);

router.post('/3', md_auth.ensureAuth, controllerUser.prueba);

router.post('/4/:id', [md_auth.ensureAuth, md_upload], controllerUser.uploadImg);

router.get('/5/:imageFile', controllerUser.getImageFile);

router.get('/6/:page?', controllerUser.pagination);

module.exports = router;
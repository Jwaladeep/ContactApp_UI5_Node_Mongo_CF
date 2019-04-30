const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const contactApp_controller = require('../controllers/contactApp.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', contactApp_controller.test);
router.post('/create', contactApp_controller.contactApp_create);
router.get('/:id', contactApp_controller.contactApp_details);
router.put('/update', contactApp_controller.contactApp_update);
router.put('/:id/update',contactApp_controller.contactApp_updateById);
router.delete('/:id/delete', contactApp_controller.contactApp_delete);
router.delete('/delete',contactApp_controller.contactApp_deleteMany);
router.get('/', contactApp_controller.contactApp_getAll);
module.exports = router;
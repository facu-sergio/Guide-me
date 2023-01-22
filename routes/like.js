const express = require("express");
const router = express.Router();
const like_controller = require('../controllers/like_controller');

router.post('/megusta',like_controller.saveMegusta);
router.get('/megustas',like_controller.getMegustas);
router.get('/userlike',like_controller.userLikes);
router.get('/deletelike',like_controller.deleteMegusta);
module.exports = router;
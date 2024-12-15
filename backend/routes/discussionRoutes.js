const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

router.post('/', discussionController.createDiscussion);
router.get('/', discussionController.getAllDiscussions);
router.get('/:id', discussionController.getDiscussionById);
// Rute untuk mendapatkan balasan dari sebuah diskusi
router.get('/:id/replies', discussionController.getRepliesForDiscussion);

// Rute untuk membuat balasan pada sebuah diskusi
router.post('/:id/replies', discussionController.createReply);

module.exports = router;

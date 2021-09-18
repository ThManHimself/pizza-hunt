const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');


// 'add comment' routes -- /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// 'delete comment' routes -- /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);


// exporting... ... ...
module.exports = router;
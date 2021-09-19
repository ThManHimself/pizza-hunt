const router = require('express').Router();
const { 
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');


// 'add comment' routes -- /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

// 'add reply' rountes -- /api/comments/:pizzaId/:commentId(this doesnt just add a reply, this deleted the comment with the reply and re-posts it with the new reply attatched)
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);


// 'delete comment' routes -- /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

// 'delete reply' routes -- /api/comments/:pizzaId/:commentId/:replyId
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);


// exporting... ... ...
module.exports = router;
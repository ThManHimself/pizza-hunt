const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) =>{
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                // if there is no pizza with targeted id, let'm know
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                } // else - show 'em the zaa
                res.json(dbPizzaData);
            })
            // Error? let'm know!
            .catch(err => res.json(err));
    },
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
                { _id: params.commentId },
                { $push: {replies: body } },
                { new: true }
            )
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    removeComment({ params }, res ) {
        // target a comment with its id and delete
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                // if no comment was deleted, let'm know!
                if (!deletedComment) {
                    return res.status(404).json({ messasge: 'No comment with this id!' });
                }
                // update the pizza the comment was associated with to remove the comment
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                // the updated comment (no longer with the comment that is targeted for deletion) is turned into JSON here
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
                { _id: params.commentId },
                { $pull: { replies: {replyId: params.replyId } } },
                { new: true }
            )
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
};

module.exports = commentController;
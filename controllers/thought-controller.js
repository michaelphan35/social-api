const { User, Thought } = require("../models");

const thoughtController = {

    
    createThought({ body }, res) {
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate({ _id: body.userId },{ $push: { thoughts: thoughtData._id } },{ new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res
                .status(404)
                .json({ message: "No user with the corresponding id!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    
    
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No thought with the corresponding id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No thought with the corresponding id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }).then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No thought with the corresponding id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },{ $addToSet: { reactions: body } },{ new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No thought with the corresponding id!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },{ $pull: { reactions: { reactionId: params.reactionId } } },{ new: true })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;
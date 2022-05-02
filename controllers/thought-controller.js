const { Thoughts, Users } = require('../models')

const thoughtController = {
    // add comment to pizza
    createThought({ params, body }, res) {
      Thoughts.create(body)
        .then(({ _id }) => {
          return Users.findOneAndUpdate(
            { _id: params.userId},
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbPThoughtsData => {
          console.log(dbPThoughtsData);
          if (!dbPThoughtsData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPThoughtsDat);
        })
        .catch(err => res.json(err)); 
    },

    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

    getThoughtsbyId({params}, res) {
        Thoughts.findOne({_id: params.id})
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this ID'})
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No thoughts found with this Id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },

      deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(dbThoughtsData => {
              if (!dbThoughtsData) {
                  res.status(404).json({message: 'No thoughts found with this Id'});
                  return;
              }
              res.json(dbThoughtsData)
          })
          .catch(err => res.status(400).json(err));
      },

      addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No Thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.status(400).json5(err));
      },

      removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
          { _id: params.thoughttId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then(dbPizzaData =>
            {
                if (!dbThoughtsData){
                    res.status(404).json({message: 'No Thoughts found with this id!'});
                    return;
                }
                 res.json(dbPizzaData)
                })
          .catch(err => res.json(err));
      }
    };
    
    module.exports = commentController;






const db = require("../models");

// Defining methods for the groupsController
module.exports = {
  findAll: function(req, res) {
    db.Group
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Group
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    // first create the group
    db.Group
      .create(req.body.groupData)
      .then(dbModel => {
        // then update the user's obj to say they're in the newly created group
        db.Users.findOneAndUpdate({
          _id: req.body.userId
        }, {
          inGroup: dbModel._id
        }).then(dbUser => {
          // probably just send back the group id
          res.json({ dbModel, dbUser })
        });
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Group
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Group
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

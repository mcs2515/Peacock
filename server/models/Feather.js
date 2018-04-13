const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let FeatherModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const FeatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

  favorite: {
    type: Boolean,
    default: false,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

FeatherSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  favorite: doc.favorite,
  imageUrl: doc.imageUrl,
});

FeatherSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return FeatherModel.find(search).select('name favorite imageUrl').exec(callback);
};

FeatherSchema.statics.delete = (ownerId, featherId, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: convertId(featherId),
  };

  return FeatherModel.findOneAndRemove(search, callback);
};

FeatherSchema.statics.favorite = (ownerId, featherId, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id: convertId(featherId),
  };

  return FeatherModel.findOne(search).exec(callback);
};

FeatherModel = mongoose.model('Feather', FeatherSchema);

module.exports.FeatherModel = FeatherModel;
module.exports.FeatherSchema = FeatherSchema;

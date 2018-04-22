const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let FeatherModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setOwnerName = ownerName => _.escape(ownerName).trim();

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

  ownerName: {
    type: String,
    required: true,
    trim: true,
    set: setOwnerName,
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

  public: {
    type: Boolean,
    default: false,
  },
});

FeatherSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  ownerName: doc.ownerName,
  favorite: doc.favorite,
  imageUrl: doc.imageUrl,
  public: doc.public,
});

FeatherSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return FeatherModel.find(search).select('name favorite imageUrl public').exec(callback);
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

FeatherSchema.statics.getSharedFeathers = (callback) => {
  const search = {
    public: true,
  };
  return FeatherModel.find(search).select('name imageUrl ownerName').exec(callback);
};

FeatherModel = mongoose.model('Feather', FeatherSchema);

module.exports.FeatherModel = FeatherModel;
module.exports.FeatherSchema = FeatherSchema;

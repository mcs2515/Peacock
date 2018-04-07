const models = require('../models');
const Feather = models.Feather;

const makerPage = (req, res) => {
  Feather.FeatherModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), feathers: docs });
  });
};

const makeFeather = (req, res) => {
//	console.log("name: " + req.body.name);
//	console.log("url: " + req.body.imageUrl);

  if (!req.body.name || !req.body.imageUrl) {
    console.log('feather make issue');
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  const featherData = {
    name: req.body.name,
    favorite: req.body.favorite,
    imageUrl: req.body.imageUrl,
    owner: req.session.account._id,
  };

  const newFeather = new Feather.FeatherModel(featherData);
  const featherPromise = newFeather.save();

  featherPromise.then(() => res.json({ redirect: '/maker' }));

  featherPromise.catch((err) => {
    console.log(err);
  });

  console.log('feather made');
  return featherPromise;
};

const getFeathers = (request, response) => {
  const req = request;
  const res = response;

  return Feather.FeatherModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);

      return res.status(400).json({ error: 'An error occured.' });
    }

    return res.json({ feathers: docs });
  });
};

const deleteFeather = (request, response) => {
  const req = request;
  const res = response;

  return Feather.FeatherModel.deleteFeather(req.session.account._id, req.body.feather_id, (err) => {
    if (err) {
      console.log(err);

      return res.status(400).json({ error: 'An error occured.' });
    }

    // random return value
    return res.json({ success: 'true' });
  });
};

module.exports.makerPage = makerPage;
module.exports.getFeathers = getFeathers;
module.exports.make = makeFeather;
module.exports.delete = deleteFeather;

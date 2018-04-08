const models = require('../models');
const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    console.log('login issue');
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }
    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'RAWR! Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const getPassword = (req, res) => {
  const password = req.session.account.password;
  return res.json({ username: `${password}` });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  req.body.oldPass = `${req.body.oldPass}`;
  req.body.newPass = `${req.body.newPass}`;
  req.body.newPass2 = `${req.body.newPass2}`;

	console.log(req.body.newPass);
	console.log(req.body.newPass2);
	
  if (req.body.newPass !== req.body.newPass2) {
    return res.status(400).json({ error: 'RAWR! New passwords do not match' });
  }

  const username = req.session.account.username;
	
  return Account.AccountModel.authenticate(username, req.body.oldPass, (error, account) => {
    if (error || !account) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
		
		// make new account, set to old account
		const newAccount = account;

		return Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
			newAccount.password = hash;
			newAccount.salt = salt;

			const savePromise = newAccount.save();

			savePromise.then(() => res.json({
				password: newAccount.password,
			}));

			savePromise.catch((err) => {
				res.json(err);
			});

			return res.json({ redirect: '/logout' });
		});
	});
};

const settingsPage = (req, res) => {
  res.render('settings', { csrfToken: req.csrfToken() });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};


module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
module.exports.settingsPage = settingsPage;
module.exports.changePassword = changePassword;

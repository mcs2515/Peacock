const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getFeathers', mid.requiresLogin, controllers.Feather.getFeathers);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/account', mid.requiresLogin, controllers.Account.accountPage);
  app.get('/maker', mid.requiresLogin, controllers.Feather.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Feather.make);
  //app.post('/imageRoute', mid.requiresLogin, controllers.Feather.processImg);
  app.get('/gallery', mid.requiresLogin, controllers.Account.galleryPage);
  app.get('/getSharedFeathers', mid.requiresLogin, controllers.Feather.findSharedFeathers);
  app.post('/filtered', mid.requiresLogin, controllers.Feather.findFiltered);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  app.post('/favorite', mid.requiresLogin, controllers.Feather.toggleFavorite);
  app.post('/share', mid.requiresLogin, controllers.Feather.togglePrivacy);
  app.get('/about', mid.requiresSecure, controllers.Account.aboutPage);
  app.post('/delete', mid.requiresLogin, controllers.Feather.delete);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', mid.requiresLogin, controllers.Feather.makerPage);
};

module.exports = router;

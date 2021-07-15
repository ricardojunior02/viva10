const express = require('express');
require('dotenv').config();
require('./database')();
const { flash } = require('express-flash-message');
const session = require('express-session');
const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const authenticate = require('./middlewares/authenticate');
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
}));
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', async (request, response) => {
  const messagesSuccess = await request.consumeFlash('success');
  const messagesError = await request.consumeFlash('error');
  return response.render('login.ejs', { messagesSuccess, messagesError })
});

app.get('/create-account', async (request, response) => {
  const messagesSuccess = await request.consumeFlash('success');
  const messagesError = await request.consumeFlash('error');
  return response.render('create-account.ejs', { messagesSuccess, messagesError })
});

app.get('/usuario/:id', authenticate, userController.index);
app.post('/create-user', userController.store);
app.post('/delete-user', authenticate, userController.delete);
app.post('/update-user', authenticate, userController.update);

app.post('/session', sessionController.store);

app.listen(process.env.NODE_PORT, console.log(`Server is running at http://localhost:${process.env.NODE_PORT}`));
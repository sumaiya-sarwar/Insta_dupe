const express = require('express');
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");

require('./config/db.connection');
require('dotenv').config();

const userController = require('./controllers/user_controller');
const mainController = require('./controllers/main_controller');
const imageController = require('./controllers/image_controller')

const app = express();
const PORT = 4000;
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: '8675309',
    resave: false,
    saveUninitialzed: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, //2 weeks
    }
}))

app.use('', userController);
app.use('/', mainController);
app.use('/', imageController);

// app.get('/*', (req, res) => {
//     res.render('404.ejs')
// })

app.listen(PORT, () => console.log('starting server at port:', PORT));

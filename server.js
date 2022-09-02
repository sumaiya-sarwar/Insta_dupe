const express = require('express');
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

require('./config/db.connection');
require('dotenv').config();

const userController = require('./controllers/user_controller');
const mainController = require('./controllers/main_controller');
const authController = require('./controllers/auth_controller')
const commentsController = require('./controllers/comments_controller')

const app = express();
const PORT = 4000;
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());



app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: '8675309',
    resave: false,
    saveUninitialzed: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, //2 weeks
    }
}))



app.use('/user', userController);
app.use('/main', mainController);
app.use('', authController);
app.use('/comments', commentsController);

// wildcard route
app.route('/*', (req, res) => {
    res.render('404.ejs')
})




app.listen(PORT, () => console.log('starting server at port:', PORT));
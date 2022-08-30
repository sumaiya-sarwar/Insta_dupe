const express = require('express');
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");

const bcrypt = require('bcrypt')

require('./config/db.connection');
require('dotenv').config();

const userController = require('./controllers/user_controller');
const mainController = require('./controllers/main_controller');
const authController = require('./controllers/auth_controller')

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
app.use('/', userController);

// app.get('/*', (req, res) => {
//     res.render('404.ejs')
// })


//login/signup
const router = express.Router();
router.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.post('/home', (req, res) => {

})

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

app.post('/signup', async (req, res) => {
    try {
        const hPass = await bcrypt.hash(req.body.password, 8)
        users.push({
           username: req.body.username,
            name: req.body.name,
            password: hPass
        })
        res.redirect('/home')
    } catch {
        res.redirect('/signup')
    }
    
})

app.listen(PORT, () => console.log('starting server at port:', PORT));

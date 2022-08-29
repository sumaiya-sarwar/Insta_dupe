const express = require('express'); // commonJS import statement
const methodOverride = require('method-override');
require('./config/db.connection');

const app = express();
const PORT = 4000;
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/*', (req, res) => {
    res.render('404.ejs')
})

app.listen(PORT, () => console.log('starting server at port:', PORT));
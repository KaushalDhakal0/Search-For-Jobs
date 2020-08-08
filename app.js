const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


const path = require('path');
const db = require('./config/database');




//const db = require(path.join(__dirname, ));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//handlebars
// var hbs = exphbs.create({
//     defaultLayout: 'main',
//     extname: '.html',    
//     helpers: handlebarsHelpers,
// });


//set static folder

app.use(express.static(path.join(__dirname, 'public')));

//testing databsae

 db.authenticate()
     .then(()=> console.log('Database Connected'))
     .catch(err=> console.log('Err:' + err));


//job routes

app.engine('handlebars', exphbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use('/jobs', require('./routes/job'));




app.get('/', (req, res)=>{

    res.render('index', {layout: 'landing' });
    
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port:${PORT} `);
});
const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

// hbs template configurations
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (title) => {
    return title.toUpperCase();
});

// Set view engine
app.set('view engine', 'hbs');

// Middleware Functions
app.use(express.static(__dirname + '/public'));    // Middleware functions(Interceptors), they are executed in the sequence in which they are defined
app.use((req,res, next) => {
    var currentTime = new Date().toString();
    console.log(`${currentTime}: ${req.method} ${req.url}`);
    next();
});
/*app.use((req, res, next) => {
    res.render('maintainance.hbs');
});*/
app.use((req, res, next) => {
   console.log("2nd middleware");
   next();
});

// Handlers
app.get('/', (req, res) => {
     /*res.send({                 // Here if we pass object as an argument, express automatically changes content-type to application/json. By default its text/html
         name: 'Sumiran'
     });*/
     res.render('home.hbs', {                    // By default, express looks in the views directory at reoot level for template files
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {                    // By default, express looks in the views directory at reoot level for template files
        pageTitle: 'About Page'
    });
});

app.listen(port, () => {
   console.log(`server listening on port: ${port}`)
});
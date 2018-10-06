const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();
const port = process.env.PORT || 3000;

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.path}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log(err.message);
        }
    });
    next();
})


// app.use( (req,res,next) => {
//     res.render('maintainence.hbs');
// })


app.use(express.static(__dirname+'/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
    res.render('home.hbs',{
        welcomeMessage : "Welcome to my website!",
        pageTitle : 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle : 'About Page'
    });
})



app.get('/bad' ,(req, res) => {
    res.send({
        errorMessage : 'Unable to fulfill this request'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});
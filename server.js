const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Setting an environment variable

handlebars.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public')); // read from an static directory

app.use((request, responde, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`;
    
    fs.appendFile('server.log', log + '\n', error => {
        if(error){
            console.log('Unable to append to server.log');
        }
    })
    console.log(log);
    next(); // if next is not called, the middlewares will never be triggered
});

handlebars.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return 'test';
});
handlebars.registerHelper('screamIt', text => {
    return text.toUpperCase();
})

app.get('/', (request, response) => {
    // response.send('<h2>Hello express!</h2>');
    // response.send({
    //     name: 'Anne',
    //     hobbies: [
    //         'Reading',
    //         'Travelling'
    //     ]
    // })
    response.render('home.hbs', {
        pageTitle: 'About page',
        welcomeMessage: 'A message from home page!!'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page',
        welcomeMessage: 'A message from about page!!'
    })
});

// app.use((request, response, next) => {
//     response.render('maintance.hbs');
// });
app.use(express.static(__dirname + '/public'))

app.get('/bad', (request, response) => {
    response.send({
        error: 'Error handleling this request'
    });
});

app.listen(port, () => {
    console.log(`Server it's up on port ${port}`);
});
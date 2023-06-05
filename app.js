const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

// code here for adding static assets
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => { 
 res.render('bmi');
});

app.post('/', (req, res) => {

    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    
    // Calculate BMI
    const result = (weight / ((height/100) ** 2)).toFixed(1);

    res.render('bmi', { age, weight, height, result });

});

app.listen(3000, () => { 
 console.log('The application is running on localhost:3000!') 
});

// A 404 Not found page
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
  });
  
app.use((err, req, res, next) => {
    res.send("Requested page not found " + err.status);
});

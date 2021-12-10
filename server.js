const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const {APIRouter} = require('./server/routes/apiRouter');

require('./server/config/database');

const app = express();

app.use(express.static(path.join(__dirname,"survey-app/dist/survey-app")));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized:true,
    cookie:{maxAge: 60000 *100}
}));

app.use('/api', APIRouter);
app.use('*', function(request,response){
    response.sendFile(path.resolve('./survey-app/dist/survey-app/index.html'));
})

app.listen(8080, function(){
    console.log("The server is running in port 8080.");
})
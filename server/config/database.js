const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/survey_db', { useNewUrlParser: true });

/**
 * If the connection throws an error
 */

mongoose.connection.on('error', err=>{
    console.log(`Mongoose default connection error: "${err}`);
    process.exit(0);
});

/**
 * When the connection is disconnected
 */
mongoose.connection.on('disconnected', ()=>{
    console.log("Mongoose default connection disconnected");
});
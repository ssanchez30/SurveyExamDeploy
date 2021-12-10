const express = require('express');
const {APIController} = require('./../controllers/apiController');
const APIRouter = express.Router();

APIRouter
    .route('/users')
    .get(APIController.getAllUsers )
    .post(APIController.addNewUser);

APIRouter
    .delete('/users/delete/:userName', APIController.deleteUser);

APIRouter
    .put('/users/update/:userName', APIController.updateUser);

APIRouter
    .put('/users/updatedVote/:_id', APIController.updateVotes);
    

APIRouter
    .post('/users/login', APIController.loginUser);

APIRouter
    .get('/users/validate', APIController.validateUser);

APIRouter
    .post('/users/addSurvey', APIController.addNewSurvey)

APIRouter
    .get('/users/logout', APIController.userLogout);

APIRouter
    .get('/users/find/:_id', APIController.findSurvey);

APIRouter
    .delete('/users/deleteSurvey/:_id', APIController.deleteSurvey);
    
module.exports={APIRouter};
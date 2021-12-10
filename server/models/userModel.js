const mongoose = require('mongoose');
const { SurveySchema, SurveyModel } = require('./surveyModel');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    surveys: [SurveySchema]
});

const User = mongoose.model('users', UserSchema)

const UserModel = {
    createUser: function (newUser) {
        return User.create(newUser)
    },
    getUsers: function () {
        return User.find();
    },
    getUserById: function (userName) {
        return User.findOne({userName })
    },
    updateUserSurvey: function (_id, newSurvey) {
        return SurveyModel.addSurvey(newSurvey)
            .then(result => {
                return User.findByIdAndUpdate({ _id: _id }, { $push: { surveys: result } });
            });

    },
    deleteUserSurvey:function (idUser, idSurvey){
        return SurveyModel.findSurveyByID(idSurvey)
            .then(result =>{
                return User.findByIdAndUpdate({_id:idUser},{$pull: {surveys:result}});
            })
    },
    deleteUserById: function (userName) {
        return User.remove({ userName });
    },
    updateUser: function (userName, userToUpdate) {
        return User.findOneAndUpdate({ email }, { $set: userToUpdate }, { new: true })
    }
};


module.exports = { UserModel };

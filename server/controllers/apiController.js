const { UserModel } = require('./../models/userModel');
const { SurveyModel } = require('./../models/surveyModel');
const bcrypt = require('bcrypt');

const APIController = {
    getAllUsers: function (request, response) {
        UserModel.getUsers()
            .then(users => {
                let userWithoudPassword = users.map(user => {
                    return {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName,
                        surveys: user.surveys
                    }
                })
                response.status(200).json(userWithoudPassword);
            });
    },
    deleteSurvey: function (request, response) {
        let _idSurvey = request.params._id;
        let _idUser = request.session._id;
        console.log("idSurvey en controller: ", _idSurvey)
        console.log("idUser en controller: ", _idUser)

        UserModel
            .deleteUserSurvey(_idUser, _idSurvey)
            .then(result => {
                response.status(204).end();
            });


    },
    deleteUser: function (request, response) {
        let userName = request.params.userName;
        UserModel
            .getUserById(userName)
            .then(user => {
                if (user === null) {
                    throw new Error("That user doesnt exist");
                } else {
                    UserModel
                        .deleteUserById(userName)
                        .then(result => {
                            response.status(204).end();
                        });

                }
            })
            .catch(error => {
                response.statusMessage = error.message;
                response.status(404).end()
            })
    },
    findSurvey: function (request, response) {
        let _id = request.params._id;
        console.log("_id", _id)
        SurveyModel
            .findSurveyByID(_id)
            .then(survey => {
                let surveyToSend =
                {
                    _id: survey._id,
                    question: survey.question,
                    option1: survey.option1,
                    option2: survey.option2,
                    option3: survey.option3,
                    option4: survey.option4,
                    voteQ1: survey.voteQ1,
                    voteQ2: survey.voteQ2,
                    voteQ3: survey.voteQ3,
                    voteQ4: survey.voteQ4,
                    createdAt: survey.createdAt
                }

                response.status(200).json(surveyToSend);
            });

    },
    addNewUser: function (request, response) {

        let { firstName, lastName, userName, password, confpass } = request.body;

        if (firstName && lastName && userName && password && confpass && password === confpass) {

            bcrypt.hash(password, 10)
                .then(encryptedPassword => {

                    let newUser = {
                        firstName,
                        lastName,
                        userName,
                        password: encryptedPassword

                    }
                    console.log("New User created: ", newUser)

                    UserModel
                        .createUser(newUser)
                        .then(user => {
                            console.log("user creado", user)
                            response.status(201).json(user);
                        })


                });

        } else {

            response.statusMessage = "You are missing a field to create a new user ('userName', 'lastName', 'firstName', 'password')";
            response.status(406).end();

        }
    },
    updateVotes: function (request, response) {
        let _id = request.params._id;
        let opcion = request.body.opcion;
        //  console.log("req.body, ",request.body)

        var balance=0;

        console.log("_idController", _id, "controlleroptionVoted", opcion)

        //console.log("_id in controller", _id)
        SurveyModel.findSurveyByID(_id)
            .then(currentSurvey => {
                console.log("current survey controlller: ", currentSurvey)
                balance = currentSurvey.opcion + 1
                console.log("balance: ", balance)
            })


        SurveyModel
            .optionToUpdate(_id, opcion, balance)
            .then(result => {
                console.log("result then", result)
                response.status(202).json(result);
            })


    },
    updateUser: function (request, response) {
        let { firstName, lastName, password } = request.body;
        let userName = request.params.userName;

        let fieldsToUpdate = {}

        if (firstName) {
            fieldsToUpdate.firstName = firstName;
        }

        if (lastName) {
            fieldsToUpdate.lastName = lastName;
        }

        if (password) {
            // hacer encryptacion de clave
            fieldsToUpdate.password = password;
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            response.statusMessage = "You need to provided at least one of the following fields to update the user ('userName', 'lastName', 'firstName', 'password')";
            response.status(406).end();
        } else {
            UserModel
                .getUserById(userName)
                .then(user => {
                    if (user === null) {
                        throw new Error("That user doesnt exist")
                    } else {
                        UserModel
                            .updateUser(userName, fieldsToUpdate)
                            .then(result => {
                                response.status(202).json(result);
                            })
                    }
                })
                .catch(error => {
                    response.statusMessage = error.message;
                    response.status(404).end();
                })

        }

    },
    loginUser: function (request, response) {
        let userName = request.body.loginUsername;
        let password = request.body.loginPassword;

        UserModel
            .getUserById(userName)
            .then(result => {

                if (result === null) {
                    throw new Error("That user doesnt exist!");
                }

                console.log("result", result)
                bcrypt.compare(password, result.password)
                    .then(flag => {
                        console.log(flag);
                        if (!flag) {
                            throw new Error("Wrong credentials!");
                        }

                        request.session.firstName = result.firstName;
                        request.session.lastName = result.lastName;
                        request.session.userName = result.userName;
                        request.session._id = result._id;


                        let currentUser = {
                            firstName: result.firstName,
                            lastName: result.lastName,
                            userName: result.userName
                        }
                        response.status(200).json(currentUser);
                    })

                    .catch(error => {

                        response.statusMessage = error.message;
                        response.status(406).end();
                    });

            })
            .catch(error => {
                response.statusMessage = error.message;
                response.status(404).end();
            });

    },
    validateUser: function (request, response) {
        console.log("la session:", request.session);

        if (request.session.userName && request.session.firstName && request.session.lastName) {

            let currentUser = {
                firstName: request.session.firstName,
                lastName: request.session.lastName,
                userName: request.session.userName,
                _id: request.session._id
            }

            response.status(200).json(currentUser);
        } else {
            response.statusMessage = "You need to login!";
            response.status(406).end();
        }
    },
    addNewSurvey: function (request, response) {

        let question = request.body.question;
        let option1 = request.body.option1;
        let option2 = request.body.option2;
        let option3 = request.body.option3;
        let option4 = request.body.option4;
        let voteQ1 = 0;
        let voteQ2 = 0;
        let voteQ3 = 0;
        let voteQ4 = 0;
        let createdAt = Date.now();
        let userName = request.session.userName;


        if (question.length >= 8 && option1.length >= 3 && option2.length >= 3 &&
            option3.length >= 3 && option4.length >= 3) {

            UserModel
                .getUserById(userName)
                .then(userResult => {
                    let newSurvey = {
                        question,
                        option1,
                        option2,
                        option3,
                        option4,
                        voteQ1,
                        voteQ2,
                        voteQ3,
                        voteQ4,
                        createdAt
                    };

                    UserModel
                        .updateUserSurvey(userResult._id, newSurvey)
                        .then(result => {
                            response.status(201).json(result);
                        });
                });


        } else {


            response.statusMessage = "All fields are required and question with minimum 8 characters and options with minimum 3 characters.";
            response.status(411).end();
        }

    },
    userLogout: function (request, response) {
        request.session.destroy();
        response.status(200).json({ message: "Successfully destroy session" });
    }

}

module.exports = { APIController };
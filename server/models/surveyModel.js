const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    voteQ1:{
        type:Number
    },
    voteQ2:{
        type:Number
    },
    voteQ3:{
        type:Number
    },
    voteQ4:{
        type:Number
    },
    createdAt:{
        type: Date
    }

});

const Survey = mongoose.model('surveys', SurveySchema);

const SurveyModel={
    addSurvey: function(newSurvey){
        return Survey.create(newSurvey)
    },
    findSurveyByID:function(_id){
        return Survey.findById(_id)
    },
    deleteSurveyByID:function(_id){
        console.log("en el model ",_id)
        return Survey.findByIdAndDelete(_id)
    },
    optionToUpdate:function(_id, opcion, balance){
        console.log("_id", _id, "option", opcion, "balance", balance)
       
        //return Survey.findByIdAndUpdate({_id},{$set:{voteQ1:balance}});
        if (opcion ==='voteQ1'){
        return Survey.findByIdAndUpdate({_id},{$inc:{voteQ1:1}});
        }else if( opcion ==='voteQ2'){
            return Survey.findByIdAndUpdate({_id},{$inc:{voteQ2:1}});

        }else if (opcion ==='voteQ3'){
            return Survey.findByIdAndUpdate({_id},{$inc:{voteQ3:1}});
        }else{
            return Survey.findByIdAndUpdate({_id},{$inc:{voteQ4:1}});
        }
        

    }
}

module.exports ={
    SurveySchema,
    SurveyModel
};
const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    username:{type:String, required:true},
    address:{type:String, required:false},
    city:{type:String, required:false},
    favorites:[{type:String, required:false, enum:{
        values:['GARDEN', 'COOKING', 'ELECTRONICS','MULTIMEDIA'],
        message:'{VALUE} is not supported'
    }}]
})


const User = model('User', userSchema);

module.exports = User;
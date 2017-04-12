
var mongoose = require('mongoose');

var OptionSchema= new mongoose.Schema({
    option: {
        type:String,
        required:[true, "option is required"],
        minlength: 3,
        trim:true,
        },
    votes: {type:Number, default:0},
    },{timestamps:true});

var PollSchema= new mongoose.Schema({
    name: String,
    question:{
        type:String,
        required:[true, "question is required"],
        minlength: 8,
        trim: true,
        },
    option:[OptionSchema],
    },{timestamps:true});

mongoose.model('Poll', PollSchema)
mongoose.model('Option', OptionSchema)

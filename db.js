const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Review = new mongoose.Schema({
    brand:{type:String, required: true},
    FoundationName: {type:String, required: true},
    skintype:{type:String, required: true},
    review:{type:String, required: true},
})

const Foundation = new mongoose.Schema({
  brand:{type:String, required: true},
  FoundationName: {type:String, required: true, unique: true,uniqueCaseInsensitive: true},
  SuitableSkin:{type:String, required: true},
})

// Apply the uniqueValidator plugin to userSchema.
Foundation.plugin(uniqueValidator);

mongoose.model('Review', Review);
mongoose.model('Foundation', Foundation)




const uri = "mongodb+srv://yanni_chen:Cyn03222000@final-project.a836y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongooseOpts = {
  useNewUrlParser: true,  
  useUnifiedTopology: true
};

mongoose.connect(uri, mongooseOpts, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to database'); 
  }
});




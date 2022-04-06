const mongoose = require('mongoose'),
URLSlugs = require('mongoose-url-slugs'),
passportLocalMongoose = require('passport-local-mongoose');

/*
const User = new mongoose.Schema({
  // username, password
  Dry_oil:{type:String, required: true},
  Sensitive_nonSensitive: {type:String, required: true},
});

const type = new mongoose.Schema({
	skin_type: {type: String, required: true},
	key_word: [{type: mongoose.Schema.Types.ObjectId, required: true}],
	
});


const Foundation = new mongoose.Schema({
  name: {type: String, required: true},
  brand: {type: String, required: true},
  character : [{type: mongoose.Schema.Types.ObjectId, required: true}],
});

const Characteristic = new mongoose.Schema({

	character: [{type: mongoose.Schema.Types.ObjectId, required: true}],
});

const Requirement = new mongoose.Schema({
	username: {type: String, ref: "user"},
	occasion: {type: String, required: true},
	season : [{type: String, required: true}],
  });
*/
  const Review = new mongoose.Schema({
    brand:{type:String, required: true},
    FoundationName: {type:String, required: true},
    skintype:{type:String, required: true},
    review:{type:String, required: true},
  })
  mongoose.model('Review', Review);
/*
mongoose.model('User', User);
mongoose.model('Type', type);
mongoose.model('Foundation', Foundation);
mongoose.model('Characteristic', Characteristic);
mongoose.model('Requirement', Requirement);
*/
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


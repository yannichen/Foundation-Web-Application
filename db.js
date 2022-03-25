const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  // username, password
  face_condition:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'type' }]
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
	username: {type: String, ref: "User"},
	occasion: {type: String, required: true},
	season : [{type: String, required: true}],
  });


User.plugin(passportLocalMongoose);
List.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Type', type);
mongoose.model('Foundation', Foundation);
mongoose.model('Characteristic', Characteristic);
mongoose.model('Requirement', Requirement);


mongoose.connect('mongodb://localhost/foundationdb');


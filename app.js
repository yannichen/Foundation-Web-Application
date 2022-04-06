require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
//const User = mongoose.model('user');
const router = express.Router();

const Review = mongoose.model('Review');
const app = express();

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// enable sessions
//const session = require('express-session');
//const passport = require('passport');
//const sessionOptions = {
   // secret: 'secret cookie thang (store this elsewhere!)',
   // resave: true,
    //  saveUninitialized: true
//};
//app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// passport setup
//app.use(passport.initialize());
//app.use(passport.session());

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', router);

app.get('/', (req, res) => {

	const query = {};
	if(req.query.brand){
		query.brand = req.query.brand;
	}
	if(req.query.foundationName){
		query.foundationName = req.query.foundationName;
	}



Review.find(query, (err, reviews) => {
		res.render('foundation', {reviews});
	});
	
}); 

app.post('/', (req, res) => {
  const review = new Review({
    brand: req.body.brand,
    FoundationName: req.body.FoundationName,
    skintype: req.body.skintype,
    review: req.body.review
  });
  console.log(review);
	review.save(function(err, savedReview){
		if (err){
			console.log('error');
		}
		else{
			res.redirect('/');
		}
		
	});
  
});



app.listen(process.env.PORT || 3000)

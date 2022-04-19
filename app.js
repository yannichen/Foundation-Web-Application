require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const router = express.Router();

const Review = mongoose.model('Review');
const Foundation = mongoose.model('Foundation')
const app = express();

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


//add or find review here
app.use('/', router);
app.get('/foundation',(req, res) => {
	res.redirect('/');
});
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
	review.save(function(err, savedReview){
		if (err){
			console.log('error');
		}
		else{
			res.redirect('/');
		}
		
	});
  
});



//add foundation to list 

app.get('/list', (req, res) => {
	const query = {};
	if(req.query.SuitableSkin){
		query.SuitableSkin = req.query.SuitableSkin;
	}
	Foundation.find(query, (err, foundations) => {
		res.render('list', {foundations});

	});
	
}); 

app.post('/list', (req, res) => {
  	const foundation = new Foundation({
   		brand: req.body.brand,
    	FoundationName: req.body.FoundationName,
		SuitableSkin:req.body.SuitableSkin
 	});
  	console.log(foundation)

	foundation.save(function(err, savedfoundation){
		if (err){
			console.log('error');
		}
		else{
			res.redirect('/list');
		}
		
	});
  
});

//test your skin here

app.listen(process.env.PORT || 3000)



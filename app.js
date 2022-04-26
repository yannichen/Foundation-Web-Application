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
	if(req.query.FoundationName){
		query.FoundationName = req.query.FoundationName;
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

//page for error message in DOM
app.get('/dup', (req, res) => {
	res.render('dup');

	
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
			res.redirect('/dup');
			console.log('error');

		}
			
		else{
			res.redirect('/list');
		}
		
	});
  
});


//test your skin here
app.get('/test', (req, res) => {
	const skinArray = [];
	const skinArray2 = [];
	let skin;
	skinArray[0] = parseInt(req.query.tightness);
	skinArray[1] = parseInt(req.query.shine);
	skinArray[2] = parseInt(req.query.tzone);
	//first use any of these built-in higher order functions
	const initial = 0;
	const sum = skinArray.reduce(
		(previous, current) => previous + current,
		initial
	  );
	console.log(sum);

	skinArray2[0] = parseInt(req.query.shine);
	skinArray2[1] = parseInt(req.query.tzone);
	//second use any of these built-in higher order functions
	const check = skinArray2.filter(response => response === 1 || response ===2);
	console.log(check);
	//use higher order function to add another value in order to test skin
	const sum2Array = skinArray2.map(oil => oil*2);
	const sum2 = sum2Array.reduce(
		(previous, current) => previous + current,
		initial
	  );
	console.log(sum2, "sum2")
	console.log(req.query.tzone,"tzone")

	if (check.length < 2 ){
		error="please enter 1 or 2";
		//console.log("jjj");
		//print error message to user if they did not enter 1/2 for yes/no
		res.render('test',{error: "if there is no test result show up, make sure you enter 1 or 2 for yes/no"});
	}
	else{
		// sometimes tight, never oil
		// 3,2,2 or 2,2,2
		if (sum > 5 && sum2 == 12){
			skin = "dry";
		}
		// when oil dominates
		else if ( sum2 <= sum ){
			skin = "oily";
		}
		else{
			skin = "neutral";
		}
		res.render('test',{type: skin}) ;
	}

		//if(req.query.SuitableSkin){
	//	query.SuitableSkin = req.query.SuitableSkin;
	//}
	//Foundation.find(query, (err, foundations) => {
	//	res.render('list', {foundations});

	//});
	
}); 




app.listen(process.env.PORT || 3000)



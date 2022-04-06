const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Review = mongoose.model('Review');



router.post('./views/add', (req, res) => {
    const review = new Review({
      brand: req.body.brand,
      foundationName: req.body.foundationName,
      skintype: req.body.skintype,
      review: req.body.review
    });
    //req.session.myReview.push(review);
	/*
    review.save(function(err, savedReview){
		if (err){
			console.log('error');
		}
		else{
			res.redirect('/');
		}
	*/	
	
});



module.exports = router;
var express = require('express');
var router = express.Router();
var add = require('./add');
var Comment = require('../models/comments');


        // GET home page.

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galway Rugby Club' });
});


       // GET About page.

router.get('/about', function(req, res, next){
    res.render('aboutUs', {title: 'Galway Rugby Club'});
});


       // POST sum two numbers

router.post('/add', function(req, res,next) {
    var sum = add(req.body.num1, req.body.num2);
    res.json({Sum: sum});
});


       // POST comments

router.post('/addComment', function(req, res, next){
    //Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function(err, savedComment)
    {
        if (err)
            res.send(err);
        res.json({"id" : savedComment._id})
    });
});


        // GET top 10 comments in order

router.get('/getComments', function(req, res, next){
    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);

        res.json(comments);
    }).limit(10).sort({'date_created':1});
});


        // Update comment based on ID

router.put('/updateComment/:id', function(req, res) {

    // Get comment from Postman
    var objectID = req.params.id;
    var newComment = req.body.comment;

    Comment.findOneAndUpdate({_id: objectID}, {$set :{comment : newComment}},  function(err, comment) {
        if(err){
            res.send(err);
            console.log(err);
            return res.status(500).send();
        }
        console.log(newComment);
        res.json(comment);
        return res.status(200).send();
    });
});



        // Delete comment based on ID
router.delete('/deleteComment/:id', function(req, res) {

    var objectID = req.params.id;

    Comment.findOneAndRemove({_id : objectID}, function(err, comment) {

        if(err){
            console.log(err);
            return res.status(500).send();
        }
        else if (comment == null)
        {
            console.log("ID was not found");
            res.json({
                "Status" : "Failed",
                "Message" : "ID was not found"
            });
            return res.status(500).send();
        }


        res.json({
            "Status" : "Success",
            "Message" : "Comment deleted"

        });
        return res.status(200).send();
    })
});


module.exports = router;

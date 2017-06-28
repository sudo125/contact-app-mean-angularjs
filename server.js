var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

//fire the controller 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//get all tasks : showing all the tasks on the screen 
app.get('/contact/', function(req, res, next){
   
    console.log('get all task is workinggggg');
    
    db.contactlist.find(function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});


//add task : add button 
app.post('/contact/', function(req, res, next){
    
    console.log('add is working');
    
    var list = req.body;
    db.contactlist.insert(list, function(err, list){
        if(err){
                res.send(err);
            }
            res.json(list);
        });
});


//get one tasks : edit button 
app.get('/contact/:id', function(req, res, next){
   
    console.log(req.params.id);
    
    db.contactlist.find({_id: mongojs.ObjectId(req.params.id)},function(err, list){
        if(err){
            res.send(err);
        }
        console.log(list)
        res.json(list);
    });
    
    
});


//delete task : delete button 
app.delete('/contact/:id', function(req, res, next){
   
    console.log('delete is working');
    
    console.log(req.params.id)
    db.contactlist.remove({_id: mongojs.ObjectId(req.params.id)},function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});


    
//update a perticular item : Update button 
app.put('/contact/:id', function(req, res, next){
    console.log('update is working is working');
    var id = req.params.id;
    var query = {
        name: req.body.name,
         email: req.body.email,
         number: req.body.number     
    };
    
    console.log(id)
    
     db.contactlist.update({_id: mongojs.ObjectId(req.params.id)}, query, function(err, list){
        if(err){
            res.send(err);
        }
            res.json(list)
        });
    });



app.listen(3333);
console.log('Connection Established on Port 3333');

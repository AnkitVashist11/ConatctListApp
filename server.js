var express = require('express');
var app = express();
var mongojs =require('mongojs');
var db= mongojs("contactlistappdb",['contactlists']);
// specipy which mongodb database and collection we are using here
var bodyParser = require('body-parser');

/* Instead of using app.get to diplay from server,
 now telling our server to look or use html template
 for displayiong complete UI*/
// app.get('/', function (req, res){
// 	res.send("hello world from server.js: \n Server running of Contact List App ");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlists',function(req,res){
	console.log("I received a GET request")

	db.contactlistappdb.find(function(req,docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post("/contactlists",function(req, res){
	console.log(req.body);
	db.contactlistappdb.insert(req.body, function(err,doc){
		res.json(doc);
	
	})
})
app.delete("/contactlists/:id",function(req, res){
	var id = req.params.id; // it sending id from controller to server
	console.log(id);
	/* code to delete id from mongodb */
	db.contactlistappdb.remove({_id: mongojs.ObjectId(id)},function(err, doc){
		res.json(doc);
	})
});
/*for edit button click */
app.get("/contactlists/:id",function(req, res){
	var id= req.params.id;
	console.log(id);
	db.contactlistappdb.findOne({_id: mongojs.ObjectId(id)},function(err,dov){
		res.json(dov);
	})
});
/* for update button */
app.put("/contactlists/:id",function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlistappdb.findAndModify({query: {_id: mongojs.ObjectId(id)},
       update: {$set: {name:req.body.name, email:req.body.email, number:req.body.number}},
       new:true},function(err,dov){
       	res.json(dov);
       })
});

	/* Putting dummy data which will be putting to mongodb later */
	/*commenting this dummy data from server and moving it to database//
	person1={
		name:"Ankit",
		email:"ankit@gmail.com",
		number:"63736353"
	};
	person2={
		name:"Animesh",
		email:"animesh@gmail.com",
		number:"98843866"
	};
	person3={
		name:"Deeps",
		email:"deeps@gmail.com",
		number:"74656434"
	};

	var contactlist=[person1,person2,person3];
	res.json(contactlist);
	*/


app.listen(3001);
console.log("Server Of ContactListApp running on port 3001:  ");
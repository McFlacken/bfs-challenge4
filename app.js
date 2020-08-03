var express 			= require("express"),
	methodOverride		= require("method-override"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	axios				= require("axios"),
	mongoose 			= require("mongoose");

//CONNECT TO THE DATABASE
mongoose.connect("mongodb+srv://mackie:%238u1LtfR0m%24@cluster0.sz6gu.mongodb.net/uglycats?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Somewhere in the cloud... connected to DB!.... ready to serve some cats');
}).catch(err => {
	console.log('ERROR:', err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //this allows me to use EJS templates, I find it easier
app.use(methodOverride("_method")); //this allows me to use PATCH even when sending a POST request

// CAT SCHEMA, just a url and a value because the id will be given automatically when saved to the db
var catSchema = new mongoose.Schema({
	url: String,
	value: Number
});

var Cat = mongoose.model("Cat", catSchema);

//FUNCTION TO CREATE A CAT, TO SEED THE DATABASE
// Cat.create({
// 	url: "https://cdn2.thecatapi.com/images/ahk.jpg",
// 	value: 0
// 	}, function(err, cat){
// 		if(err){
// 			console.log("something is not right");
// 			console.log(err);
// 		} else {
// 			console.log("you added a new cat");
// 			console.log(cat);
// 		}
// });


//GET ROUTES - default and /cats, could be the same one, but I think /cats is nicer

app.get("/", function(req,res){
	res.redirect("cats");
});

app.get("/cats", function(req, res){
	Cat.countDocuments().exec(function(err, count){
		var random = Math.floor(Math.random() * count);
		Cat.findOne().skip(random).exec(
			function (err, result) {
			res.render("cats", {randomCat: result})
	});
  });
});


//GET ROUTE - CHECK OUT THE VOTES - in progress......
app.get("/votes", function(req, res){
	res.render("votes");
})

//PATCH ROUTE - ADD VOTES - this is where I'm stuck...

app.patch("/cats/ugly", function(req, res){
	res.send("you are trying to vote for ugly")
})

app.patch("/cats/uglier", function(req, res){
	res.send("you are trying to vote for uglier")
})



app.listen(process.env.PORT || 3000, function(){
	console.log('In a cloud far away... The Cat App has now started...');
});
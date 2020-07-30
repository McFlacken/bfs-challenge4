var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose");

//APP CONFIG
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
app.set("view engine", "ejs");


var catSchema = new mongoose.Schema({
	url: String,
	value: Number
});

var voteSchema = new mongoose.Schema({
	value: Number
	
});

var Cat = mongoose.model("Cat", catSchema);

var Vote = mongoose.model("Vote", voteSchema);

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

//GET ROUTES - default and /cats

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

//GET ROUTE - CHECK OUT THE VOTES

app.get("/votes", function(req, res){
	res.render("votes");
})

//POST ROUTE - ADD VOTES

// app.post("/addvote", function(req, res){

// 	res.redirect("votes")
// })


app.listen(process.env.PORT || 3000, function(){
	console.log('In a cloud far away... The Cat App has now started...');
});
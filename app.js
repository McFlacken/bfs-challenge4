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

var Cat = mongoose.model("Cat", catSchema);

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


app.get("/", function(req,res){
	res.redirect("cats");
});

app.get("/cats", function(req, res){

	Cat.countDocuments().exec(function(err, count){
		var random = Math.floor(Math.random() * count);
		Cat.findOne().skip(random).exec(
			function (err, result) {
		// result is random 
			res.render("cats", {randomCat: result})
	});
  });
	
});

app.listen(process.env.PORT || 3000, function(){
	console.log('In cloud far away... The Cat App has now started...');
});
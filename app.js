var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose");

//APP CONFIG
mongoose.connect("mongodb+srv://mackie:%238u1LtfR0m%24@cluster0.sz6gu.mongodb.net/<dbname>?retryWrites=true&w=majority", {
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

app.get("/", function(req,res){
	res.redirect("cats");
});

app.get("/cats", function(req,res){
	
	res.render("cats");
});


app.listen(process.env.PORT || 3000, function(){
	console.log('In cloud far away... The Cat App has now started...');
});
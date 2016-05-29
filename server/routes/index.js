var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname,'../','../', 'config'));
var conncetionStringExpense = require(path.join(__dirname,'../','../','config2'));
var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../','../','client','views', 'index.html'));
});

router.post('/api/v1/todos',function(req,res){
	var results=[];
	var data={text:req.body.text,complete:false};
	pg.connect(connectionString,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
	});
});

router.get('/api/v1/todos', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.put('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", ["editted", data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

router.delete('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

/*router.post('/api/vi/pdf',function(req,res){

  var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';

  doc = new PDF();                        //creating a new PDF object
  doc.pipe(fs.createWriteStream('PATH_TO_PDF_FILE2.pdf'));  //creating a write stream
              //to write the content on the file system
              doc.fontSize(25)
                .text('Here is some vector graphics...',100,80);

              doc.save()
                .moveTo(100,150)
                .lineTo(100,250)
                .lineTo(200,250)
                .fill("#FF3300");

              doc.circle(280,200,50)
                .fill("#6600FF");

                doc.scale(0.6)
                 .translate(470, 130)
                 .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
                 .fill('red', 'even-odd')
                 .restore();

              // and some justified text wrapped into columns
              doc.text('And here is some wrapped text...', 100, 300)
                 .font('Times-Roman', 13)
                 .moveDown()
                 .text(req.body.text, {
                   width: 412,
                   align: 'justify',
                   indent: 30,
                   columns: 2,
                   height: 300,
                   ellipsis: true
                 });             //adding the text to be written,
              // more things can be added here including new pages
  doc.end(); //we end the document writing.
});*/

router.get('/home',function(req,res,next){
  res.sendFile(path.join(__dirname,'../client/views','home.html'));
});

router.post('/api/expenses',function(req,res){
  var results=[];
	var data={name:req.body.name,
            amount:req.body.amount,
            transDate:req.body.transactionDate,
            complete:false};
	pg.connect(conncetionStringExpense,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		client.query("INSERT INTO items(name, amount , transactionDate DATE, complete) values($1, $2,$3,$4)", [data.name, data.amount,data.transDate,data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
	});
})

module.exports = router;

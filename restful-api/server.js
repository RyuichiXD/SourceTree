var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}


// Middleware ************************************

/**
Middlewarefunktionen sind Funktionen, die Zugriff auf das
Anforderungsobjekt (req), das Antwortobjekt (res) und die nächste
Middlewarefunktion im Anforderung/Antwort-Zyklus der Anwendung haben.
Die nächste Middlewarefunktion wird im Allgemeinen durch die
Variable next bezeichnet.

Über Middlewarefunktionen lassen sich die folgenden Tasks ausführen:

-Ausführen von Code
-Vornehmen von Änderungen an der Anforderung und an Antwortobjekten
-Beenden des Anforderung/Antwort-Zyklus
-Aufrufen der nächsten Middlewarefunktion im Stack

Wenn über die aktuelle Middlewarefunktion der Anforderung/Antwort-Zyklus
nicht beendet werden kann, muss next() aufgerufen werden, um die Steuerung
an die nächste Middlewarefunktion zu übergeben. Andernfalls geht die
Anforderung in den Status “Blockiert” über.

*/
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
app.use('/user/:id', function(req, res, next) {
  console.log('User Request URL:', req.originalUrl,'Request Type:', req.method);
  next();
});


// logging
app.use(function (req, res, next) {
    console.log('Request of type ' + req.method + ' to URL ' + req.originalUrl + ' Time:',  new Date().toLocaleString());
    next();
});


//Routen
app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/resources/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/resources/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/user/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/resources/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id]
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/resources/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];

       console.log( data );
       res.end( JSON.stringify(data));
   });
})


// CatchAll for the rest (unfound routes/resources) ********

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers (express recognizes it by 4 parameters!)

// development error handler
// will print stacktrace as JSON response
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('Internal Error: ', err.stack);
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
                error: err.stack
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            error: {}
        }
    });
});

function hey()
{
	  console.log("T12qe3")
	   console.log("T21qweqeq23")
}
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at : ",host,':',port)
  console.log("Example app listening at",host,':',port)
  console.log("T3")
  console.log("I have ")
  console.log("Example app2 listening at",host,':',port)


})

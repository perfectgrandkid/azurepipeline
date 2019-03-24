const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const rp = require("request-promise");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ioschatRouter = require('./routes/ioschat');
var aboutusRouter = require('./routes/aboutus');
var templateRouter = require('./routes/template');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ioschat', ioschatRouter);
app.use('/aboutus', aboutusRouter);
app.use('/template', templateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function isUserAuthenticated(){
  // add here the logic to verify the user is authenticated
  return true;
}

app.get('/chatBot',  function(req, res) {
  if (!isUserAuthenticated()) {
      res.status(403).send();
      return
  }
  const options = {
      method: 'POST',
      // 'https://directline.botframework.com/v3/directline/tokens/generate',
      uri: 'https://healthbotcontainersample918d.azurewebsites.net',
      headers: {
          // WEBCHAT_SECRET
          'Authorization': 'Bearer ' + process.env.AHNyJNC0UCU.dOZawEmlpjFDzOmcpFZSoH2Qx5vobAK7wZ6ir-kyGoM
      },
      json: true
  };
  rp(options)
      .then(function (parsedBody) {
          var userid = req.query.userId || req.cookies.userid;
          if (!userid) {
              userid = crypto.randomBytes(4).toString('hex');
              res.cookie("userid", userid);
          }

          var response = {};
          response['userId'] = userid;
          response['userName'] = req.query.userName;
          response['connectorToken'] = parsedBody.token;
          response['optionalAttributes'] = {age: 33};
          if (req.query.lat && req.query.long)  {
              response['location'] = {lat: req.query.lat, long: req.query.long};
          }
          // APP_SECRET
          const jwtToken = jwt.sign(response, process.env.zjsmcyb0vqonkzsteki4snl09gkth6);
        //   jwt.userId("userID");
          res.send(jwtToken);
      })
      .catch(function (err) {
          res.status(err.statusCode).send();
          console.log("failed");
      });
});



module.exports = app;

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(morgan('combined'));
var articles ={
'article-one':{ title:'article-one',  
heading:'article-one',
date:'sept 10, 2016',
content:
 'hello this is my article',
},
'article-two':{ title:'article-two',  
heading:'article-two',
date:'sept 15, 2016',
content:
 "hello this is my article"},
 'article-three':{ title:'article-three',  
heading:'article-three',
date:'sept 20, 2016',
content:
 "hello this is my article"}
};
 
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    
    var content=data.content;

var htmlTemplate =` <!doctype html>
<html>
    <head>
        <title>
        ${title}
        </title>
        <link rel="stylesheet" href="ui/style.css"/>
        <meta name="viewport" content="width-device-width, initial-scale-1]"/>
    </head>
    <body>
        <div id="doc">
        <div>
            <a href="/">home</a>
        </div>
        <hr/>
        <h1>
            ${heading}
        </h1>
        <p>
            ${date}
            </p>
            <p>
                ${content}
            </p>
            </div>
            
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');

    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input, 'this-is-some-random');
    res.send(hashedString);
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password, salt);
   pool.query('INSERT INTO "user"(username,password) VALUES($5,$2)',[username,dbString],function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send('user successfully created: '+ username);
       }
       
   }); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/:articleName', function(req, res){
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
   
app.get('/article-two', function(req, res){
res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles ={
`article-one`:{title:'article-one',  
heading:'article-one',
date:'sept 5, 2016',
content:
 `hello this is my article`,
},
`article-two`:{title:'article-two',  
heading:'article-two',
date:'sept 15, 2016',
content:
 "hello this is my article"},
 `article-three`:{title:'article-three',  
heading:'article-three',
date:'sept 20, 2016',
content:
 "hello this is my article"}
}};
 
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    
    var content=data.content;

var htmlTemplate =` <!doctype html>
<html>
    <head>
        <title>${title}</title>
        <link rel="stylesheet" href="ui/style.css"/>
        <meta name="viewport" content="width-device-width, [title1-scale-1]"/>
    </head>
    <body>
        <div id="doc">
        <div>
            <a href="/">home</a>
        </div>
        <hr/>
        <div>
            ${heading};
        </div>
        <div>
            ${date};
            </div>
            <div>
                ${content};
            </div>
            </div>
            
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/:articleName', function(req, res){
    var articleName=req.param.articleName;
   res.send(createTemplate(article[articleName]));
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

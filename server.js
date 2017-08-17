var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
  'article-one' : {
    title: ' Article One | Nitish Tyagi',
    heading: 'This is my Article One',
    content: `  <p class="paragraph"> Hi! My name is <b> Nitish Tyagi </b>. This is my <u> first Article </u>. I am loving doing my work here.</p>`
        },
 'article-two' : { title: ' Article Two | Nitish Tyagi',
    heading: 'This is my Article Two',
    content: ` 
        <p class="paragraph"> Hi! My name is <b> Nitish Tyagi </b>. This is my <u> second Article </u>. I am loving doing my work here.</p>`
    },
     'article-three': { title: ' Article Three | Nitish Tyagi',
    heading: 'This is my Article Three',
    content: ` 
        <p class="paragraph"> Hi! My name is <b> Nitish Tyagi </b>. This is my <u> Third Article </u>. I am loving doing my work here.</p>`
    }
};
       function createTemplate(data){
           var title = data.title;
           var heading = data.heading;
           var content = data.content;
        var htmltemplate = `<html>
    <head> <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">

        <a href="/"> Home </a>
        <br>
        <hr/>
        <br> <div>
        ${heading}
        </div>
        <div>
        ${content}
    </div>
    </div>
    </body>
</html>`;
return htmltemplate;

}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
    
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName',function(req,res){
    // articleName == article-one
    // articles[articleName] = {} content object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/article-two',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'Article-two.html'));
});

app.get('/article-three',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'Article-three.html'));
});

var names=[];
app.get('/submit-name/:name',function(req,res) {
   //Get the names from the request
   var name = req.params.name;
   names.push(name);
   //JSON: JavaScript Object Notation
   res.send(JSON.stringfy(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = { 
    user: 'nitstyagi0',
    database: 'nitstyagi0',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD 
};
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

function hash( input,salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select statement
    // return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err) {
            res.status(500).send(err.toString());
        }
        else {res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
    
});

var names=[];
app.get('/submit-name',function(req,res) { // /submit-name?name=xxxx
   //Get the names from the request
   var name = req.query.name;
   names.push(name);
   //JSON: JavaScript Object Notation
   res.send(JSON.stringify(names));
});




app.get('/articles/:articleName',function(req,res){
    // articleName == article-one
    // articles[articleName] = {} content object for article one
    pool.query("SELECT * FROM articles WHERE title= $1 " , [req.params.articleName], function(err,result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length===0) {
                res.status(404).send('Article not found');
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
                
            }
        }
    });

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



app.get('/article-two',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'Article-two.html'));
});

app.get('/article-three',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'Article-three.html'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

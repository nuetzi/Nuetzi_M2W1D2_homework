const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log("Listening on port", port);
});

const fs = require('fs');
app.engine('homework2', (filePath, options, callback) => {              // Define the view engine called homework2
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#content#', '<div>' + options.content + '</div>')
      .replace('#image#','<div>'+ options.image + '</div>' )
      .replace('#link#', '<div>' + options.link + '</div>')
    return callback(null, rendered);
  });
});
app.set('views', './views');                                            // Specify the views directory
app.set('view engine', 'homework2');                                    // Register the homework2 view engine


const pagesArray = ['Page 0', 'Page 1', 'Page 2', 'Page 3', 'Page 4'];


app.get('/', (req, res) => {
    res.render('template1',
    {
        title: 'Here is a Title',
        message: 'Welcome to the Main Hub',
        content: 'Look at all this space!'
    });
});


app.get('/example1', (req, res) => {
  res.render('template1',
  {
      title: 'Example 1',
      message: 'Hey, a page is here!',
      content: 'I wonder how many friends it has?'
  });
});


app.get('/example2', (req, res) => {
  res.render('template1',
  {
      title: 'Example 2',
      message: 'Look! Another page has come along',
      content: 'A companion for Example 1?'
  });
});


app.get('/example3', (req, res) => {
  res.render('template1',
  {
      title: 'Example 3',
      message: 'Example 2 invited some of its friends to join',
      content: 'This page feels a little odd... like a third wheel or something'
  });
});


app.get('/example4', (req, res) => {
  res.render('template1',
  {
      title: 'Example 4',
      message: 'Another friend to join the page party',
      content: 'Things are really getting lively now'
  });
});


app.get('/example5', (req, res) => {
  res.render('template1',
  {
      title: 'Example 5',
      message: 'This little page felt left out',
      content: 'So it invited itself'
  });
});


app.get('/example6', (req, res) => {
  res.render('template1',
  {
      title: 'Example 6',
      message: 'Last but not least - Example 6',
      content: 'Fashionably late, as always'
  });
});


app.get('/greeting/:name', (req, res) => {
	res.send('Hello, ' + req.params.name);
});


app.get('/special', function(req, res) {
    res.render('template2',
    {
        title: 'Bonus Page',
        message: 'A Special Mystery Page',
        image: "<img src='https://www.mariowiki.com/images/thumb/b/b8/MysteryBox_SM3DL.png/1200px-MysteryBox_SM3DL.png' width=600>",
        link: "<a href='https://www.randomlists.com/'>A 'random' link</a>"
    });
});


app.get('/:arrayIndex', (req, res) => {
    if (pagesArray[req.params.arrayIndex]) {
          res.send(pagesArray[req.params.arrayIndex]);
    } else {
      res.send('Invalid request');
    }
});
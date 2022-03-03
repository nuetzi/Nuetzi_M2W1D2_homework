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
      .replace('#content#','<div>'+ options.content + '</div>' )
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


app.get('/special', function(req, res) {
    res.render('template2',
    {
        title: 'Bonus Page',
        message: 'A Special Mystery Page',
        content: "<img src='https://www.mariowiki.com/images/thumb/b/b8/MysteryBox_SM3DL.png/1200px-MysteryBox_SM3DL.png' width=600>"
    });
});


app.get('/:arrayIndex', (req, res) => {
    if (pagesArray[req.params.arrayIndex]) {
          res.send(pagesArray[req.params.arrayIndex]);
    } else {
      res.send('Invalid request');
    }
});
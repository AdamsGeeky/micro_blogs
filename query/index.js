const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
const posts = {};

app.get('/posts', (req, res) => {

});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    
    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }
    
    res.status(200).send({
        message: 'Event received',
    });
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});

const axios = require('axios');
const Thread = require('./thread.model');

module.exports = {
    createThread,
    createPost
};

async function createThread (title, post) {
    const thread = new Thread({
        title: title,
        post: post
    });
    return await thread.save().then(res => {
        axios.post('http://127.0.0.1:5000/add', {
            name: res._id
        }).then(resp => {
            console.log(resp.data);
        })
        .catch(error => {
            console.log(error);            
        })
        return res._id;});
}

async function createPost (threadId, post) {
    await Thread.findOneAndUpdate(threadId, {$push: {post: post}}).then(success => {
        axios.post('http://127.0.0.1:5000/incr', {
            name: threadId
        }).then(resp => {
            console.log(resp.data);
        })
        .catch(error => {
            console.log(error);            
        })
    })
}
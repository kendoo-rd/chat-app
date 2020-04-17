const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//  Set static public folder
app.use( express.static('public/') );

//  Use body parser for JSON inputs
app.use( bodyParser.json() );

//  Datastore

let messages = [];


//  Routes

app.get('/messages', (req, res) => {

    res.send({
        messages: messages
    })
})

// app.get('/messages/:to', (req, res) => {

//     let recepientMessages = messages.filter( message => message.to == req.params.to );

//     //  Remote recpeint messages from array of messages
//     messages = messages.filter( message => message.to != req.params.to )

//     res.send({
//         messages: recepientMessages
//     })
// })

app.get('/messages/:name', (req, res) => {

    let recepientMessages = messages.filter( message => message.from != req.params.name );

    //  Remove recpeint messages from array of messages
    messages = messages.filter( message => message.from == req.params.name )

    res.send({
        messages: recepientMessages
    })
})



app.post('/messages', (req, res) => {

    let message = req.body.message;

    messages.push( message );

    res.send({ success: true });
})

//  Start server
app.listen( 3000, () => {
    console.log('Server started at port 3000');
})


/*  
    TO DO:

    1. Send a message  - POST

        { 
            from: '',
            to: '',
            msg: ''
        }

    2. Get a messages  - GET

        [
            { 
                from: '',
                to: '',
                msg: ''
            },
            { 
                from: '',
                to: '',
                msg: ''
            }         
        ]

 */
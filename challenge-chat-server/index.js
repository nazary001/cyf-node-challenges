import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

let messages = [];
let messagescounter = 0;

server.post('/messages', (req, res) => {
    const message = {...req.body};
    if(message.from && message.text){
        messagescounter += 1;
        message.id = messagescounter;
        messages.push(message);
        res.status(200).send(message);
    }
    else{
        res.status(400).send('Wrong sender or message');
    }
});

server.get('/messages', (req, res) => {
    res.status(200).send(messages);
});

server.get('/messages/:id', (req, res) => {
    const message = messages.find( message => message.id == req.params.id);
    res.status(200).send(message);
});

server.delete('/messages/:id', (req, res) => {
    const message = messages.find( message => message.id == req.params.id);
    const messageIdx = messages.indexOf(message);
    messages.splice(messageIdx, 1);
});

server.put('/messages/:id', (req, res) => {
    const message = messages.find( message => message.id == req.params.id);
    if(req.body.from && req.body.text){
        message.from = req.body.from;
        message.text = req.body.text;
        res.status(200).send(message);
    }
    else{
        res.status(400).send('Wrong sender or message');
    }
});


server.listen(8080, () => {
    console.log('server started on port 8080');
});

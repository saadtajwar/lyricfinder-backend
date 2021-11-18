const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const User = require('./models/user')

app.get('/', (request, response) => {
    response.send('Ping');
})

app.post('/api/users', async (request, response) => {
    try {
        const body = request.body;
        const newUser = new User({
            username: body.username,
            name: body.name,
            password: body.password
        })
        const savedUser = await newUser.save();
        response.json(savedUser);    
    } catch (error) {
        response.status(500).json(error);
    }
})

const PORT = 8008;
app.listen(PORT, () => {
    console.log('Connected to', PORT);
})

/*

TODO:
Make User schema - username, password
Make "song" schema and populate it in the user

*/
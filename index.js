const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
require('dotenv').config()
const User = require('./models/user')
const Song = require('./models/song')

app.get('/', (request, response) => {
    response.send('Ping');
})

app.post('/api/login', async (request, response) => {
    try {
        const body = request.body;
        const foundUser = await User.findOne({username: body.username});
        if (!foundUser || foundUser.password !== body.password) {
            return response.status(401).json({error: 'Incorrect credentials'})
        }

        response.json(foundUser);

    } catch (error) {
        response.status(500).json(error);
    }
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

app.get('/api/users', async (request, response) => {
    try {
        const body = request.body;
        const users = await User.find({}).populate('songs', {track_name: 1, commontrack_id: 1});
        response.json(users);
    } catch (error) {
        response.status(500).json(error);
    }
})

app.post('/api/songs', async (request, response) => {
    try {
        const body = request.body;
        const user = await User.findById(body.userId);

        const newSong = {
            commontrack_id: body.commontrack_id,
            track_name: body.track_name
        };

        user.songs = user.songs.concat(newSong);
        const newUser = await user.save();
        response.json(newUser);

    } catch (error) {
        response.status(500).json(error);
    }
})

app.get('/api/songs', async (request, response) => {
    try {
        const songs = await Song.find({});
        response.json(songs);
    } catch (error) {
        response.status(500).json(error);
    }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Connected to', PORT);
})

/*

TODO:
Make User schema - username, password
Make "song" schema and populate it in the user
track_name and commontrack_id
*/
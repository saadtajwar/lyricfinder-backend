const mongoose = require('mongoose');

const url = `mongodb+srv://fullstackopen:${process.env.MONGODB_PASS}@cluster0.hes6b.mongodb.net/lyricfinder?retryWrites=true&w=majority`;
console.log('Connecting to', url);

mongoose.connect(url).then(result => {
    console.log('Connected to mongoDB')
})
.catch((error) => {
    console.log(`error`);
})

const songSchema = new mongoose.Schema({
    track_name: {
        type: String,
        required: true,
    },
    commontrack_id: {
        type: String,
        required: true,
        unique: true
    }
})

songSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
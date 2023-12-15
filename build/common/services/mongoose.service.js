const mongoose = require('mongoose');
let count = 0;
const options = {
    autoIndex: false, // Prevent buildiing of Index, which performance disadvantegous
    poolSize: 10, // Maintain upto 10 connention concurrently
    bufferMaxEntries: 0,
    // If not connected, return errors immediately rather than waiting for reconnect
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose.connect('mongodb://localhost:27017/lendsqr-app', options)
        .then(() => {
        console.log('MOngoDB is connected');
    })
        .catch(() => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
exports.mongoose = mongoose;

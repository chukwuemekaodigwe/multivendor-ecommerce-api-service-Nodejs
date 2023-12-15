import mongoose from "mongoose"
let count = 0

const options = {
    autoIndex: false, // Prevent buildiing of Index, which performance disadvantegous
    //poolSize: 10, // Maintain upto 10 connention concurrently
    //bufferMaxEntries: 0, 
    // If not connected, return errors immediately rather than waiting for reconnect
    //useNewUrlParser: true,
    // useUnifiedTopology: true  ===> ALL DEPRECATED NO USE AGAIN
}

const connectWithRetry = async () => {
    console.log('MongoDB connection with retry')
    await mongoose.connect('mongodb://127.0.0.1:27017/lendsqr_app', options)
        .then(() => {
            console.log('MOngoDB is connected')
        })
        .catch((err) => {
            console.log(err)
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
        })
}


connectWithRetry()
// exports.mongoose = mongoose
export default mongoose

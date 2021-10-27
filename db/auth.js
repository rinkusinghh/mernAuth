const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        let connectionParams = { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        };
        await mongoose.connect(process.env.MONGO_DB, connectionParams);
        console.log("connected mongoose to db...");

    } catch (error) {
        console.error("could not connected!");
    }
}

module.exports = connectDb;

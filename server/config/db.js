const mongoose = require('mongoose');

let isDBConnected = false;

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pandas_kitchen')
        .then(() => {
            console.log('MongoDB connected');
            isDBConnected = true;
        })
        .catch(err => {
            console.error('MongoDB connection error. Please ensure MongoDB is running.');
            // console.error(err); // Keep log clean as per user instruction "Log errors to console only" implied for frontend, but good for backend too to avoid noise if desired, but user said "Log to console only" for frontend. Backend logs are fine.
            isDBConnected = false;
        });

    mongoose.connection.on("connected", () => {
        isDBConnected = true;
        console.log("Mongoose connected event");
    });

    mongoose.connection.on("disconnected", () => {
        isDBConnected = false;
        console.log("Mongoose disconnected event");
    });
};

const getDBStatus = () => isDBConnected;

module.exports = { connectDB, getDBStatus };

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Placeholder structure)
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send("Panda's Kitchen Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

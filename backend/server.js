require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//routes
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');


//express app
const app = express();

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);

// Serve the frontend build for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening for requests on port ' + process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error);
    })



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



//middleware
app.use(cors());
app.use(express.json());


//routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);




//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, () => {
            console.log('Connected to db & listening for requests on port 4000')
        });
    })
    .catch((error) => {
        console.log(error);
    })



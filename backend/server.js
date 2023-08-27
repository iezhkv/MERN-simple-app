require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//routes
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');


//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);


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



//setup
const express  = require('express');
const router = express.Router();
const Workout = require('../models/workoutModel');

//routes
// =====================================

//GET all workouts
router.get('/', (req, res) => {
    res.json({message: 'GET all workouts'});
});

//GET one workout
router.get('/:id', (req, res) => {
    res.json({message: 'GET one workout'});
});

//POST a new workout
router.post ('/', async(req, res) => {
    const {title, reps, load} = req.body;

    try {
        const workout = await Workout.create({title, reps, load});
        res.status(201).json({workout});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({message: 'DELETE a workout'});
});

//Update a workout
router.patch('/:id', (req, res) => {
    res.json({message: 'Update a workout'});
});

// =====================================

//export
module.exports = router;
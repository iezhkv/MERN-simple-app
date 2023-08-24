const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// get one workout
const getOneWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No workout with that id'});
    }
   
    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({message: 'No workout with that id'});
    }
    res.status(200).json(workout);
}

// create a workout

const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    //  handle errors
    let emptyFields = [];

    if(!title) {
        emptyFields.push('title');
    }
    if(!load) {
        emptyFields.push('load');
    }
    if(!reps) {
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json(
            {
                error: 'Please fill in all the fields',
                emptyFields
            })
    }

    // add doc to db
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No workout with that id'});
    }
    const workout =  await Workout.findByIdAndDelete({_id: id});

    if(!workout) {
        return res.status(404).json({message: 'No workout with that id'});
    }
    res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'No workout with that id'});
    }
    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true } // Return the updated document
    );

    if(!workout) {
        return res.status(404).json({message: 'No workout with that id'});
    }
    res.status(200).json(workout);
};


module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,

};
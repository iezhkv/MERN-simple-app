//setup
const express  = require('express');
const {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,

} = require('../controllers/workoutController');
const router = express.Router();


//routes
// =====================================

//GET all workouts
router.get('/', getAllWorkouts);

//GET one workout
router.get('/:id', getOneWorkout);

//POST a new workout
router.post ('/', createWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//Update a workout
router.patch('/:id', updateWorkout);

// =====================================

//export
module.exports = router;
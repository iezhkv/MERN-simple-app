//setup
const express  = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    res.json({message: 'POST a new workout!'});
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
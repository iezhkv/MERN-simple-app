import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"


//date-fns
import { formatDistanceToNow } from 'date-fns'

const WorkoutDetails = ({workout, workoutToEdit, setWorkoutToEdit}) => {

    const { dispatch } = useWorkoutContext()

    const { user } = useAuthContext()



    const handleDelete = async() => {

        if(!user) {
            return
        }
        setWorkoutToEdit(null)
        
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type:'DELETE_WORKOUT', payload: json})
        }
    }

    const handleEdit = () => {

        //  toggle workoutToEdit
        setWorkoutToEdit(workoutToEdit ? null : workout);

    }

    const isEditingThisWorkout = workoutToEdit && workoutToEdit._id === workout._id;

    return (
        <div className={`workout-details ${isEditingThisWorkout ? 'editing-workout' : ''}`}>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            {isEditingThisWorkout  && (
                <div className="actions">
                    <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
                    <span className="material-symbols-outlined edit" onClick={handleEdit}>edit</span>
                </div>
            )}
            {!workoutToEdit && (
                <div className="actions">
                    <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
                    <span className="material-symbols-outlined edit" onClick={handleEdit}>edit</span>
                </div>
            )}
            
            

        </div>
    )
}

export default WorkoutDetails
import { useState , useEffect} from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

import { API_ENDPOINTS } from "../config/apiUrls"



const WorkoutForm = ({workoutToEdit, setWorkoutToEdit}) => {

    const {dispatch} = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { user } = useAuthContext()


    const clearForm = () => {
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        setEmptyFields([])
    }

    useEffect(() => {
        if(workoutToEdit) {
            setTitle(workoutToEdit.title)
            setReps(workoutToEdit.reps)
            setLoad(workoutToEdit.load)
        }
        else {
            clearForm()
        }
    },[workoutToEdit])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in to add a workout')
            return
        }

        const workout = { title, reps, load }

        const requestUrl = workoutToEdit ? `${API_ENDPOINTS.WORKOUTS}/${workoutToEdit._id}` : API_ENDPOINTS.WORKOUTS;
        const method = workoutToEdit ? 'PATCH' : 'POST';

        const response = await fetch(requestUrl, {
            method,
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            clearForm()

            if(workoutToEdit) {
                dispatch({type: 'UPDATE_WORKOUT', payload: json})
                setWorkoutToEdit(null)
            }else{
                dispatch({type: 'CREATE_WORKOUT', payload: json})
            }
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        clearForm()
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>{workoutToEdit? 'Edit Workout' : 'Add a New Workout'}</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in Kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}

            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}

            />

            <div className="crud-buttons">
                <button className={workoutToEdit ? 'edit-button' : ''}>{workoutToEdit? 'Edit Workout' : 'Add Workout'}</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
            
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
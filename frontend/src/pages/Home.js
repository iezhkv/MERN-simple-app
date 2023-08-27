import { useEffect, useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

//  components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutsForm from "../components/WorkoutsForm"

const Home = () => {

    const { workouts , dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    const [workoutToEdit, setWorkoutToEdit] = useState(null)

    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user){
            fetchWorkouts()
        } 


    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} 
                    workout={workout} 
                    workoutToEdit={workoutToEdit}
                    setWorkoutToEdit={setWorkoutToEdit}

                    />
                ))}
            </div>
            <WorkoutsForm 
                workoutToEdit={workoutToEdit}
                setWorkoutToEdit={setWorkoutToEdit}
            />
        </div>
    )
}

export default Home
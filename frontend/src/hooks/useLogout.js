import { useAuthContext } from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';



export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();

    const logout = () => {

        // remove the user from local storage
        localStorage.removeItem('user')

        //update the auth context
        dispatch({type: 'LOGOUT'})

        //remove workouts from global state
        workoutDispatch({type: 'SET_WORKOUTS', payload: null})

    }

    return { logout }
}
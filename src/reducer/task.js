import * as TaskContants from '../contants/task'
import { toastError, toastSuccess } from '../commons/toastifyHeper'
const initialState = {
    listTask: []
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case TaskContants.FETCH_TASK: {
            return {
                ...state,
                listTask: []
            }
        }
        case TaskContants.FETCH_TASK_SUCCESS: {
            const { data } = action.payload;
            toastSuccess();
            return {
                ...state,
                listTask: data
            }
        }
        case TaskContants.FETCH_TASK_FALSE: {
            const { err } = action.payload
            toastError(err);
            return {
                ...state,
                listTask: state.listTask
            }
        }    
     
        case TaskContants.FILTER_TASK_SUCCESS: {
            const { data } = action.payload
            const newState = data;
            return {
                ...state,
                listTask: [...newState]
            }
        }
        default:
            return state;
    }
}

export default myReducer;
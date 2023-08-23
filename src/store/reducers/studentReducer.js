import { ADD_STUDENT, GET_ALL_STUDENTS, DELETE_STUDENT } from '../actionTypes';

const initProjectState = {
    error: null,
    students: [],
    loading: true
};

const studentsReducer = (state = initProjectState, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return {
                ...state,
                error: null,
                students: [action.payload.student, ...state.students]
        };
        case GET_ALL_STUDENTS:
            return {
                ...state,
                error: null,
                loading: false,
                students: [...action.payload.students]
        };
        case DELETE_STUDENT:
            return {
                ...state,
                error: null,
                students: state.students.filter((user) => user._id !== action.payload.id)
        };

        default:
            return state;
    }
};

export default studentsReducer;
